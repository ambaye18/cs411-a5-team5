import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import './style.css';

export default function UserForm() {
    const [location, setLocation] = useState('');
    const [data, setData] = useState({location:null,weather:null,sentiment:null,playlist:null});
    const [loading, setLoading] = useState(false);
    const axios = require('axios');

    const handleSubmit = (e) => {
        setData({location:null,weather:null,sentiment:null,playlist:null});
        setLoading(true);
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
            setLoading(false);

            console.log(resp.data);
        })
        .catch(err => console.log(err));
    }

    return(
        <div className="form">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formLocation">
                    <Form.Label>Enter a location</Form.Label>
                    <Form.Control className="formInput" required type="text" placeholder="e.g., Boston" value={location} onChange={(e) => setLocation(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formSubmit" className="btnSubmit">
                    <Form.Control type="submit" value="Submit"/>
                </Form.Group>

            </Form>
            <br></br>
            {data.location ? 
            <div style={{textAlign: 'center'}}>
                <p>Current location: {data.location}</p>
                <p>Current weather: {data.weather}</p>
                <p>Sentiment Value (0-1): {data.sentiment}</p>
                <p>Generated playlist: <a href={data.playlist} target='_blank'>{data.playlist}</a></p>
            </div>
            :
            (loading ? <Spinner animation="border" variant="primary" /> : null)
            }
        </div>
    )
}