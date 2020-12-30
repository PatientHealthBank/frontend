import axios from 'axios';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyB0pi7GKm7Fd39VMSmIiz8uJweF9tBTkYs");

const apiKey = 'AIzaSyB0pi7GKm7Fd39VMSmIiz8uJweF9tBTkYs';

const geocodingApi = {
	get(value) {
		var api = axios.create({
			baseURL: 'https://maps.googleapis.com/maps/api/geocode/',
			headers: { 
				'Access-Control-Allow-Origin' : '*',
				'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
			  },
		});
		return api.get(`json?address=${value}&key=${apiKey}`);
	},

};
 const getLatLong =  {
	get(){
	Geocode.fromAddress("Eiffel Tower").then(
		response => {
		  return response.results[0].geometry.location;

		},
		error => {
		  console.error(error);
		}
	  );
	}
}
// Get latitude & longitude from address.


export default {geocodingApi,getLatLong};
