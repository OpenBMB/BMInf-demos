from setuptools import setup, find_packages
import importlib

def demo_adapter(demoname, model, req_json):
    package = find_packages('demos')
    for i in range(len(package)):
        if package[i] == demoname:
            path='demos.'+package[i]
            module = importlib.import_module(package[i])
            return module.demoImpl(model, req_json)
            