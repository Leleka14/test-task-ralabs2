import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, Row } from 'reactstrap';
import HeaderComponent from './HeaderComponent';
import ForecastComponent from './ForecastComponent';
import { findLocationRequest, weatherRequest } from '../utils/requests'

const MainComponent = () => {

    const [city, setcity] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [weather, setWeather] = useState();

    //Function that call axios to fetch geo API to find user's current city by his coordinates
    const getGeo = position => {
        return findLocationRequest(position.coords.latitude, position.coords.longitude).get('')
            .then(res => setcity(res.data.data[0].region))
    }

    //Hook that executes only once after page is rendered to locate user's current position, equivalent to componentDidMount
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(getGeo, console.log);
    }, []);

    //Hook that executes when city changes to fetch weather in this city
    useEffect(() => {
        if(city !== ''){
            weatherRequest(city).get('')
                .then(res => setWeather(res.data))
        }
    }, [city]);

    //sets city from user's input value 
    const submitInputHandler = (event) => {
        if(inputValue !== ''){
            setcity(inputValue);
            setInputValue('');
        }
        event.preventDefault();
    }

    //sets inputValue when input field is changed
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