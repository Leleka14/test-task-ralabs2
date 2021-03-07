import axios from 'axios';
import * as API from './API'

export const weatherRequest = (city) => {
    return axios.create({
        baseURL: `${API.weatherAPI}?city=${city}&key=${API.weatherAPIKey}`
    })
}

export const findLocationRequest = (lat, long) => {
    return axios.create({
        baseURL: `http://api.positionstack.com/v1/reverse?access_key=${API.reverseTrackAPIKey}&query=${lat},${long}`
    })
}