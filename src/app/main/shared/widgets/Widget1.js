import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Slider from '@material-ui/core/Slider';
import Collapse from '@material-ui/core/Collapse';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from "react-i18next";
import phbApi from '../../../services/phbApi'
import { openLoading, closeLoading }  from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import { toast } from "react-toastify";



const ColorButton = withStyles((theme) => ({
	root: {
		color: "#FFF",
		backgroundColor: "#8CC63F",
		'&:hover': {
			backgroundColor: "#8aa63F",
		},
	},
}))(Button);
const PrettoSlider = withStyles({
	root: {
		color: '#BBDEFB',
		height: 8,
	},
	thumb: {
		height: 24,
		width: 24,
		backgroundColor: '#fff',
		border: '2px solid currentColor',
		marginTop: -8,
		marginLeft: -12,
		'&:focus, &:hover, &$active': {
			boxShadow: 'inherit',
		},
	},
	active: {},
	valueLabel: {
		left: 'calc(-50% + 4px)',
		color: "#0D47A1"
	},
	track: {
		height: 8,
		borderRadius: 4,
	},
	rail: {
		height: 8,
		borderRadius: 4,
	},
})(Slider);

const useStyles = makeStyles(theme => ({
	root: {
		background: "#339AC3",
		textAlign: "center",
		paddingBottom: "20px",
	},
	baner: {
		textAlign: "center"
	},
	headerFont: {
		color: "#FFF"
	},
	containerHeader: {
		background: "#007DA5",
		borderRadius: "10px",
		padding: "5px",
		'& .MuiInputBase-root': {
			background: '#fff'
		}
	},
	alignRight: {
		textAlign: "right",
		verticalAlign: 'text-top'
	},
	fontAdvanced: {
		fontWeight: 100,
		verticalAlign: 'text-top',
		'& span': {
			verticalAlign: 'text-top',
		}
	}
}));

function valuetext(value) {
	return `${value} km`;
}

function Widget1(props) {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const [collapse, setCollapse] = React.useState(false);
	const [specialties, setSpecialties] = React.useState([]);
	const [clinicalInterest, setClinicalInterest] = React.useState([]);


	React.useEffect(()=>{
		phbApi().get('/specialty/List').then(res=>{
			setSpecialties(res.data.map(x=>x.description))
		})
	},[])

	var findClinicalInterest = (value) =>{
		dispatch(openLoading())
		phbApi().get('/clinicalinterest/BySpecialtyDesc', { params: {specialty: value} }).then(res=>{
			setClinicalInterest(res.data.map(x=>x.description));
			dispatch(closeLoading())

		})
		.catch(err=> {
			dispatch(closeLoading())
		})
	}

	const classes = useStyles(props);

	return (

		<div className={clsx(classes.root)}>
			<div className="container items-center">

				<div className="flex-row">
					<Typography className={classes.headerFont} variant='h2' style={{ paddingTop: '1%', paddingBottom: "1%" }}>
						{t("Find a Clinic/Doctor near You")}
					</Typography>
				</div>
				<div className="flex-row">
					<Typography className={classes.headerFont} variant='h5'>

					</Typography>
				</div>

				<div className={"flex-row " + classes.containerHeader}>

					<div className={classes.alignRight}>

						<Link
							component="button"
							color="inherit"
							onClick={() => setCollapse(!collapse)}
						>
							<Typography className={clsx(classes.headerFont, classes.fontAdvanced)} variant='h6'>

								<Icon className={classes.headerFont} >
									filter_list
										</Icon>
								{t("Advanced Search")}

							</Typography>
						</Link>
						<Collapse in={collapse}>

							<div style={{ textAlign: 'center', padding: "0 30px" }}>
								<Typography className={clsx(classes.headerFont, classes.fontAdvanced)} variant='h6'>
									{t('Distance Range')}
								</Typography>
								<PrettoSlider
									defaultValue={5}
									valueLabelFormat={valuetext(props.range.value)}
									onChange={(event, newValue) => props.range.setValue(newValue)}
									aria-labelledby="discrete-slider"
									valueLabelDisplay="auto"
									step={1}
									marks
									min={1}
									max={50}
								/>
							</div>
						</Collapse>
						<div style={{ marginRight: "15px", marginLeft: "15px" }}>
							<Grid container spacing={3}>

								<Grid item xs={6} md={6} lg={3} xl={3}>
									<Autocomplete
										id="specialties"
										freeSolo
										options={specialties}
										value={props.specialty.value}
										onChange={(event, newValue) => {
											props.specialty.setValue(newValue);
										}}
										onBlur={(event)=>{
											props.clinicalInterest.setValue("");
											findClinicalInterest(event.target.value)
										}}
										renderInput={(params) => (
											<TextField {...params} label={t("Specialty")} margin="normal" variant="filled" />

										)} />
								</Grid>
								<Grid item xs={6} md={6} lg={3} xl={3}>
									<Autocomplete
										id="clinicalInterest"
										freeSolo
										options={clinicalInterest}
										disabled={props.specialty.value == ""}
										value={props.clinicalInterest.value}
										onChange={(event, newValue) => {
											props.clinicalInterest.setValue(newValue);
										}}
										renderInput={(params) => (
											<TextField {...params} label={t("Clinical Interest")} margin="normal" variant="filled" />

										)} />
								</Grid>
								<Grid item xs={6} md={6} lg={3} xl={3}>
									<TextField label={t("ZipCode")} style={{ width: '100%' }}
										id="standard-basic"
										margin="normal"
										disabled={props.city.value != ""}
										value={props.zipCode.value || ''}
										onChange={(event) => {
												props.zipCode.setValue(event.target.value.replace(/[^0-9]/g, ''));
										  }}
										onBlur={(event)=>{props.updateMapByZipCode(event.target.value)}}
										variant="filled" />
								</Grid>
								<Grid item xs={6} md={6} lg={3} xl={3}>
									<TextField style={{ width: '100%' }}
 										label={t("Location")} margin="normal" variant="filled" 
										disabled={props.zipCode.value != ""}
										value={props.city.value || ''}
										onChange={(event) => {
											props.city.setValue(event.target.value)
										}}
										onBlur={(event)=>{props.updateMapByLocation(event.target.value)}} />
										
									<ColorButton variant="contained" 
									disabled={props.city.value == "" && props.zipCode.value == ""}
									onClick={() => {
										if(props.city.value != "" || props.zipCode.value != "" ){
											props.city.value != "" ?  props.updateMapByZipCode() : props.updateMapByLocation();
										}
										else{
												toast.warn("Zipcode or Location is Required");
											}
										
										}} className={classes.margin}>
										{t("Find")}
									</ColorButton>
								</Grid>

							</Grid>
						</div>
					</div>
				</div>


			</div>

		</div>
	);
}

export default withRouter(Widget1);