from flask import Flask, render_template, redirect, send_from_directory, request, jsonify
from werkzeug.utils import secure_filename
from model import preprocess, predict_result
import os
import json



app = Flask(__name__)


cwd = os.path.realpath(__file__).rstrip("app.py")
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():

    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Perform your prediction or processing here using file_path
        print(filename)

        # prediction = predict_result(f"{cwd}{file_path}")
        full_path = cwd + file_path
        print("Full Path :", full_path)

        img = preprocess(full_path)
        prediction = predict_result(img)

        print(prediction)

        
        result = {
            "status": f"File {file_path} received and processed",
            "predictions" : f"Prediction value is {prediction[1]}, and the class is {prediction[0]}"
        }
        return jsonify(result)



    
if __name__ == '__main__':
    app.run(debug = True)
