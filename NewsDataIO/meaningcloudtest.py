from newsdataapi import NewsDataApiClient

# API key authorization, Initialize the client with your API key
api = NewsDataApiClient(apikey='pub_280110c642d9d222eba07138df500a7a41a78')

# News API
articles = api.news_api(q='pizza', language='en')


# Usage limits: https://www.meaningcloud.com/products/pricing
import requests
url = "https://api.meaningcloud.com/summarization-1.0"

# print(articles)




for article in articles['results']:
    
    print("Title: "+article['title'])

    print("Summary:")

    payload={
        'key': '307374128d7188e4511bf691577f75ba',
        'txt': article['content'],
        'sentences': '5'
    }
    
    response = requests.post(url, data=payload)

    print('Status code:', response.status_code)
    print(response.json()['summary'])

