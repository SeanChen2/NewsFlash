from newsdataapi import NewsDataApiClient
import oneai


# API key authorization, Initialize the client with your API key
api = NewsDataApiClient(apikey='pub_280110c642d9d222eba07138df500a7a41a78')

oneai.api_key = "73873ea9-832e-4ef7-bc4d-607572391049"

# News API
articles = api.news_api(q='pizza', language='en')

pipeline = oneai.Pipeline(
    steps = [
        oneai.skills.Summarize(auto_length=False, max_length=50, min_length=10),
    ]
)

for article in articles['results']:
    
    print("Title: "+article['title'])

    print("Summary:")
    summary = pipeline.run(article['content'])
    print(summary.summary.text)