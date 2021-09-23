from flask import request
import bminf


def fillBlank(model):
    TOKEN_SPAN = "<span>"
    text = request.json.get('text')
    top_p1 = request.json.get('top_p')
    top_n1 = request.json.get('top_n')
    temperature1 = request.json.get('temperature')
    frequency_penalty1 = request.json.get('frequency_penalty')
    presence_penalty1 = request.json.get('presence_penalty')
    result = model.generate(text,
                            top_p = top_p1,
                            top_n = top_n1,
                            temperature = temperature1,
                            frequency_penalty = frequency_penalty1,
                            presence_penalty = presence_penalty1)
    
    for v in result:
        value = v["text"]
        text = text.replace(TOKEN_SPAN, value , 1)
    res = {"list":result,"resp_text":text}
    return res
