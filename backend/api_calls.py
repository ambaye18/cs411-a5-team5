# initial file to facilitate API calls

import json, requests, spotipy, random
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
        print(resp)
    except:
        return 'INVALID'

    # filtering out only weather id and temperature
    return [resp['weather'][0]['id'],resp['temp']]

def toValence(id):
    zero = [762, 781]
    _05 = [771]
    _1 = [202, 212, 232]
    _2 = [312, 314, 504, 511, 611, 622]
    _25 = [221, 313, 321, 502, 522, 602, 613, 616, 621]
    _3 = [201, 211, 231, 302, 503, 521, 531, 601, 612, 615, 620]
    _35 = [301, 311, 501, 520, 600]
    _4 = [200, 210, 230, 310, 500, 711, 731, 751, 761]
    _45 = [300]
    _5 = [701, 721]
    _6 = [741, 804]
    _7 = [803]
    _8 = [802]
    _9 = [801]
    one = [800]

    if id in zero:
        return 0
    elif id in _05:
        return 0.5
    elif id in _1:
        return 0.1
    elif id in _2:
        return 0.2
    elif id in _25:
        return 0.25
    elif id in _3:
        return 0.3
    elif id in _35:
        return 0.35
    elif id in _4:
        return 0.4
    elif id in _45:
        return 0.45
    elif id in _5:
        return 0.5
    elif id in _6:
        return 0.6
    elif id in _7:
        return 0.7
    elif id in _8:
        return 0.8
    elif id in _9:
        return 0.9
    elif id in one:
        return 1
    else:
        return 0.5

def sentiment(weather):
    id_num = weather[0]
    temp = weather[1]

    id_valence = toValence(id_num)

    # normalizing temperature to scale btwn 0 and 1 -> historically lowest temp recorded was -128.6F; highest was 136F
    normalized_temp = ((temp - -128.6) / (136 - -128.6))
    
    # ULTIMATELY, FINAL SENTIMENT WILL BE AVERAGE OF VALENCE FROM WEATHER ID AND TEMPERATURE
    return (normalized_temp + id_valence) / 2

def gen_playlist(sentiment, location):
    # authorizing spotipy client
    token = spotipy.util.prompt_for_user_token(USERNAME, scope='playlist-modify-public', client_id=CLIENT_ID, client_secret=CLIENT_SECRET, redirect_uri='https://127.0.0.1')
    cli = spotipy.Spotify(auth=token)

    # creating playlist -> title is based on location + time to prevent same name conflicts
    user = cli.current_user()
    playlist = cli.user_playlist_create(user['id'], ('Weatherify: ' + location.upper() + ' ' + str(datetime.now().time())))

    # generating playlist based on set genres of music -> for final product can randomize these seed genres
    uri = []
    possible_genres = ['hip-hop', 'pop','country','classical','rock','dance','edm','electronic', 'rap', 'dance pop', 'latin', 'r&b']
    songs = cli.recommendations(limit=60, target_valence=sentiment, seed_genres=random.sample(possible_genres, 5), target_popularity=90)['tracks']
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