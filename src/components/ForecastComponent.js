import React from 'react';
import { Accordion, Card, Row, Container } from 'react-bootstrap';


const ForecastComponent = props => {

    //creates description
    const createDescription = (temp, rain, clouds, wind) => {
        let text = '';
        let arrayForHotWeather = [
            "You should wear something light as it will be warm, more than 15°.", 
            "If i was you, i would wear shorts as it would be warm.",
            "Don't wear anything with longsleeves, it will be warm."
        ];
        let arrayForCoolWeather = [
            "It would be cool weather.",
            "Temperature wouldn't be too low, but wouldn't be too high either, be careful.",
            "In my opinion this would be perfect temperature, not high, not low."
        ];
        let arrayForColdWeather = [
            "I recommend you to wear coat, temparature would be less than 10°.",
            "Be careful, it seems like it's still cool weather, but it's not.",
            "It's easy to catch a cold, you should put on something warm."
        ];
        let arrayForNoRain = [
            "No rain at all.",
            "Gods of rain told me that they would be merciful this day.",
            "Nothing will fall from sky, unless some bird will be flying over you."
        ];
        let arrayForSmallProbRain = [
            "It shouldn't be raining, but there is a small chance.",
            "You should look at the sky from time to time, small chance of rain.",
            "There is a small probability if rain."
        ]
        let arrayForRain = [
            "You really should take an umbrella, it would be raining.",
            "There is a high chance of rain.",
            "Don't plan anything outside, it would be raining."
        ];
        let arrayForClearSky = [
            "Sky would be clear."
        ];
        let arrayForClouds = [
            "It will cloudy."
        ];
        let arrayForHalfClouds = [
            "Half of sky will be in clouds."
        ]
        let arrayForWeakWind = [
            "Wind will be weak."
        ];
        let arrayForPowerWind = [
            "It also will be windy."
        ];
        if(temp >= 18) text += `${arrayForHotWeather[Math.floor(Math.random() * (3))]}`
        if(temp >= 10 && temp < 18) text += ` ${arrayForCoolWeather[Math.floor(Math.random() * (3))]}`
        if(temp < 10) text += ` ${arrayForColdWeather[Math.floor(Math.random() * (3))]}`
        if(rain < 10) text += ` ${arrayForNoRain[Math.floor(Math.random() * (3))]}`
        if(rain >= 10 && rain < 50) text += ` ${arrayForSmallProbRain[Math.floor(Math.random() * (3))]}`
        if(rain >= 50) text += ` ${arrayForRain[Math.floor(Math.random() * (3))]}`
        if(clouds >= 70) text += ` ${arrayForClouds[0]}`
        if(clouds < 70 && clouds >= 30) text += ` ${arrayForHalfClouds[0]}`
        if(clouds < 30) text += ` ${arrayForClearSky[0]}`
        if(wind >= 5) text += ` ${arrayForPowerWind[0]}`
        if(wind < 5) text += ` ${arrayForWeakWind[0]}`
        return text;
    };

    //creates formated date
    const createFormatedDate = date => {
        const newDate = new Date(date)
        const formatDate = `${newDate.getDate()} ${new Intl.DateTimeFormat('en-US', {month: "long"}).format(newDate)}`
        return formatDate;
    }

    //renders list of weather if props.weatherData exists
    const RenderList = () => {
        if(props.weatherData){
            console.log(props.weatherData)
            const list = props.weatherData.data.map((el) => {
                return (
                    <Card key={el.ts}>
                        <Accordion.Toggle as={Card.Header} eventKey={el.ts.toString()}>
                            <Container>
                                <Row>
                                    <div className="col-5 col-lg-3">{createFormatedDate(el.datetime)}</div>
                                    <div className="col-2"><img alt="Not Found" width="40px" src={`https://www.weatherbit.io/static/img/icons/${el.weather.icon}.png`}/></div>
                                    <div className="col-4">
                                        <div><small>min: {el.min_temp}°</small></div>
                                        <div><small>max: {el.max_temp}°</small></div>
                                    </div>
                                </Row>
                            </Container>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={el.ts.toString()}>
                        <Card.Body>
                            <div>
                                <Row>
                                    <img className="col-4 col-sm-4" alt="Not Found" width="100px" src={`https://www.weatherbit.io/static/img/icons/${el.weather.icon}.png`}/>
                                    <div className="col-12 col-sm-8">
                                        <p>Average Temperature: {el.temp}°C</p>
                                        <p>Probability of Precipitation: {el.pop}%</p>
                                        <p>Wind speed: {Math.round(el.wind_spd)}m/s</p>
                                        <p>Humidity: {el.rh}%</p>
                                    </div>
                                </Row>
                                <div>{createDescription(el.temp, el.pop, el.clouds, el.wind_spd)}</div>
                            </div>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card> 
                )
            })
            return(
                <React.Fragment>
                    <h4 className="weather-head">Weather in {props.weatherData.city_name}, {createFormatedDate(props.weatherData.data[0].datetime)} - {createFormatedDate(props.weatherData.data[props.weatherData.data.length - 1].datetime)}</h4>
                    <Accordion defaultActiveKey={`${props.weatherData.data[0].ts}`} className="col-12 col-lg-6">
                        {list}
                    </Accordion>
                </React.Fragment>
            )
        }
        else{
            return <div></div>
        }
    }

    return(
        <div>
            <RenderList/>
        </div>
    )
}


export default ForecastComponent;


