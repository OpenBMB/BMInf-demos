def demoImpl(model, req_json):
    text = req_json.get('text')
    max_tokens = req_json.get('max_tokens')
    top_p1 = req_json.get('top_p')
    top_n1 = req_json.get('top_n')
    temperature1 = req_json.get('temperature')
    frequency_penalty1 = req_json.get('frequency_penalty')
    presence_penalty1 = req_json.get('presence_penalty')

    result=[]
    for _ in range(3):
        resp = model.generate(text,max_tokens = max_tokens,top_n = top_n1,top_p = top_p1,temperature = temperature1,frequency_penalty = frequency_penalty1,presence_penalty = presence_penalty1)
        result.append(resp)
    return result