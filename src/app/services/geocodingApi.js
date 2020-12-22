import axios from 'axios';
const apiKey = 'AIzaSyB0pi7GKm7Fd39VMSmIiz8uJweF9tBTkYs';

const geocodingApi = {
	get(value) {
		var api = axios.create({
			baseURL: 'https://maps.googleapis.com/maps/api/geocode/'
		});
		return api.get(`json?address=${value}&key=${apiKey}`);
	},
};

export default geocodingApi;
