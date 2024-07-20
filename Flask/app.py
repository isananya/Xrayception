from flask import Flask, render_template, redirect, send_from_directory, request, jsonify
from werkzeug.utils import secure_filename
import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
from model import preprocess, predict_result
import json



app = Flask(__name__)


cwd = os.path.realpath(__file__).rstrip("app.py")
UPLOAD_FOLDER = 'uploads'

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
        # file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file_path = cwd + "uploads\\" + filename
        print(file_path)
        file.save(file_path)

        # Perform your prediction or processing here using file_path
        print(filename)


        img = preprocess(file_path)
        prediction = predict_result(img)

        print(prediction)

        os.remove(file_path)

        summary = ""
        if prediction[0] == 0 :
            summary = f"The probability of the patient in this scan having COVID-19 is <big><b>{round((1 - prediction[1]) * 100, 2)}%</b></big>. \
                This means you <b>DO NOT</b> have COVID-19!"
        else:
            summary = f"The probability of the patient in this scan having COVID-19 is <big><b>{round(prediction[1] * 100, 2)}% </b></big>. <br>\
                    This means you <b>probably have</b> COVID-19, Find possible treatments <a target=”_blank” href='https://www.mygov.in/covid-19/'>here</a> and <a href = 'https://indiacovidguidelines.org/' target='_blank'> here </a>"

        
        result = {
            "status": f"File {filename} received and processed",
            "diagnosis" : f"The Analysis revealed a class {prediction[0]} diagnosis at {round(prediction[1] * 100, 5)}%\
                <br> (Class 1 implies a COVID 19 Diagnosis and Class 0 implies a Healthy Diagnosis)",
            "predictions" : summary
        }

        return jsonify(result)



    
if __name__ == '__main__':
    app.run(debug = True)
