import pickle

model = pickle.load(open('xception_model_pkl.pkl', 'rb'))
print(model.predict())