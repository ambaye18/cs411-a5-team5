# initial file to facilitate API calls

import json, requests, spotipy
from geopy.geocoders import Nominatim
from datetime import datetime

def load_creds():
    # initializing global vars to be used throughout
    global WEATHER_KEY
    global USERNAME
    global CLIENT_ID
    global CLIENT_SECRET

    # reading credentials from config.json (should be made manually from developer/server end)
    with open('config.json') as f:
        creds = json.load(f)
    WEATHER_KEY = creds['WEATHER_KEY']
    USERNAME = creds['USERNAME']
    CLIENT_ID = creds['CLIENT_ID']
    CLIENT_SECRET = creds['CLIENT_SECRET']
    
def get_weather(location):
    # finding longitude and latitude based on passed in location
    geolocator = Nominatim(user_agent="411project")
    location_details = geolocator.geocode(location)
    latitude = str(location_details.latitude)
    longitude = str(location_details.longitude)

    try:
        # making call to openweather api
        url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&exclude=hourly,daily,minutely,alerts&APPID=' + WEATHER_KEY
        resp = requests.get(url).json()['current']
    except:
        return 'INVALID'

    # filtering out only weather id and temperature
    return [resp['weather'][0]['id'],resp['temp']]


def sentiment(weather):
    id_num = weather[0]
    temp = weather[1]

    # STILL TO IMPLEMENT -> MANUAL QUANTIFICATION OF WEATHER IDS TO SENTIMENTS
    # WILL BE DONE ACCORDING TO: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2

    # normalizing temperature to scale btwn -1 and 1 -> historically lowest temp recorded was -128.6F; highest was 136F
    normalized_temp = (2 * ((temp - -128.6) / (136 - -128.6))) - 1
    
    # ULTIMATELY, FINAL SENTIMENT WILL BE AVERAGE OF VALENCE FROM WEATHER ID AND TEMPERATURE
    return normalized_temp

def gen_playlist(sentiment, location):
    # authorizing spotipy client
    token = spotipy.util.prompt_for_user_token(USERNAME, scope='playlist-modify-public', client_id=CLIENT_ID, client_secret=CLIENT_SECRET, redirect_uri='https://127.0.0.1')
    cli = spotipy.Spotify(auth=token)

    # creating playlist -> title is based on location + time to prevent same name conflicts
    user = cli.current_user()
    playlist = cli.user_playlist_create(user['id'], ('Weatherify: ' + location.upper() + ' ' + str(datetime.now().time())))

    # generating playlist based on set genres of music -> for final product can randomize these seed genres
    uri = []
    songs = cli.recommendations(limit=60, target_valence=sentiment, seed_genres=['hip-hop', 'pop','country', 'rock', 'edm'], target_popularity=90)['tracks']
    for song in songs:
            uri.append(song['uri'])
    cli.user_playlist_add_tracks(user['id'], playlist['id'], uri)
    return ('https://open.spotify.com/playlist/' + playlist['id'])





# a bunch of random test calls, feel free to remove -pkuz (NOTE: you need to load_creds() before working w/ any function)
# load_creds()
# location = 'boston'
# weather = get_weather(location)
# sentiment = sentiment(weather)
# print(gen_playlist(sentiment, location))