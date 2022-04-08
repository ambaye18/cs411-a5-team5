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
                <p>Current location: {data.location}</p>
                <p>Weather: {data.weather}</p>
                <p>Sentiment Val: {data.sentiment}</p>
                <p>Playlists: {data.playlists}</p>
            </div>
            : <></>}
        </div>
    )
}