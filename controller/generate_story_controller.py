from flask import request
import bminf


def generateStory(model):
    text = request.json.get('text')
    top_p1 = request.json.get('top_p')
    top_n1 = request.json.get('top_n')
    temperature1 = request.json.get('temperature')
    frequency_penalty1 = request.json.get('frequency_penalty')
    presence_penalty1 = request.json.get('presence_penalty')
    
    result=[]
    for i in range(3):
        if i == 0:
            resp = model.generate(text,max_tokens = 5,top_n = top_n1,top_p = top_p1,temperature = temperature1,frequency_penalty = frequency_penalty1,presence_penalty = presence_penalty1)
            result.append(resp)
        elif i ==1:
            resp = model.generate(text,max_tokens = 10,top_n = top_n1,top_p = top_p1,temperature = temperature1,frequency_penalty = frequency_penalty1,presence_penalty = presence_penalty1)
            result.append(resp)
        elif i ==2:
            resp = model.generate(text,max_tokens = 15,top_n = top_n1,top_p = top_p1,temperature = temperature1,frequency_penalty = frequency_penalty1,presence_penalty = presence_penalty1)
            result.append(resp)
    return result
