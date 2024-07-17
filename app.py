from flask import Flask, render_template, redirect, send_from_directory, request
from model import preprocess, predict_result


# model = pickle.load(open('xception_model_pkl.pkl', 'rb'))
# print(model.prediction)

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        if request.method == "POST":
            img = preprocess(request.files['file'].stream)
            prediction = predict_result(img)
            # return render_template("index.html", predictions = str(prediction))
            return render_template("index.html", predictions = "hilol")
    except:
        error = "File cannot be processed."
        return render_template("result.html", err=error)


    
if __name__ == '__main__':
    app.run(debug = True)
