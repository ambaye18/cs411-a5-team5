from flask_cors import CORS, cross_origin
from backend.api_calls import load_creds, get_weather, sentiment, gen_playlist
from backend.app import create_app
from flask import Flask, jsonify

app = create_app()
# app = Flask(__name__, static_folder='../frontend/build/static', template_folder='../frontend/build')
# cors = CORS(app, support_credentials=True, resources={r"/api/*": {"origins": "*"}})

@app.route('/')
def test():
    return jsonify({'message' : 'Hello, World!'})

@app.route('/api/search/<location>', methods=['GET'])
@cross_origin(supports_credentials=True, allow_headers=['Content-Type'])
def search(location):
    print(location)
    load_creds()
    weather = get_weather(location)
    if weather == 'INVALID':
        return jsonify({'message' : 'Invalid location'})
    else:
        sentiment_val = sentiment(weather)
        playlist = gen_playlist(sentiment_val, location)
        print("Weather: " + str(weather))
        return jsonify({'message' : 'Success', 'location' : location, 'weather' : weather, 'sentiment' : sentiment_val, 'playlist' : playlist})

if __name__ == "__main__":
    app.run(debug=True)