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
    print(type(op))
    op = op.convert("RGB")
    resize = op.resize((150, 150))
    img2arr = keras.utils.img_to_array(resize) / 255.0
    # img_reshape = img2arr.reshape(1, 150, 150, 3)
    img_reshape = np.expand_dims(img2arr, axis = 0)
    assert img_reshape.shape == (1, 150, 150, 3), f"Unexpected shape: {img_reshape.shape}"
    return img_reshape
    

def predict_result(inp):
    prediction = model.predict(inp)
    # return np.argmax(prediction[0], axis = -1)
    print("Raw Pred: ", prediction)
    prediction_arr = np.array(prediction)

    # Extract the class index with the highest probability
    predicted_class = np.argmax(prediction_arr, axis=1)[0]

    # Extract the probability of the predicted class
    predicted_probability = prediction_arr[0, predicted_class]

    print("Predicted class:", predicted_class)
    print("Predicted probability:", predicted_probability)
    return [predicted_class, predicted_probability] 
    




