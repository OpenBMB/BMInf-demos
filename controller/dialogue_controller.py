from flask import request
import bminf


def dialogue(model):
    text = request.json.get('text')
    list1 = eval(text)
    print(list1)
    max_tokens1 = request.json.get('max_tokens')
    top_p1 = request.json.get('top_p')
    top_n1 = request.json.get('top_n')
    temperature1 = request.json.get('temperature')
    frequency_penalty1 = request.json.get('frequency_penalty')
    presence_penalty1 = request.json.get('presence_penalty')
    result = model.dialogue(list1,
                            max_tokens = max_tokens1,
                            top_p = top_p1,
                            top_n = top_n1,
                            temperature = temperature1,
                            frequency_penalty = frequency_penalty1,
                            presence_penalty = presence_penalty1)
    return result
