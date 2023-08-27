from flask import Flask, redirect, url_for, render_template, request, jsonify
from newsdataapi import NewsDataApiClient
import requests
import json
from typing import Optional, Union
import random
import math
from collections import defaultdict
from flask_cors import CORS
import os


app = Flask(__name__)

# CORS(app, resources={r"/search_articles/*":{"origins":"http://localhost:5174"}})
# CORS(app, resources={r"/search_articles_keywords": {"origins": "http://localhost:5174"}}
CORS(app, origins="http://localhost:5174")



# API keys
NEWSDATAIO_KEY = 'pub_280110c642d9d222eba07138df500a7a41a78'
MEANINGCLOUD_KEY = '307374128d7188e4511bf691577f75ba'
USER_JSON_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'User.json')

api = NewsDataApiClient(NEWSDATAIO_KEY)

# For summarization
url = "https://api.meaningcloud.com/summarization-1.0"

default_article_settings = {
    'language':'en',
    'prioritydomain':'medium',
    'image':True,
    'size':10,
    'page':None
}

article_settings = default_article_settings


def read_user_json_as_dict(path:str):
    local_dict = None
    with open(path, "r") as json_file:
        local_dict = json.load(json_file)
    return local_dict

def write_user_json_with_dict(path:str, dic:dict):
    with open(path, "w") as json_file:
        json.dump(dic, json_file, indent=4)


def get_text_summary(txt:str, summary_num_sentences:int=5)->str:
    payload={
        'key': MEANINGCLOUD_KEY,
        'txt': txt,
        'sentences': str(summary_num_sentences)
    }
    
    response = requests.post(url, data=payload)

    status_code = response.status_code
    
    # if(status_code!="200"):  # test to see if this is true
    #     raise IOError("BACKEND HAS RISEN EXCEPTION: Text summary using meaningcloud API has failed!")

    return response.json()['summary']


def cut_off_n_words(txt:str, n:int=30):
    words = txt.split(' ')
    
    if(len(words)<=n):
        return txt
    else:
        return ' '.join(words[:n])+'...'


# def get_article_and_summary(article_settings:dict, 
#                             result_key: Optional[str]='results', 
#                             content_key: Optional[str]='content', 
#                             summary_key: Optional[str]='summary', 
#                             content_length: Optional[int]=30, 
#                             summary_length: Optional[int]=5, 
#                             next_page: Optional[str]=None):
#     """
#     Receives article settings in dictionary format. Gets articles from API according to settings.
#     Adds a 'summary' key into the JSON data retrieved from the API, containing a summary of specified length.
#     Edits 'content' key in the JSON data retrieved from the API, containing the article content but cut off to specified number of words.
#     """
    
#     articles = api.news_api(page=next_page, **article_settings)
    
#     for i in range(len(articles[result_key])):
#         articles[result_key][i][summary_key] = get_text_summary(articles[result_key][i][content_key], summary_length)
#         articles[result_key][i][content_key] = cut_off_n_words(articles[result_key][i][content_key], content_length)
    
#     next_page_code = articles.nextPage
    
#     return jsonify(articles)


# TO RETURN JSON: what it neads: image, category, title, cut off content thing, summary
def filter_article(article:dict)->dict:
    new_article = {}
    new_article['title'] = article['title']
    new_article['category'] = article['category']
    new_article['image_url'] = article['image_url']
    new_article['content'] = cut_off_n_words(article['content'])
    new_article['summary'] = get_text_summary(article['content'])
    
    return new_article


def filter_array_of_articles(arr:[dict])->[dict]:
    
    new_array = []
    
    for article in arr:
        new_array.append(filter_article(article))
        
    return new_array
        

class Articles:
    
    default_article_settings = default_article_settings
    
    def __init__(self):
        self.settings = None



class CategoryArticles:
    
    def __init__(self, category_name:str):
        self.category_name=category_name
        self.articles=[]
        self.nextPage:Optional[str]=None
        
    def generate_articles(self, results_key:Optional[str]='results', content_key:Optional[str]='content'):
        settings = Articles.default_article_settings
        settings['category'] = None if self.category_name=='random' else self.category_name
        
        if(self.nextPage==None):
            pass
        else:
            settings['page']=self.nextPage
        
        new_articles = api.news_api(**settings)
        
        for i in range(len(new_articles[results_key])):
            self.articles.append(new_articles[results_key][i])
            
        self.nextPage = new_articles['nextPage']


class UserCatering:
    
    def __init__(self, category_preferences:dict):
        
        self.category_preferences = category_preferences
        
        self.catered_articles = []  # Array of articles, each one is JSON format, "content" key's value is not summarized
        
        self.seen_articles = {}  # Dictionary representing seen articles
        
        self.category_to_article = {}
        
        
    
    def get_new_probability(self, curr_probability:float)->float:
        return curr_probability+1.0/curr_probability
    
    def get_previous_probability(self, p:float):
        return (p-math.sqrt(p*p-4.0))/2.0
    
    def update_category_preferences(self, a_category, liked:int, percent_random:Optional[float]=20.0):
        
        def new_random_probability():
            total = 0.0
            for key, val in self.category_preferences.items():
                if(key=="random"):
                    continue
                
                total+=val
                
            return total/(100.0/percent_random-1.0)
        
        if(liked==1):
            category_probability = self.category_preferences.get(a_category)
            
            if(category_probability==None):
                self.category_preferences[a_category]=1.0
            else:
                self.category_preferences[a_category]=self.get_new_probability(self.category_preferences[a_category])
        else:
            self.category_preferences[a_category] = self.get_previous_probability(self.category_preferences[a_category])
                    
        
        self.category_preferences['random']=new_random_probability()
        
        write_user_json_with_dict(USER_JSON_PATH, self.category_preferences)
            
            
    def get_article_from_category(self, a_category):
        
        new_article = None
        while True:
            if self.category_to_article.get(a_category) == None:
                self.category_to_article[a_category] = CategoryArticles(a_category=a_category)
            
            if len(self.category_to_article[a_category].articles)==0:
                self.category_to_article[a_category].generate_articles()
                
            new_article = self.category_to_article[a_category].articles[0]
            self.category_to_article[a_category].articles.pop(0)
        
            if self.seen_articles[new_article['link']]:
                continue
            else:
                self.seen_articles[new_article['link']] = True
                break
        
        return new_article
    

    def generate_catered_articles_categories(self, n:int=10):
        if(n>10 or n<1):
            raise ValueError("BACKEND RISEN ERROR: 1<=n<=10")
        
        elements = []
        probabilities = []
        
        for category_name, category_probability in self.category_preferences.items():
            elements.append(category_name)
            probabilities.append(category_probability)
            
        selected_categories = random.choices(elements, weights=probabilities, k=n)
        
        for a_category in selected_categories:
            self.catered_articles.append(self.get_article_from_category(a_category))
            
        return self.catered_articles[-n:]
            
        
        
    


user_catering = UserCatering(read_user_json_as_dict(USER_JSON_PATH))



class ArticlesArrayGen(Articles):
    
    def __init__(self, feature_type):
        super().__init__()
        
        if feature_type != 'category' and feature_type != 'q':
            raise Exception("BACKEND EXCEPTION: 'feature_type' paramater must be either 'category' or 'q'")

        self.feature_type = feature_type
        self.feature_value = None
        self.settings = Articles.default_article_settings
        
    def search(self, feature_value):
        self.feature_value = feature_value
        self.settings[self.feature_type] = self.feature_value
        self.settings['page'] = None
        
    def generate_articles(self, n:int=10)->[dict]:
        if self.feature_value == None:
            raise Exception("BACKEND EXCEPTION: 'ArticlesArrayGen' class, 'generate_articles' function was called before 'search' function")

        api_ret = api.news_api(**self.settings)

        # print('sushi')
        # print(api_ret)
        
        self.settings['page'] = api_ret['nextPage']
        
        return api_ret['results']
        
        
categorical_articles = ArticlesArrayGen('category')
keywords_articles = ArticlesArrayGen('q')  # keywords should be like "{'keywords': 'keyword1 keyword2 keyword3 ...'}"


@app.route("/get_catered_feed", methods=['GET', 'POST'])
def get_catered_feed():
    '''
    Generates and returns 10 catered articles.
    Each time 'user.catering.generate_catered_articles_categories()' is called, will return 10 new articles according to user catering.
    Returns JSON: Use key 'articles' to access array of articles.
    '''
    return jsonify({'articles':filter_array_of_articles(user_catering.generate_catered_articles_categories())})
    
@app.route("/update_user_catering", methods=['GET', 'POST'])
def update_user_catering_likes():
    """
    Whenever a user likes a post, this function should be called and JSON data containing the category of the article should be attached, as well as whether it was liked or unliked.
    
    JSON format:
    {
        "category":"a_category",
        "liked":1 (liked post) or 0 (unliked post)
        
    }
    """

    data = request.json
    
    category = data.get("category")
    
    if category == None:
        raise Exception("BACKEND ERROR: 'category' key in JSON data received from frontend is not found")

    liked = data.get("liked")
    
    if liked == None:
        raise Exception("BACKEND ERROR: 'liked' key in JSON data received from frontend is not found")
    elif int(liked) not in [0, 1]:
        raise Exception("BACKEND ERROR: 'liked' key in JSON data received from frontend should have value of either 1 (post was liked) or 0 (post was unliked), but it's value was: "+str(liked))
    
    user_catering.update_category_preferences(category, int(liked))
    
    return jsonify({'status':'successful'})




@app.route("/search_articles_category", methods=['GET', 'POST'])
def search_articles_category():

    '''
    JSON data format:
    {
        'category':'a_category'
    }
    '''
    
    data = request.json
    
    if data == None:
        raise Exception("BACKEND ERROR: 'request.json' was None (category)")

    desired_category = data.get('category')
    
    if desired_category == None:
        raise Exception("BACKEND ERROR: 'category' key is not present in JSON data passed to backend")
    
    categorical_articles.search(desired_category)

    print(desired_category)

    return jsonify({'status':'successful'})

@app.route("/get_articles_category", methods=['GET', 'POST'])
def get_articles_category():
    return jsonify({'articles':filter_array_of_articles(categorical_articles.generate_articles())})




@app.route("/search_articles_keywords", methods=['GET', 'POST'])
# @app.route("/search_articles/keywords", methods=['GET', 'POST'])
def search_articles_keywords():
    print("\n\n\naoesnuhda\n\n")

    '''
    JSON data format:
    {
        'keywords':'keyword1 keyword2 keyword3'
    }
    '''
    
    data = request.json
    
    if data == None:
        raise Exception("BACKEND ERROR: 'request.json' was None (keyword)")

    desired_keywords = data.get('keywords')
    
    if desired_keywords == None:
        raise Exception("BACKEND ERROR: 'keywords' key is not present in JSON data passed to backend")
    
    keywords_articles.search(desired_keywords)
    print(';hgadslifujg\n\nhaiosdfg '+desired_keywords)
    print(data)
    print('----')
    return jsonify({'status':'successful'})

@app.route("/get_articles_keywords", methods=['GET', 'POST'])
# @app.route("/get_articles/keywords", methods=['GET', 'POST'])
def get_articles_keywords():
    return jsonify({'articles':filter_array_of_articles(keywords_articles.generate_articles())})
    


# @app.route("/get_custom_articles", methods=['GET', 'POST'])
# def get_custom_articles():
# @app.route("/get_new_articles", methods=['GET', 'POST'])
# def get_new_articles():
    # """
    # Receives JSON format data to specify nature of articles to return.
    # Returns articles in default JSON format acquired from newsdata.io API.
    
    # Key:
    # "quantity"
    #     = quantity of articles to receive (maximum 10)
    
    # "type"
    #     = "random" to receive completely random articles
    #     = "catered" to receive articles catered to user
    #     = "custom" to receive articles based on "categories" and "keywords"
        
    # "categories"
    #     *Should only be filled if "type"="custom".
    #     *If "type"!="custom" you do not need to provide "categories" key.
    #     *If "type"="custom" but you do not want articles based on categories, pass in empty array.
    #     *Maximum of 5 categories.
    #     = Array of desired categories
    #     E.g. "categories"=["food", "environment", "entertainment"]
        
    # "keywords"
    #     *Should only be filled if "type"="custom".
    #     *If "type"!="custom" you do not need to provide "categories" key.
    #     *If "type"="custom" but you do not want articles based on keywords, pass in empty array.
    #     *Maximum of 5 keywords.
    #     = Array of desired keywords
    #     E.g. "keywords"=["pizza", "golf", "chicken"]
    # """
    
    # data = api.news_api(q='pizza')
    
    # query_data = request.json
    
    # query_type = query_data.get("type")
    
    # num_articles = query_data.get("quantity")
    
    # if query_type == None: # i.e. "type" is not a key in the JSON data
    #     raise ValueError("BACKEND HAS RISEN EXCEPTION: \"type\" is not one of the keys in the JSON data provided by the frontend when calling the \"get_new_articles\" function!")
        
    # if num_articles == None:
    #     num_articles = 10
    #     # raise ValueError("BACKEND HAS RISEN EXCEPTION: \"quantity\" is not one of the keys in the JSON data provided by the frontend when calling the \"get_new_articles\" function!")
    # elif int(num_articles) <= 0 or int(num_articles) > 10:
    #     raise ValueError("BACKEND HAS RISEN EXCEPTION: \"quantity\" key from the JSON data provided by the frontend when calling the \"get_new_articles\" function is out of bounds! It has to be between 1 and 10 (inclusive)!")
    
    
    # if(query_type == "random"):
    #     article_settings = default_article_settings
        
    #     articles = api.news_api(**article_settings)
    
    #     for i in range(len(articles['result'])):
    #         articles['result'][i] = get_text_summary(articles['result'][i])
            
    #     return jsonify(articles)
        
    # elif(query_type == "catered"):
    #     print('1')

    #     # generates the initial catered feed, have sean call different function for next page for feed
    # elif(query_type == "custom"):
    #     """
    #     CAUTION: If "categories" or "keywords"'s values are not provided, will default be "None". Good practice to pass empty array if not desired but "type"="custom".
    #     """
        
        
    # else:
    #     raise ValueError("BACKEND HAS RISEN EXCEPTION: The value of the \"type\" key from the JSON data provided by the frontend when calling the \"get_new_articles\" function is not \"random\", \"catered\", or \"custom\"! It must have one of those three values!")
    

# @app.route("/get_next_articles", methods=['GET', 'POST'])
# def get_next_articles():
#     """
#     Gets the next page of articles that were initially generated by "get_new_articles" function.
#     Should be used when the user clicks the "next page" button, or the user 
    
#     Returns JSON data of articles from newsdata.io API except key "content" has summaries instead of entire articles.
#     *"get_new_articles" function must have been called at least once before.
#     """
    
#     if next_page_code == None:
#         raise AttributeError("BACKEND HAS RISEN EXCEPTION: \"get_new_articles\" function must be called before the \"get_next_articles\" function!")
        
#     return get_article_and_summary(article_settings=article_settings, next_page=next_page_code)
    
    
    

# # Each function with decorator is basically a page
# def home():
#     if request.method == 'POST':
#         print(request.form['nm'])
    
    
#     # The HTML stuff
#     return render_template("index.html")

# @app.route("/login", methods=['POST', 'GET'])
# def login():
#     return render_template()

# @app.route("/<usr>")
# def user(usr):
#     return f"<h1>{usr}</h1>"
        



if __name__ == "__main__":
    # api.news_api(q='pizza')
    # userCatering = UserCatering(api)
    # userCatering.test_api()
    
    # txt = get_text_summary("hi. my. name. is. and. d. what.", 5)
    # print("txt:")
    # print(txt)
    
    app.run(debug=True)
    