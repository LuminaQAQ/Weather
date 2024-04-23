import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://devapi.qweather.com',
    params: {
        key: 'a36fd62bc2da4c099f2893fc9c276c71',
    },
    data: {
        key: 'a36fd62bc2da4c099f2893fc9c276c71',
    },
    timeout: 15000,
    headers: {},
    
})

export default instance;