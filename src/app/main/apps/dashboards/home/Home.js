import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import reducer from './store';
import Grid from '@material-ui/core/Grid';
import Widget1 from '../../../shared/widgets/Widget1';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import geocodingApi from '../../../../services/geocodingApi'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import phbApi from '../../../../services/phbApi'
import Rating from '@material-ui/lab/Rating';
import { withRouter } from 'react-router-dom';



const containerStyle = {
	width: '100%',
	height: '65vh'
};

function AnalyticsDashboardApp(props) {
	const [city, setCity] = useState("")
	const [zipCode, setZipCode] = useState("")
	const [specialty, setSpecialty] = useState("")
	const [clinicalInterest, setClinicalInterest] = useState("")
	const [notFound, setNotFound] = useState(false)


	const [clinics, setClinics] = useState([])

	const [range, setRange] = useState(5)



	const [location, setLocation] = useState(
		{
			lat: 42.3600825,
			lng: -71.0588801
		})


	var updateMapByLocation = (value) => {
		var code = value || city
		if (code) {
			geocodingApi.get(code).then(res => {
				if (res.status === "OK") {
					setLocation(res.results[0].geometry.location)
					phbApi().get("Clinic/ByRange", {
						params: {
							range,
							latitude: parseFloat(res.results[0].geometry.location.lat),
							longitude: parseFloat(res.results[0].geometry.location.lng),
							specialty,
							clinicalInterest
						}
					})
						.then(res => {
							if (!res.data.error) {
								setClinics(res.data)
							}
							else {
								setClinics(res.data)
							}
							updateNotFound(res.data)
						})
				}
			})
		}
	}

	var updateMapByZipCode = (value) => {
		var code = value || zipCode
		if (code) {
			geocodingApi.get(code).then(res => {
				if (res.status === "OK") {
					setLocation(res.results[0].geometry.location)
					phbApi().get("Clinic/ByZipCode", {
						params:
						{
							zipCode: code,
							specialty,
							clinicalInterest
						}
					})
						.then(res => {
							if (!res.data.error) {
								setClinics(res.data)
							}
							else {
								setClinics(res.data)
							}
							updateNotFound(res.data)
						})
				}
			}).catch(err=>console.log(err))
		}
	}

	var updateNotFound = (res) => {
		if (res.length <= 0) {
			setNotFound(true)
		}
		else {
			setNotFound(false)
		}
	}
	var handlePage = (id) => {
		props.history.push(`/find-doctors/${id}?specialty=${specialty}&clinicalInterest=${clinicalInterest}`)
	}

	if (localStorage.getItem("covid")) {
		localStorage.removeItem("covid", false)
	}
	return (
		<div className="w-full">
			<Widget1 loc={location}
				updateMapByZipCode={updateMapByZipCode}
				updateMapByLocation={updateMapByLocation}
				zipCode={{ value: zipCode, setValue: setZipCode }}
				specialty={{ value: specialty, setValue: setSpecialty }}
				range={{ value: range, setValue: setRange }}
				clinicalInterest={{ value: clinicalInterest, setValue: setClinicalInterest }}
				city={{ value: city, setValue: setCity }} />
			<LoadScript
				googleMapsApiKey="AIzaSyB0pi7GKm7Fd39VMSmIiz8uJweF9tBTkYs"
			>
				<Grid container spacing={0}>
					{notFound &&
						<Grid item xs={12} lg={4} md={4} sm={12} xl={4}>
							<div class="text-center">
								<h1>Clinics not found for that region</h1>
							</div>
						</Grid>}

					{clinics && clinics.length > 0 &&
						<Grid item xs={12} lg={4} md={4} sm={12} xl={4}>
							<div style={{ overflow: 'scroll', height: containerStyle.height }}>
								{clinics && clinics.map((clinic, i) => (
									<a onClick={() => handlePage(clinic.id)} style={{ cursor: 'pointer' }}>
										<div key={i} style={{ padding: "20px" }}>

											<Paper className="w-full rounded-8 shadow-1">
												<div className="flex items-center justify-between px-16 py-16 border-b-1">
													<Typography variant="h5"><strong>{clinic.companyName}</strong></Typography>
													<div className="items-center">

													</div>
												</div>
												<div className="flex flex-row flex-wrap">
													<div className="w-full md:w-1/4 p-8 min-h-420 h-420 self-center text-center">
														<img src="assets/images/logos/clinic.png" alt="Logo" />
													</div>
													<div className="flex w-full md:w-3/4 flex-wrap p-8">
														<div>
															<div style={{ fontSize: 'large', paddingTop: "5px", paddingBottom: '5px' }}><strong style={{ marginRight: '5px' }}>Adress:</strong> {clinic.address.addressLine1}</div>
															<div style={{ fontSize: 'large', paddingTop: "5px", paddingBottom: '5px' }}><strong style={{ marginRight: '5px' }}>Phone:</strong> (31) 3322-3322</div>
															<Rating name="read-only" precision={0.1} value={clinic.score} readOnly />
														</div>
													</div>
												</div>
											</Paper>
										</div>
									</a>
								))}

							</div>	</Grid>}
					<Grid item xs={12} lg={clinics.length == 0 && !notFound ? 12 : 8} md={clinics.length == 0 && !notFound ? 12 : 8} sm={12} xl={clinics.length == 0 && !notFound ? 12 : 8}>
						<GoogleMap
							mapContainerStyle={containerStyle}
							center={location}
							zoom={14}
							id={'map'}
							options={{
								scrollwheel: false,
								mapTypeControl: false,
								streetViewControl: false,
								fullscreenControl: false,
							}}
						>
							{clinics && clinics.map((clinic, i) => {
								return <Marker key={i} position={{ lat: parseFloat(clinic.address.latitude), lng: parseFloat(clinic.address.longitude) }}
									//label={clinic.companyName} 
									title={clinic.companyName} />
							})}
							<></>
						</GoogleMap>
					</Grid>
				</Grid>


			</LoadScript>
			{/* {city === 'Belo Horizonte' ? 
			(<img style={{width:"100%"}} src="assets/images/map/belo-horizonte.png" alt="Logo"/>) :
			(city === 'Miami' ? (<img style={{width:"100%"}} src="assets/images/map/miami-map.png" alt="Logo"/>) :
			( <img style={{width:"100%"}} src="assets/images/map/Boston.png" alt="Logo"/>)) */}
		</div>
	);
}

export default withRouter(withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp));
