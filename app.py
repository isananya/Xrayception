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


        summary = ""
        if prediction[0] == 0 :
            summary = f"The probability of the patient in this scan having COVID-19 is <big><b>{round((1 - prediction[1]) * 100, 2)}%</b></big>. \
                This means you <b>DO NOT</b> have COVID-19!"
        else:
            summary = f"The probability of the patient in this scan having COVID-19 is <big><b>{round(prediction[1] * 100, 2)}% </b></big>. <br>\
                    This means you <b>probably have</b> COVID-19, Find possible treatments <a target=”_blank” href='https://www.cdc.gov/covid/treatment/?CDC_AAref_Val=https://www.cdc.gov/coronavirus/2019-ncov/your-health/treatments-for-severe-illness.html'>here</a>"

        
        result = {
            "status": f"File {filename} received and processed",
            "diagnosis" : f"The Analysis revealed a class {prediction[0]} diagnosis at {round(prediction[1], 5)}\
                <br> (Class 1 implies a COVID 19 Diagnosis and Class 0 implies a Healthy Diagnosis)",
            "predictions" : summary
        }

        return jsonify(result)



    
if __name__ == '__main__':
    app.run(debug = True)
