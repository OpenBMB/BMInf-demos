import threading
from flask import Flask,request,jsonify
from flask.helpers import send_from_directory
import gpu_info as gpuinfo
import demo_adapter as adapter
import demotomodel as dm 
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
        elif key == 2:
            lock.acquire()
            model = None
            print('loading cpm2')
            model = bminf.models.CPM2()
            lock.release()
        elif key == 3:
            lock.acquire()
            model = None
            print('loading eva')
            model = bminf.models.EVA()
            lock.release()
        current_key = key
        return jsonify({'code':200,'message':'success'})        

@app.route('/api/gpuinfo',methods=['GET'])
def gpu_info():
    rate = gpuinfo.gpu_info()
    return jsonify({'code':200,'message':'success','data':rate})

@app.route('/api/<demoname>',methods=['POST'])
def demo(demoname):
    if current_key != dm.demoToModel(demoname):
        return jsonify({'code':202,'message':'模型已经失效，请刷新后重新加载'}),201
    if lock.locked() == False:
        lock.acquire()
        req_json = request.json
        result = adapter.demo_adapter(demoname, model, req_json)
        lock.release()
        return jsonify({'code':200,'message':'success','data':result})
    else:
        return jsonify({'code':201,'message':'sorry，此接口正在被其他人独霸，请稍后再试！'}),201

@app.route("/", methods=["GET"])
def index():
    return send_from_directory(
        os.path.join(CURRENT_DIR, "statics"),
        "index.html"
    )

if __name__ == '__main__':
    app.config['JSON_AS_ASCII']= False
    app.run(host='0.0.0.0',port=8000)
