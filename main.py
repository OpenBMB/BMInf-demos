import threading
from flask import Flask,request,jsonify
from flask.helpers import send_from_directory
import controller.gpu_info_controller as gpuinfo
import controller.fill_blank_controller as fillblank
import controller.generate_story_controller as story
import controller.dialogue_controller as dialogue
import bminf
import os

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__, static_url_path="", static_folder="statics")

model = None
current_key = None
#lock methods
lock = threading.Lock()

@app.route('/api/loadmodel',methods=['GET'])
def model_load():
    res = request.args.get('key')
    key = int(res)
    
    global model, current_key

    if lock.locked():
        data={'code':201,'message':'sorry，此模型正在被其他人独霸，请稍后再试！'}
        return jsonify(data),201 
    else:
        if key == current_key:
            return jsonify({'code':200,'message':'success'})
        if key == 1:
            lock.acquire()
            model = None
            print('loading cpm1')
            model = bminf.models.CPM1()
            lock.release()
            return jsonify({'code':200,'message':'success'})
        elif key == 2:
            lock.acquire()
            model = None
            print('loading cpm2')
            model = bminf.models.CPM2()
            lock.release()
            return jsonify({'code':200,'message':'success'})
        elif key == 3:
            lock.acquire()
            model = None
            print('loading eva')
            model = bminf.models.EVA()
            lock.release()
            return jsonify({'code':200,'message':'success'})
        

@app.route('/api/gpuinfo',methods=['GET'])
def gpu_info():
    rate = gpuinfo.gpu_info()
    return jsonify({'code':200,'message':'success','data':rate})

@app.route('/api/fillblank',methods=['POST'])
def fillBlank():
    if lock.locked() == False:
        lock.acquire()
        result = fillblank.fillBlank(model)
        lock.release()
        return jsonify({'code':200,'message':'success','data':result})
    else:
        return jsonify({'code':201,'message':'sorry，此接口正在被其他人独霸，请稍后再试！'}),201

@app.route('/api/generatestory',methods=['POST'])
def generateStory():
    if lock.locked() == False:
        lock.acquire()
        result = story.generateStory(model)
        lock.release()
        return jsonify({'code':200,'message':'success','data':result})
    else:
        return jsonify({'code':201,'message':'sorry，此接口正在被其他人独霸，请稍后再试！'}),201

@app.route('/api/dialogue',methods=['POST'])
def generateDialogue():
    if lock.locked() == False:
        lock.acquire()
        result = dialogue.dialogue(model)
        lock.release()
        return jsonify({'code':200,'message':'success','data':result})
    else:
        data={'code':201,'message':'sorry，此接口正在被其他人独霸，请稍后再试！'}
        return jsonify(data),201

@app.route("/", methods=["GET"])
def index():
    return send_from_directory(
        os.path.join(CURRENT_DIR, "statics"),
        "index.html"
    )

if __name__ == '__main__':
    app.config['JSON_AS_ASCII']= False
    app.run(host='0.0.0.0',port=8000)
