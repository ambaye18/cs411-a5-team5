import json
from flask_cors import CORS, cross_origin
from api_calls import get_weather, sentiment, gen_playlist
from flask import Flask, jsonify, abort, redirect
from flask.wrappers import Response
from flask.globals import request, session
import os
import pathlib
import requests
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
import google.auth.transport.requests
import config
import jwt

app = Flask(__name__, static_folder='../frontend/build/static', template_folder='../frontend/build')
CORS(app)
app.config['Access-Control-Allow-Origin'] = '*'
app.config["Access-Control-Allow-Headers"]=["Authorization", "Content-Type"]
app.secret_key = config.APP_SECRET

## GOOGLE AUTHENTICATION ##
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"
GOOGLE_CLIENT_ID = config.GOOGLE_CLIENT_ID
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")
flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "openid",
    ],
    redirect_uri="http://127.0.0.1:5000/callback",
)

# wrapper for endpoints that require authentication
def login_required(function):
    def wrapper(*args, **kwargs):
        encoded_jwt=request.headers.get("Authorization").split("Bearer ")[1]
        if encoded_jwt==None:
            return abort(401)
        else:
            return function(*args, **kwargs)
    wrapper.__name__ = function.__name__
    return wrapper

# encrypt user google data (payload) using symmetric encryption (HS256) for security
# send token
def Generate_JWT(payload):
    encoded_jwt = jwt.encode(payload, app.secret_key, algorithm='HS256')
    return encoded_jwt

# callback function for google auth after the redirected login is successful, saves user info to db
@app.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)
    credentials = flow.credentials
    request_session = requests.session()
    token_request = google.auth.transport.requests.Request(session=request_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token, request=token_request,
        audience=GOOGLE_CLIENT_ID
    )
    session["google_id"] = id_info.get("sub")
    session["email"] = id_info.get("email")
    session["name"] = id_info.get("name")
    session["picture"] = id_info.get("picture")
    print(session)
    
    jwt_token=Generate_JWT(id_info)
    # TODO: insert id_info into db for session user

    # redirect to frontend after successful login
    # send jwt token (encrypted id_info) to be saved to local storage for the session
    return redirect(f"http://127.0.0.1:3000?jwt={jwt_token}")

# this endpoint is called when the user clicks login button on frontend
# it returns a redirect url to authenticate with google
@app.route("/auth/google", methods=["GET"])
# @cross_origin(supports_credentials=True, allow_headers=['Content-Type'])
def login():
    authorization_url, state = flow.authorization_url()
    # Store the state so the callback can verify the auth server response.
    session["state"] = state
    # return jsonify({"auth_url": authorization_url})
    return Response(
        response=json.dumps({'auth_url':authorization_url}),
        status=200,
        mimetype='application/json'
    )

# endpoint called when user clicks logout button on frontend
@app.route("/logout")
def logout():
    #clear the local storage from frontend
    session.clear()
    # return jsonify({'success':True})
    return Response(
        response=json.dumps({"message":"Logged out"}),
        status=202,
        mimetype='application/json'
    )

# endpoint to get the current session's user info (decode google auth info 
# that was previously encrypted using JWT, then send to client)
@app.route("/user")
@login_required
# @cross_origin(supports_credentials=True, allow_headers=['Content-Type', 'Authorization'])
def home_page_user():
    encoded_jwt=request.headers.get("Authorization").split("Bearer ")[1]
    try:
        decoded_jwt=jwt.decode(encoded_jwt, app.secret_key, algorithms=['HS256'])
        print(decoded_jwt)
    except Exception as e: 
        print(e)
        return Response(
            response=json.dumps({"message":"Decoding JWT Failed", "exception":e.args}),
            status=500,
            mimetype='application/json'
        )
    # return jsonify(decoded_jwt)
    return Response(
        response=json.dumps(decoded_jwt),
        status=200,
        mimetype='application/json'
    )

# session endpoint to send google user info
@app.route("/protected")
@login_required
def protected():
    return jsonify({"id": session["google_id"], "name": session["name"]})

# test route
@app.route('/')
def test():
    return jsonify({"message": "Welcome!"})

# endpoint for nonexistent routes
@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Not found'}), 404

# Weather search endpoint, only available if logged in
@app.route('/api/search/<location>', methods=['GET'])
# @cross_origin(supports_credentials=True, allow_headers=['Content-Type'])
def search(location):
    print(location)
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