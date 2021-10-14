#  1 -->  cpm1 model
#  2 -->  cpm2 model
#  3 -->  eva  model

demotomodel = {'generatestory':1,'fillblank':2,'dialogue':3}
def demoToModel(demoname):
    return demotomodel.get(demoname)
