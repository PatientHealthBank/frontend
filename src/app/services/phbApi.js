import axios from 'axios'

const phbApi = () => axios.create({
    baseURL: process.env.NODE_ENV == "development" ? "https://localhost:44310/" : "http://patienthealthbankapi.azurewebsites.net/" ,
    header:{
        Authorization: "Bearer " + localStorage.getItem('jwt_access_token')
    }
});


export default phbApi;