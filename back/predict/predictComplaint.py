from flask import Flask, request, jsonify,make_response
import joblib
from flask_cors import CORS



# Defining a function which converts words into numeric vectors for prediction
final_model = joblib.load('final_model.pkl')
vectorizer = joblib.load('text_vectorizer.pkl')
pca_model = joblib.load('pca_model.pkl')
scaler_fit = joblib.load('scaler_fit.pkl')

def FunctionPredictUrgency(inpText):
    inpText=inpText.replace("I'm having an issue with the {product_purchased}. Please assist.","")
    inpText= [inpText.replace("I'm facing a problem with my {product_purchased}","")]
    # Using the same vectorizer converting the text to numeric vector
    X=vectorizer.transform(inpText)
    #print(X.toarray())

    # calculating the principal components
    reduced_X = pca_model.transform(X.toarray())
    
    # If standardization/normalization was done on training
    # then the above X must also be converted to same platform
    # Generating the normalized values of X
    X=scaler_fit.transform(reduced_X)
    
    # Generating the prediction using Naive Bayes model and returning
    Prediction=final_model.predict(X)
    if Prediction=="P1":
        Prediction="High"
    elif Prediction=="P2":
        Prediction="Medium"
    else:
        Prediction="Low"
    return(Prediction)
app = Flask(__name__)
CORS(app)
# Load the trained models
@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        # Respond to the preflight request
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'POST'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response
    elif request.method == 'POST':
        string = request.json.get('data')  # Get data from JSON request

        # Assuming FunctionPredictUrgency is a function that returns a prediction
        prediction = FunctionPredictUrgency(string)

        # Return a valid JSON response
        return jsonify({'prediction': prediction})
        
if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True,port=8081)