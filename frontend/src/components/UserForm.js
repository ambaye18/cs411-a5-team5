import React, {useState} from 'react';

export default function UserForm() {
    const [location, setLocation] = useState('');
    const [data, setData] = useState({location:null,weather:null,sentiment:null,playlist:null});
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
            setData({location:resp.data.location,
                weather:resp.data.weather[1]+'°F',
                sentiment: Math.round(100*resp.data.sentiment)/100,
                playlist:resp.data.playlist});

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
            {data.location ? 
            <div style={{textAlign: 'center'}}>
                <h3>Current location: {data.location}</h3>
                <h3>Current weather: {data.weather}</h3>
                <h3>Sentiment Value (0-1): {data.sentiment}</h3>
                <h3>Generated playlist: <a href={data.playlist} target='_blank'>{data.playlist}</a></h3>
            </div>
            : <></>}
        </div>
    )
}