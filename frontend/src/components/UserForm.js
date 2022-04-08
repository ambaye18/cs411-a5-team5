import React, {useState} from 'react';

export default function UserForm() {
    const [location, setLocation] = useState('');
    const [data, setData] = useState({});
    const axios = require('axios');

    const handleSubmit = (e) => {
        e.preventDefault();
        // This API call is currently failing due to CORS cross-origin issue
        // add response headers to fix this?
        axios.get('http://127.0.0.1:5000/api/search/' + location,
            {
            mode: 'no-cors',
            method: 'GET',
            origin: 'http://127.0.0.1:3000',
            headers : {
                'Content-Type':'application/json'
            },
        }).then(resp => {
            document.getElementById('location').innerHTML = resp.data.location;
            document.getElementById('weather').innerHTML = resp.data.weather;
            document.getElementById('sentiment').innerHTML = resp.data.sentiment;
            document.getElementById('playlist').innerHTML = resp.data.playlist;

            console.log(resp.data);
        })
        .catch(err => console.log(err));
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter a city:
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}/>
                </label>
                <input type="submit" />
            </form>
            <br></br>
            {data ? 
            <div>
                <div style={{textAlign: 'center'}}>
                    <div style={{display: 'inline'}}>Current location: </div>
                    <div style={{display: 'inline'}} id="location"></div>
                </div>
                <div style={{textAlign: 'center'}}>
                    <div style={{display: 'inline'}}>Weather: </div>
                    <div style={{display: 'inline'}} id="weather"></div>
                </div>
                <div style={{textAlign: 'center'}}>
                    <div style={{display: 'inline'}}>Sentiment Val: </div>
                    <div style={{display: 'inline'}} id="sentiment"></div>
                </div>
                <div style={{textAlign: 'center'}}>
                    <div style={{display: 'inline'}}>Playlist: </div>
                    <div style={{display: 'inline'}} id="playlist"></div>
                </div>
            </div>
            : <></>}
        </div>
    )
}