from newsapi import NewsApiClient
import cohere

# Init
newsapi = NewsApiClient(api_key='94249fc4b3664d0395bd6f3190eca849')
co = cohere.Client('3bu22qRjR83ZqTxjV6kyzTPWxiLHDerV7a1SFEpH')

# /v2/top-headlines
top_headlines = newsapi.get_top_headlines(
                                          category='business',
                                          language='en',
                                          country='us')

print("----------top headlines------------")
# print(top_headlines)

for article in top_headlines['articles']:
    print('article content:')
    print(article['content'])


# # /v2/everything
# all_articles = newsapi.get_everything(q='bitcoin',
#                                       sources='bbc-news,the-verge',
#                                       domains='bbc.co.uk,techcrunch.com',
#                                       language='en',
#                                       sort_by='relevancy',
#                                       page=2)

# # /v2/top-headlines/sources
# sources = newsapi.get_sources()