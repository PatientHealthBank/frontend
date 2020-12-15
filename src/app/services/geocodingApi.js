
import axios from 'axios'

const geocodingApi = {
    get(value) {
        var api = axios.create({
            baseURL: "https://maps.googleapis.com/maps/api/geocode/",
        });
        return api.get(`json?address=${value}&key=AIzaSyB0pi7GKm7Fd39VMSmIiz8uJweF9tBTkYs`)
    }
}

export default geocodingApi;