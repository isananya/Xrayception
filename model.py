# from keras.models import load_model
# from keras.utils import img_to_array
import keras 
import numpy as np
from PIL import Image
import os

cwd = os.path.realpath(__file__).rstrip("model.py")
print(cwd)

model = keras.models.load_model(cwd + "xception_model.h5")

def preprocess(path):
    op = Image.open(path)
    resize = op.resize((150, 150))
    img2arr = keras.utils.img_to_array(resize) / 255.0
    img_reshape = img2arr.reshape(1, 150, 150, 3)
    return img_reshape
    

def predict_result(inp):
    prediction = model.predict(inp)
    return np.argmax(prediction[0], axis = -1)


