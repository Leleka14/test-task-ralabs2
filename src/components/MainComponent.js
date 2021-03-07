import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Row } from 'reactstrap';
import HeaderComponent from './HeaderComponent';
import ForecastComponent from './ForecastComponent';
import { findLocationRequest, weatherRequest } from '../utils/requests'

const MainComponent = () => {

    const [city, setcity] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [weather, setWeather] = useState();

    const getGeo = position => {
        return findLocationRequest(position.coords.latitude, position.coords.longitude).get('')
            .then(res => setcity(res.data.data[0].region))
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(getGeo, console.log);
    }, []);

    useEffect(() => {
        if(city !== ''){
            weatherRequest(city).get('')
                .then(res => setWeather(res.data))
        }
    }, [city]);

    const submitInputHandler = (event) => {
        if(inputValue !== ''){
            setcity(inputValue);
            setInputValue('');
        }
        event.preventDefault();
    }

    const inputChangeHandler = event => {
        setInputValue(event.target.value)
    }

    return(
        <div className="container">
            <HeaderComponent/>
            <Form>
                <FormGroup>
                    <Row>
                        <Input placeholder="Type city" value={inputValue} onChange={inputChangeHandler} className="col-10 col-md-6 "/>
                        <Button type="submit" onClick={submitInputHandler} className="col-2 col-md-1" color="success"><i className="fa fa-lg fa-search"></i><sub>...</sub></Button>
                    </Row>
                </FormGroup>
            </Form>
            <ForecastComponent weatherData={weather}/>
        </div>
    )
}

export default MainComponent;