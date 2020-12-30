import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect, useForm } from '@fuse/hooks';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { useTheme, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import reducer from '../store';
import { setGeoCoordinate, saveClinic, getClinic, newClinic, updateClinic } from '../store/clinicSlice.js';
import { getUsers } from '../../../../auth/store/userSlice';
import Geocode from 'react-geocode';
import Autocomplete from '@material-ui/lab/Autocomplete';

const PrimaryButton = withStyles(theme => ({
	root: {
		color: '#ffffff',
		backgroundColor: '#24aae0',
		'&:hover': {
			backgroundColor: '#1d8ab5'
		}
	}
}))(Button);

function ClinicBranch(props) {
	const dispatch = useDispatch();
	const clinic = useSelector(({ ClinicApp }) => ClinicApp.clinic);
	const users = useSelector(({ auth }) => auth.user);
	console.log('users', users);
	const theme = useTheme();
	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updateClinicState() {
			dispatch(getUsers());
			const { clinicId } = routeParams;
			console.log('update', clinicId);
			if (clinicId == 'new') {
				console.log('salvando');
				dispatch(newClinic());
			} else {
				console.log('pegando');
				dispatch(getClinic(routeParams));
			}
		}

		updateClinicState();
	}, [dispatch, routeParams]);
	const top100Films = [
		{ title: 'The Shawshank Redemption', year: 1994 },
		{ title: 'The Godfather', year: 1972 },
		{ title: 'The Godfather: Part II', year: 1974 },
		{ title: 'The Dark Knight', year: 2008 },
		{ title: '12 Angry Men', year: 1957 },
		{ title: "Schindler's List", year: 1993 },
		{ title: 'Pulp Fiction', year: 1994 },
		{ title: 'The Lord of the Rings: The Return of the King', year: 2003 },
		{ title: 'The Good, the Bad and the Ugly', year: 1966 },
		{ title: 'Fight Club', year: 1999 },
		{ title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
		{ title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
		{ title: 'Forrest Gump', year: 1994 },
		{ title: 'Inception', year: 2010 },
		{ title: 'The Lord of the Rings: The Two Towers', year: 2002 },
		{ title: "One Flew Over the Cuckoo's Nest", year: 1975 },
		{ title: 'Goodfellas', year: 1990 },
		{ title: 'The Matrix', year: 1999 },
		{ title: 'Seven Samurai', year: 1954 },
		{ title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
		{ title: 'City of God', year: 2002 },
		{ title: 'Se7en', year: 1995 },
		{ title: 'The Silence of the Lambs', year: 1991 },
		{ title: "It's a Wonderful Life", year: 1946 },
		{ title: 'Life Is Beautiful', year: 1997 },
		{ title: 'The Usual Suspects', year: 1995 },
		{ title: 'Léon: The Professional', year: 1994 },
		{ title: 'Spirited Away', year: 2001 },
		{ title: 'Saving Private Ryan', year: 1998 },
		{ title: 'Once Upon a Time in the West', year: 1968 },
		{ title: 'American History X', year: 1998 },
		{ title: 'Interstellar', year: 2014 },
		{ title: 'Casablanca', year: 1942 },
		{ title: 'City Lights', year: 1931 },
		{ title: 'Psycho', year: 1960 },
		{ title: 'The Green Mile', year: 1999 },
		{ title: 'The Intouchables', year: 2011 },
		{ title: 'Modern Times', year: 1936 },
		{ title: 'Raiders of the Lost Ark', year: 1981 },
		{ title: 'Rear Window', year: 1954 },
		{ title: 'The Pianist', year: 2002 },
		{ title: 'The Departed', year: 2006 },
		{ title: 'Terminator 2: Judgment Day', year: 1991 },
		{ title: 'Back to the Future', year: 1985 },
		{ title: 'Whiplash', year: 2014 },
		{ title: 'Gladiator', year: 2000 },
		{ title: 'Memento', year: 2000 },
		{ title: 'The Prestige', year: 2006 },
		{ title: 'The Lion King', year: 1994 },
		{ title: 'Apocalypse Now', year: 1979 },
		{ title: 'Alien', year: 1979 },
		{ title: 'Sunset Boulevard', year: 1950 },
		{ title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
		{ title: 'The Great Dictator', year: 1940 },
		{ title: 'Cinema Paradiso', year: 1988 },
		{ title: 'The Lives of Others', year: 2006 },
		{ title: 'Grave of the Fireflies', year: 1988 },
		{ title: 'Paths of Glory', year: 1957 },
		{ title: 'Django Unchained', year: 2012 },
		{ title: 'The Shining', year: 1980 },
		{ title: 'WALL·E', year: 2008 },
		{ title: 'American Beauty', year: 1999 },
		{ title: 'The Dark Knight Rises', year: 2012 },
		{ title: 'Princess Mononoke', year: 1997 },
		{ title: 'Aliens', year: 1986 },
		{ title: 'Oldboy', year: 2003 },
		{ title: 'Once Upon a Time in America', year: 1984 },
		{ title: 'Witness for the Prosecution', year: 1957 },
		{ title: 'Das Boot', year: 1981 },
		{ title: 'Citizen Kane', year: 1941 },
		{ title: 'North by Northwest', year: 1959 },
		{ title: 'Vertigo', year: 1958 },
		{ title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
		{ title: 'Reservoir Dogs', year: 1992 },
		{ title: 'Braveheart', year: 1995 },
		{ title: 'M', year: 1931 },
		{ title: 'Requiem for a Dream', year: 2000 },
		{ title: 'Amélie', year: 2001 },
		{ title: 'A Clockwork Orange', year: 1971 },
		{ title: 'Like Stars on Earth', year: 2007 },
		{ title: 'Taxi Driver', year: 1976 },
		{ title: 'Lawrence of Arabia', year: 1962 },
		{ title: 'Double Indemnity', year: 1944 },
		{ title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
		{ title: 'Amadeus', year: 1984 },
		{ title: 'To Kill a Mockingbird', year: 1962 },
		{ title: 'Toy Story 3', year: 2010 },
		{ title: 'Logan', year: 2017 },
		{ title: 'Full Metal Jacket', year: 1987 },
		{ title: 'Dangal', year: 2016 },
		{ title: 'The Sting', year: 1973 },
		{ title: '2001: A Space Odyssey', year: 1968 },
		{ title: "Singin' in the Rain", year: 1952 },
		{ title: 'Toy Story', year: 1995 },
		{ title: 'Bicycle Thieves', year: 1948 },
		{ title: 'The Kid', year: 1921 },
		{ title: 'Inglourious Basterds', year: 2009 },
		{ title: 'Snatch', year: 2000 },
		{ title: '3 Idiots', year: 2009 },
		{ title: 'Monty Python and the Holy Grail', year: 1975 }
	];
	const handleSubmit = form => {
		console.log('handlesubmit', form);
		if (form.id == null) {
			dispatch(saveClinic(form));
		} else {
			dispatch(updateClinic(form));
		}
	};
	const getAddress = e => {
		e.persist();
		Geocode.setApiKey('AIzaSyB0pi7GKm7Fd39VMSmIiz8uJweF9tBTkYs');

		Geocode.fromAddress('Eiffel Tower').then(
			response => {
				dispatch(setGeoCoordinate(response.results[0].geometry.location));
			},
			error => {
				console.error(error);
			}
		);

		// .then(res => dispatch(setGeoCoordinate(res.data.results[0].geometry.location)));
	};
	useEffect(() => {
		if ((clinic && !form) || (clinic && form && clinic.id !== form.id)) {
			setForm(clinic);
		}
	}, [form, clinic, setForm]);

	function canBeSubmitted() {
		return form.companyName && form.companyName.length > 0 && !_.isEqual(clinic, form);
	}
	// return(<h1>Hello world</h1>)
	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				form && (
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-col items-start max-w-full">
							<Typography
								className="normal-case flex items-center sm:mb-12"
								component={Link}
								role="button"
								to="."
								color="inherit"
							>
								<Icon className="text-20">
									{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
								</Icon>
								<span className="mx-4">Clinics</span>
							</Typography>

							<div className="flex items-center max-w-full">
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate">
											{form.companyName ? form.companyName : 'New Clinic'}
										</Typography>
									</FuseAnimate>
								</div>
							</div>
						</div>
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<PrimaryButton
								className="whitespace-no-wrap normal-case"
								variant="contained"
								color="secondary"
								disabled={!canBeSubmitted()}
								onClick={() => handleSubmit(form)}
							>
								Save
							</PrimaryButton>
						</FuseAnimate>
					</div>
				)
			}
			content={
				form && (
					<div className="p-16 sm:p-24">
						<div>
							<Grid container spacing={3}>
								<Grid item xs={6}>
									{/* <Autocomplete
										id="combo-box-demo"
										options={top100Films}
										getOptionLabel={option => option.title}
										style={{ width: 300 }}
										renderInput={params => (
											<TextField {...params} label="Usuário" variant="outlined" />
										)}
									/> */}
									<br></br>
									<TextField
										className="mt-8 mb-16"
										required
										label="Clinic Name"
										id="companyName"
										name="companyName"
										value={form.companyName}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>
									<TextField
										className="mt-8 mb-16"
										required
										label="Email"
										id="email"
										name="email"
										value={form.email}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>
									<Grid container spacing={3}>
										<Grid item xs={6}>
											<TextField
												className="mt-8 mb-16"
												required
												label="Zip Code"
												id="address.zipCode"
												name="address.zipCode"
												value={form.address.zipCode}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												className="mt-8 mb-16"
												required
												label="Country"
												id="address.country"
												name="address.country"
												value={form.address.country}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
										</Grid>
									</Grid>

									<TextField
										className="mt-8 mb-16"
										required
										label="Address Line 1"
										id="address.addressLine1"
										name="address.addressLine1"
										value={form.address.addressLine1}
										onChange={handleChange}
										onBlur={e => getAddress(e)}
										variant="outlined"
										fullWidth
									/>

									<Grid container spacing={3}>
										<Grid item xs={6}>
											<TextField
												className="mt-8"
												required
												label="City"
												id="address.city"
												name="address.city"
												value={form.address.city}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												className="mt-8"
												required
												label="State / Province / Region"
												id="address.state"
												name="address.state"
												value={form.address.state}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												className="mb-16"
												required
												label="Telephone"
												id="phone"
												name="phone"
												value={form.phone}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>

											<TextField
												className="mt-8 mb-16"
												required
												label="TAX ID"
												id="taxId"
												name="taxId"
												value={form.taxId}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</div>
					</div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('ClinicApp', reducer)(ClinicBranch);
