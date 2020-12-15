import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import _ from '@lodash';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { saveTreatment, newTreatment, getTreatment } from './store/treatmentSlice';
import reducer from './store';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import FormGroup from '@material-ui/core/FormGroup';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import MedicationDialog from './MedicationDialog'
import TreatmentTracker from './treatment-tracker/TreatmentTracker';

const useStyles = makeStyles(theme => ({
	mailItem: {
		borderBottom: `1px solid  ${theme.palette.divider}`,

		'&.unread': {
			background: 'rgba(0,0,0,0.03)'
		},
		'&.selected': {
			'&::after': {
				content: '""',
				position: 'absolute',
				left: 0,
				display: 'block',
				height: '100%',
				width: 3,
				backgroundColor: theme.palette.primary.main
			}
		}
	},
	avatar: {
		backgroundColor: theme.palette.primary[500]
	},
	formControl: {
		margin: theme.spacing(3),
	},
	typeIcon: {
		'&.PDF:before': {
			content: "'picture_as_pdf'",
			color: '#F44336'
		},
		'&.document:before': {
			content: "'insert_drive_file'",
			color: '#1565C0'
		},
		'&.spreadsheet:before': {
			content: "'insert_chart'",
			color: '#4CAF50'
		}
	},
	treatmentImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	treatmentImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	treatmentImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $treatmentImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $treatmentImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $treatmentImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));

function Treatment(props) {
	const dispatch = useDispatch();
	const [openMedical, setOpenMedical] = useState(false);
	const treatment = useSelector(({ TreatmentsApp }) => TreatmentsApp.treatment);

	const theme = useTheme();
	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const { form, handleChange, setForm } = useForm(null);
	const [specialtyDescription, setSpecialty] = React.useState("Specialty")
	const routeParams = useParams();

	const setMedicines = (medicine) => {
		setForm(
			_.set({ ...form }, `medicines`, [
				medicine,
				...form.medicines
			])
		);

	}
	useDeepCompareEffect(() => {
		function updateTreatmentState() {
			const { treatmentId } = routeParams;

			if (treatmentId === 'new') {
				dispatch(newTreatment());
			} else {
				dispatch(getTreatment(routeParams));
			}
		}

		updateTreatmentState();
	}, [dispatch, routeParams]);


	useEffect(() => {
		if ((treatment && !form) || (treatment && form && treatment.id !== form.id)) {
			setForm(treatment);
		}
	}, [form, treatment, setForm]);
	useEffect(() => {
		if (form && form.specialty && specialtyDescription === "Specialty") {
			setSpecialty(form.specialtyDescription)
		}
	}, [form,specialtyDescription])

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	function handleSpecialtyChange(event) {

		handleChange(event)
		console.log(event.target.options[event.target.selectedIndex].text)
		setSpecialty(event.target.options[event.target.selectedIndex].text)
	}

	function canBeSubmitted() {
		// return form.clinic && form.clinic.length > 0 && !_.isEqual(treatment, form);
		return true;
	}

	if ((!treatment || (treatment && routeParams.treatmentId !== treatment.id)) && routeParams.treatmentId !== 'new') {
		return <FuseLoading />;
	}

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
								to="/treatments"
								color="inherit"
							>
								<Icon className="text-20">
									{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
								</Icon>
								<span className="mx-4">Treatments</span>
							</Typography>

							<div className="flex items-center max-w-full">
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate">
											{form.treatment ? form.treatment : 'New Treatment'}
										</Typography>
									</FuseAnimate>
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography variant="caption">{specialtyDescription ? specialtyDescription : 'Specialty'}</Typography>
									</FuseAnimate>
								</div>
							</div>
						</div>
						<FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								className="whitespace-no-wrap normal-case"
								variant="contained"
								color="secondary"
								disabled={!canBeSubmitted()}
								onClick={() => dispatch(saveTreatment(form))}
							>
								Save
							</Button>
						</FuseAnimate>
					</div>
				)
			}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					// indicatorColor="tabColor"
					// textColor="tabColor"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64 normal-case" label="My Treatment Tracker" />
					<Tab className="h-64 normal-case" label="My Treatment Goals" />
					<Tab className="h-64 normal-case" label="My Appointments" />
					<Tab className="h-64 normal-case" label="My Medications" />
					<Tab className="h-64 normal-case" label="Care Team" />
				</Tabs>
			}
			content={
				form && (
					<div className="p-16 sm:p-24">
						{tabValue === 0 && (<TreatmentTracker/>
						)}
						{tabValue === 1 && (
							<div>
								<Grid container spacing={3}>
									<Grid item xs={4}>
										<TextField
											className="mt-8 mb-16"
											error={form.treatment === ''}
											required
											label="Treatment Name"
											id="treatment"
											name="treatment"
											value={form.treatment}
											onChange={handleChange}
											variant="outlined"
											fullWidth
											autoFocus
										/>
										<FormControl fullWidth variant="outlined" className="mt-8 mb-16">
											<InputLabel htmlFor="outlined-age-native-simple">Medical Specialty</InputLabel>
											<Select
												native
												id="specialty"
												name="specialty"
												value={form.specialty}
												onChange={handleSpecialtyChange}
												label="Medical Specialty"
												inputProps={{
													name: 'specialty',
													id: 'outlined-age-native-simple',
												}}
											>
												<option aria-label="None" value="" />
												<option value={1}>Cardiology</option>
												<option value={2}>Dermatology</option>
												<option value={3}>Family Medicine</option>
												<option value={4}>Gastroenterology</option>
												<option value={5}>Neurology</option>
												<option value={6}>Neurosurgery</option>
												<option value={7}>Pathology</option>
												<option value={8}>Pediatrics</option>
												<option value={9}>Psychiatry</option>
												<option value={10}>Radiology</option>
												<option value={11}>Urology</option>
											</Select>
										</FormControl>

										<Grid item container spacing={3}>
											<Grid item xs={4}>
												<TextField
													className="mt-8 mb-16"
													required
													label="Number"
													id="numberPeriodTreatment"
													name="numberPeriodTreatment"
													value={form.numberPeriodTreatment}
													onChange={handleChange}
													variant="outlined"
												/>
											</Grid>
											<Grid item xs={8} >
												<FormControl fullWidth variant="outlined" className="mt-8 mb-16 mr-16">
													<InputLabel htmlFor="expected">Expected Duration</InputLabel>
													<Select
														native
														id="period"
														name="period"
														value={form.period}
														onChange={handleChange}
														label="Expected Duration"
														inputProps={{
															name: 'expected',
															id: 'outlined-age-native-simple',
														}}
													>
														<option aria-label="None" value="" />
														<option value={1}>Days</option>
														<option value={2}>Weeks</option>
														<option value={3}>Months</option>
														<option value={4}>Chronic Treatment</option>
													</Select>
												</FormControl>
											</Grid>
										</Grid>

										<Typography className="text-16 sm:text-20 truncate mb-32 mt-16">
											{'Select your treatment goals ?'}
										</Typography>

										<FormControl component="fieldset" className="mr-32">
											<FormGroup>
												<FormControlLabel
													control={<Checkbox name="attendWork" checked={form.attendWork} onChange={handleChange} />}
													label="Attend work/school/church"
												/>
												<FormControlLabel
													control={<Checkbox name="beMoreActive" checked={form.beMoreActive} onChange={handleChange} />}
													label="Be more active"
												/>
												<FormControlLabel
													control={<Checkbox name="stopMedication" checked={form.stopMedication} onChange={handleChange} />}
													label="Stop medication"
												/>
												<FormControlLabel
													control={<Checkbox checked={form.stopPain} onChange={handleChange} name="stopPain" />}
													label="Stop or reduce pain"
												/>
												<FormControlLabel
													control={<Checkbox checked={form.notFeelingDepress} onChange={handleChange} name="notFeelingDepress" />}
													label="Not feeling depressed"
												/>
											</FormGroup>
										</FormControl>

										<FormControl component="fieldset">
											<FormGroup>
												<FormControlLabel
													control={<Checkbox checked={form.notFeelingAnxious} onChange={handleChange} name="notFeelingAnxious" />}
													label="Not feeling anxious"
												/>
												<FormControlLabel
													control={<Checkbox checked={form.travel} onChange={handleChange} name="travel" />}
													label="Travel"
												/>
												<FormControlLabel
													control={<Checkbox checked={form.activeSexual} onChange={handleChange} name="activeSexual" />}
													label="Active sexual life"
												/>
												<FormControlLabel
													control={<Checkbox checked={form.visitFamily} onChange={handleChange} name="visitFamily" />}
													label="Visit family/friends"
												/>
												<FormControlLabel
													control={<Checkbox checked={form.practiceSports} onChange={handleChange} name="practiceSports" />}
													label="Practice sports/exercises"
												/>
												<FormControlLabel
													control={<Checkbox checked={form.others} onChange={handleChange} name="others" />}
													label="Others"
												/>
											</FormGroup>
										</FormControl>

										{form.others && <TextField
											className="mt-16 mb-16"
											id="othersObservation"
											name="othersObservation"
											onChange={handleChange}
											label="What are your treatment goals?"
											type="text"
											value={form.othersObservation}
											multiline
											rows={5}
											variant="outlined"
											fullWidth
										/>}

									</Grid>


									<Grid item xs={4}>
										<TextField
											className="mt-8 mb-16"
											error={form.patient === ''}
											required
											label="Patient"
											id="patient"
											name="patient"
											value={form.patient}
											onChange={handleChange}
											variant="outlined"
											fullWidth
										/>
									</Grid>
								</Grid>
							</div>
						)}
						{tabValue === 2 && (
							<div>
								<FuseAnimate animation="transition.slideUpIn" delay={300}>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>Appointment</TableCell>
												<TableCell className="hidden sm:table-cell">Doctor Name</TableCell>
												<TableCell className="hidden sm:table-cell">Patient</TableCell>
												<TableCell className="hidden sm:table-cell">Date</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{form.appointments && form.appointments.map(n => {
												return (
													<TableRow
														className="h-64 cursor-pointer"
														hover
														role="checkbox"
														// aria-checked={isSelected}
														tabIndex={-1}
														key={n.id}
													// selected={isSelected}
													// onClick={event => handleClick(n)}
													>
														{/* <TableCell
														className="w-52 px-16 md:px-0"
														component="th"
														scope="row"
														padding="none"
													>
														{ n.images.length > 0 && n.featuredImageId ? (
															<Avatar className="mx-4" alt={n.name} src={n.featuredImageId} />		
														) : (
															<img
																className="w-full block rounded"
																src="assets/images/ecommerce/product-image-placeholder.png"
																alt={n.name}
															/>
														)}
													</TableCell> */}

														<TableCell className="p-4 md:p-16" component="th" scope="row">
															{n.specialtyDescription}
														</TableCell>

														<TableCell className="p-4 md:p-16" component="th" scope="row">
															{n.doctorName}
														</TableCell>

														<TableCell className="p-4 md:p-16" component="th" scope="row">
															{n.patient}
														</TableCell>

														<TableCell className="p-4 md:p-16" component="th" scope="row">
															{n.date}
														</TableCell>
													</TableRow>
												);
											})}
										</TableBody>
									</Table>
								</FuseAnimate>
							</div>
						)}
						{tabValue === 3 && (
							<div>
								<FuseAnimate animation="transition.slideUpIn" delay={300}>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>Appointment</TableCell>
												<TableCell className="hidden sm:table-cell">Doctor Name</TableCell>
												<TableCell className="hidden sm:table-cell">Patient</TableCell>
												<TableCell className="hidden sm:table-cell">Date</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{form.appointments && form.appointments.map(n => {
												return (
													<TableRow
														className="h-64 cursor-pointer"
														hover
														role="checkbox"
														// aria-checked={isSelected}
														tabIndex={-1}
														key={n.id}
													// selected={isSelected}
													// onClick={event => handleClick(n)}
													>
														{/* <TableCell
														className="w-52 px-16 md:px-0"
														component="th"
														scope="row"
														padding="none"
													>
														{ n.images.length > 0 && n.featuredImageId ? (
															<Avatar className="mx-4" alt={n.name} src={n.featuredImageId} />		
														) : (
															<img
																className="w-full block rounded"
																src="assets/images/ecommerce/product-image-placeholder.png"
																alt={n.name}
															/>
														)}
													</TableCell> */}

														<TableCell className="p-4 md:p-16" component="th" scope="row">
															{n.specialtyDescription}
														</TableCell>

														<TableCell className="p-4 md:p-16" component="th" scope="row">
															{n.doctorName}
														</TableCell>

														<TableCell className="p-4 md:p-16" component="th" scope="row">
															{n.patient}
														</TableCell>

														<TableCell className="p-4 md:p-16" component="th" scope="row">
															{n.date}
														</TableCell>
													</TableRow>
												);
											})}
										</TableBody>
									</Table>
								</FuseAnimate>
							</div>
						)}
						{tabValue === 4 && (
							<div>
								<MedicationDialog open={openMedical} setMedicines={setMedicines} setOpen={setOpenMedical}></MedicationDialog>
								<div className="flex flex-row">
									<Typography className="sm:flex w-full mx-0 sm:mx-12" variant="h6">
										<span className="mx-4">Medication & Supplements</span>
									</Typography>
									<Typography className="w-full sm:mx-12 text-right" variant="h6">
										<IconButton color="secondary" onClick={() => setOpenMedical(true)} aria-label="add an alarm"><Icon>add_circle_outline</Icon></IconButton>
									</Typography>
								</div>
								<FuseAnimate animation="transition.slideUpIn" delay={300}>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>Dosage</TableCell>
												<TableCell className="hidden sm:table-cell">Compound</TableCell>
												<TableCell className="hidden sm:table-cell">Form</TableCell>
												<TableCell className="text-center hidden sm:table-cell">Frequency</TableCell>
												<TableCell className="hidden sm:table-cell">Dates</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{form.medicines && form.medicines.map(item => {
												return (
													<TableRow
														key={item.id}
														hover
														className="cursor-pointer"
													>
														<TableCell>{item.dosage}</TableCell>
														<TableCell className="hidden sm:table-cell">{item.compound}</TableCell>
														<TableCell className="hidden sm:table-cell">{item.form}</TableCell>
														<TableCell className="text-center hidden sm:table-cell">
															{item.frequency === '' ? '-' : item.frequency}
														</TableCell>
														<TableCell className="hidden sm:table-cell">{item.dates}</TableCell>
													</TableRow>
												);
											})}
										</TableBody>
									</Table>
								</FuseAnimate>
							</div>
						)}
						{tabValue === 5 && (
							<div>
								<List className="p-0">
									<FuseAnimateGroup
										enter={{
											animation: 'transition.slideUpBigIn'
										}}
									>
										{form.careteam && form.careteam.map(careteam => (
											<ListItem
												dense
												button
												className={clsx(
													classes.mailItem,
													'py-16 px-0 md:px-8'
												)}
											>
												<div className="flex flex-1 flex-col relative overflow-hidden">
													<div className="flex items-center justify-between px-16 pb-8">
														<div className="flex items-center">
															<Avatar alt={careteam.doctorName} src={careteam.urlAvatar} />
															<Typography variant="subtitle1" className="mx-8">
																{careteam.providerName}
															</Typography>
														</div>
														{/* <Typography variant="subtitle1">{careteam.providerSubtitle}</Typography> */}
													</div>
													<div className="flex flex-col px-16 py-0">
														<Typography className="truncate">{careteam.providerSpecialty}</Typography>
														<Typography color="textSecondary" className="truncate">
															{careteam.providerSubtitle}
														</Typography>
													</div>
												</div>
											</ListItem >
										))}
									</FuseAnimateGroup>
								</List>
							</div>
						)}

					</ div>
				)
			}
			innerScroll
		/>
	);
}

export default withReducer('TreatmentsApp', reducer)(Treatment);
