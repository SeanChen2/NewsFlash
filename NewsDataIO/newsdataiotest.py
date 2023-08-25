from newsdataapi import NewsDataApiClient
import cohere
import torch
from transformers import AutoTokenizer, AutoModelWithLMHead

import openai

tokenizer = AutoTokenizer.from_pretrained('t5-base')
model = AutoModelWithLMHead.from_pretrained('t5-base', return_dict=True)

# API key authorization, Initialize the client with your API key
api = NewsDataApiClient(apikey='pub_280110c642d9d222eba07138df500a7a41a78')
co = cohere.Client('3bu22qRjR83ZqTxjV6kyzTPWxiLHDerV7a1SFEpH')

# News API
articles = api.news_api(q='pizza')

openai.api_key = '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'

# sequence = (
#     "My name is Yoshikage Kira."
#     "I'm 33 years old. "
#     "My house is in the northeast section of Morioh, where all the villas are, and I am not married. "
#     "I work as an employee for the Kame Yu department stores, and I get home every day by 8 PM at the latest. "
#     "I don't smoke, but I occasionally drink. "
#     "I'm in bed by 11 PM, and make sure I get eight hours of sleep, no matter what. "
#     "After having a glass of warm milk and doing about twenty minutes of stretches before going to bed, I usually have no problems sleeping until morning. "
#     "Just like a baby, I wake up without any fatigue or stress in the morning. "
#     "I was told there were no issues at my last check-up. I'm trying to explain that I'm a person who wishes to live a very quiet life. "
#     "I take care not to trouble myself with any enemies, like winning and losing, that would cause me to lose sleep at night. "
#     "That is how I deal with society, and I know that is what brings me happiness. "
#     "Although, if I were to fight I wouldn't lose to anyone."
# )

# sequence = (
#     "The history of the Roman Empire is a fascinating tale of power, conquest, innovation, and cultural transformation that left an indelible mark on the world. Spanning from the founding of Rome in 753 BC to the fall of the Western Roman Empire in AD 476, this vast empire evolved from a small city-state into a sprawling dominion that stretched across three continents."

#     "Rooted in legend and mythology, the early history of Rome is characterized by its monarchy and the establishment of the Roman Republic in 509 BC. This shift marked the beginning of a period defined by the balance of power among various social classes, the Senate's influence, and the rise of military leaders like Julius Caesar. The Republic's internal struggles eventually gave way to civil wars, culminating in the rise of Augustus Caesar as the first Roman Emperor in 27 BC. This marked the beginning of the Roman Empire."

#     "Under Augustus and his successors, the Roman Empire expanded its territorial reach through military conquests and colonization efforts. The Pax Romana, a period of relative peace and stability, fostered economic growth, cultural exchange, and the spread of Roman law and governance. The empire's impressive road networks and architectural achievements, such as the Colosseum and aqueducts, stand as enduring testaments to Roman engineering prowess."

#     "However, the Roman Empire faced numerous challenges. The empire's vastness made it increasingly difficult to administer, and internal power struggles, economic difficulties, and external threats further weakened its foundations. The division of the empire into the Western and Eastern Roman Empires reflected the growing disparities between the two regions."

#     "The decline and fall of the Western Roman Empire in the 5th century AD were precipitated by a combination of factors, including invasions by various barbarian tribes, economic decline, and the erosion of central authority. The fall of Rome in 476 AD marked the end of ancient antiquity and the transition into the medieval period."

#     "The legacy of the Roman Empire endures through its profound impact on language, law, architecture, governance, and culture. Its contributions to literature, philosophy, and the development of democratic ideals have left an indelible imprint on Western civilization. The history of the Roman Empire serves as a reminder of the complexities of power, the consequences of unchecked expansion, and the enduring influence of human achievement on the course of history."
# )

# inputs = tokenizer.encode("summarize: "+sequence, return_tensors='pt', max_length=512, truncation=True)
# outputs = model.generate(inputs, max_length=150, min_length=80, length_penalty=5, num_beams=2)
# summary_google = tokenizer.decode(outputs[0])

# print('yoshi summary')
# print(summary_google)

for article in articles['results']:
    
    print("Title:" + article['title'])
    
    # inputs = tokenizer.encode("summarize: "+article['content'], return_tensors='pt', max_length=512, truncation=True)
    # outputs = model.generate(inputs, max_length=400, min_length=80, length_penalty=5, num_beams=2)
    # summary_google = tokenizer.decode(outputs[0])
    print("Summary:")
    summary = co.summarize(
        text=article['content'],
        model='command',
        length='medium',
        extractiveness='low'
    )
    print(summary.summary)
    print('---------------------------')
    
    # print(summary_google)
    
    # response = openai.ChatCompletion.create(
    #     model="gpt-3.5-turbo",
    #     messages=[
    #         {"role": "system", "content":"You are to summarize a given news article to 3 - 5 sentences."},
    #         {"role": "user", "content":"Please summarize the following article: "+article['content']}
    #     ]
    # )
    
    # summary = response['choices'][0]['message']
    
    # print(summary)

# print(response.json())


# # Archive API
# response = api.archive_api(q='test')
# print(response)


# # Sources API
# response = api.sources_api()
# print(response)

# # Crypto API
# response = api.crypto_api()
# print(response)