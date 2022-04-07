import React, {useState} from 'react';

export default function UserForm() {
    const [location, setLocation] = useState('');
    const [data, setData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/search/' + location,
            {
            'method': 'GET',
            'mode': 'cors',
            'credentials': 'include',
            'origin': 'http://localhost:3000',
            'headers' : {
                'Content-Type':'application/json'
            }
        })
        .then(res => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
            console.log(res.json);
            res.json();
        })
        .then(data => {
            setData(data);
            console.log(data);
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
            <div>
                <p>Current location: {data.location}</p>
                <p>Weather: {data.weather}</p>
                <p>Sentiment Val: {data.sentiment}</p>
                <p>Playlists: {data.playlists}</p>
            </div>
        </div>
    )
}