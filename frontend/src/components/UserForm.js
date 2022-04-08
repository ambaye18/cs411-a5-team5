import React, {useState} from 'react';

export default function UserForm() {
    const [location, setLocation] = useState('');
    const [data, setData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        // This API call is currently failing due to CORS cross-origin issue
        // add response headers to fix this?
        fetch('http://localhost:5000/api/search/' + location,
            {
            method: 'GET',
            origin: 'http://localhost:3000',
            headers : {
                'Content-Type':'application/json'
            },
        })
        .then(res => {
            console.log(res.json);
            res.json()})
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