import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect, useForm } from '@fuse/hooks';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import InstructionsList from '../instructions/InstructionsList';
import reducer from '../store';
import { getProduct, newProduct, saveProduct } from '../store/productSlice';
import Comments from './Comments';
import AlertTransportsDialog from './AlertTransportsDialog';


const useStyles = makeStyles(theme => ({
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
	margin: {
		margin: theme.spacing(1),
	},
	textField: {
		width: '25ch',
	},
	productImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	productImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $productImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $productImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));
const AlwaysScrollToBottom = () => {
	const elementRef = useRef();
	useEffect(() => elementRef.current.scrollIntoView());
	return <div ref={elementRef} />;
};


function Product(props) {
	const dispatch = useDispatch();
	const product = useSelector(({ eCommerceApp }) => eCommerceApp.product);

	const theme = useTheme();
	var files = [
		{
			id: '1',
			name: 'Magnetic resonance imaging (MRI) Knee',
			type: 'PDF',
			owner: 'Me',
			size: '750 Kb',
			modified: 'July 8, 2020',
			opened: 'July 8, 2020',
			created: 'July 8, 2020',
			extention: '',
			location: 'My Files > Documents',
			offline: true
		},
		{
			id: '4',
			name: 'Blood test',
			type: 'document',
			owner: 'Emily Bennett',
			size: '1.2 Mb',
			modified: 'July 8, 2020',
			opened: 'July 8, 2020',
			created: 'July 8, 2020',
			extention: '',
			location: 'My Files > Documents',
			offline: true,
			preview: 'assets/images/etc/sample-file-preview.jpg'
		}
	];

	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const [comments, setComments] = useState(dummyData);
	const [open, setOpen] = useState(false);
	const [dialogContent, setDialogContent] = useState([]);
	const [dialogTitle, setDialogTitle] = useState("Title");
	const [comment, setComment] = useState("");
	const { form, handleChange, setForm } = useForm(null);
	const [specialtyDescription, setSpecialty] = React.useState("Specialty")
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updateProductState() {
			const { productId } = routeParams;

			if (productId === 'new') {
				dispatch(newProduct());
			} else {
				dispatch(getProduct(routeParams));
			}
		}

		updateProductState();
	}, [dispatch, routeParams]);



	function formatAMPM(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}
	useEffect(() => {
		if ((product && !form) || (product && form && product.id !== form.id)) {
			setForm(product);
		}
	}, [form, product, setForm]);

	useEffect(() => {
		if (form && form.specialty && specialtyDescription === "Specialty") {
			setSpecialty(form.specialtyDescription)
		}
		// if (form && form.meansTransport) {
		// 	console.log(form.meansTransport);
		// 	switch (form.meansTransport) {
		// 		case 'Uber':
		// 			console.log('Cheguei Uber');
		// 			setDialogTitle('Uber');
		// 			setDialogContent("This will generate a reminder/notification for you 2 hours before your appointment."
		// 				+ "This option doesn't book an Uber for you."
		// 				+ "Please use the link to go to Uber app or website");
		// 			setOpen(true);
		// 			break;
		// 		case 'Taxi':
		// 			console.log('Cheguei Taxi');
		// 			setDialogTitle('Taxi');
		// 			setDialogContent('');
		// 			setOpen(true);
		// 			break;
		// 		case 'Caregiver':
		// 			console.log('Cheguei v');
		// 			setDialogTitle('Caregiver');
		// 			setDialogContent('');
		// 			setOpen(true);
		// 			break;
		// 	}
		// }
	}, [form,specialtyDescription])

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	function handleSpecialtyChange(event) {
		handleChange(event)
		setSpecialty(event.target.options[event.target.selectedIndex].text)
	}

	function handleMeansTranportChange(event) {

		switch (event.target.value) {
			case 'Uber':
				setDialogTitle('Reminder for Uber');
				setDialogContent(["This will generate a reminder/notification for you 2 hours before your appointment."
					, "This option doesn't book an Uber for you, please use the link to go to Uber app or website"]);
				setOpen(true);
				break;
			case 'Taxi':
				setDialogTitle('Reminder for Taxi');
				setDialogContent(["This will generate a reminder/notification for you 2 hours before your appointment."
					, "This option doesn't book a taxi for you. Please call your local company if you want to book a taxi in advance"]);
				setOpen(true);
				break;
			case 'Caregiver':
				setDialogTitle('Reminder for Caregiver');
				setDialogContent(["This will send a text message, 2 hours before your appointment, to the caregiver you selected on your profile."
					, "If you need to update this information, go to profile page"]);
				setOpen(true);
				break;
			default:
		}

		handleChange(event);

	}

	function setFeaturedImage(id) {
		props.history.push(`/intake-form`);
	}

	function canBeSubmitted() {
		return form.clinic && form.clinic.length > 0 && !_.isEqual(product, form);
	}

	if ((!product || (product && routeParams.productId !== product.id)) && routeParams.productId !== 'new') {
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
								to="/appointments"
								color="inherit"
							>
								<Icon className="text-20">
									{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
								</Icon>
								<span className="mx-4">Appointments</span>
							</Typography>

							<div className="flex items-center max-w-full">
								<FuseAnimate animation="transition.expandIn" delay={300}>
									{form.images.length > 0 && form.featuredImageId ? (
										<img
											className="w-32 sm:w-48 rounded"
											src={form.featuredImageId}
											alt="featuredImageId"
										/>
									) : (
											<img
												className="w-32 sm:w-48 rounded"
												src="assets/images/ecommerce/product-image-placeholder.png"
												alt="product"
											/>
										)}
								</FuseAnimate>
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate">
											{form.doctorName ? form.doctorName : 'New Appointment'}
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
								onClick={() => dispatch(saveProduct(form))}
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
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64 normal-case" label="Appointment" />
					<Tab className="h-64 normal-case" label="Your Check List" />
					<Tab className="h-64 normal-case" label="Test Results" />
					<Tab className="h-64 normal-case" label="Preparation for Your Appointment" />
					<Tab className="h-64 normal-case" label="Topics for Discussion" />
				</Tabs>
			}
			content={
				form && (
					<div className="p-16 sm:p-24">
						{tabValue === 0 && (
							<div>
								<Grid container spacing={3}>
									<Grid item xs={6}>
										{
											routeParams.productId === 'new' && (
												<div>
													<FormControl fullWidth variant="outlined" className="mt-8 mb-16">
														<InputLabel htmlFor="outlined-age-native-simple">Medical Specialty</InputLabel>
														<Select
															native
															id="specialty"
															name="specialty"
															value={form.specialty}
															onChange={handleSpecialtyChange}
															label="Medical Specialty"
															autoFocus
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

													<TextField
														className="mt-8 mb-16"
														label="Doctor's Name"
														id="doctorName"
														name="doctorName"
														value={form.doctorName}
														onChange={handleChange}
														variant="outlined"
														fullWidth
													/>
												</div>
											)}
										<TextField
											className="mt-8 mb-16"
											label="Clinic"
											id="clinic"
											name="clinic"
											value={form.clinic}
											onChange={handleChange}
											variant="outlined"
											fullWidth
										/>
										<TextField
											className="mt-8 mb-16"
											id="description"
											name="description"
											onChange={handleChange}
											label="Notes/Comments"
											type="text"
											value={form.description}
											multiline
											rows={5}
											variant="outlined"
											fullWidth
										/>
										<Grid item xs={8}>
											{/* <FormControlLabel
												control={<Switch checked={form.firstAppointment} onChange={handleChange} id="firstAppointment"
													name="firstAppointment" />}
												label="First Appointment"
											/> */}
											<FormControlLabel
												control={<Switch checked={form.notifications} onChange={handleChange} id="notifications"
													name="notifications" />}
												label="Receive Notifications"
											/>
										</Grid>
										<FormControlLabel
											control={<Switch checked={form.caregiverAppointment} onChange={handleChange} id="caregiverAppointment"
												name="caregiverAppointment" />}
											label="Notify Caregiver"
										/>
									</Grid>
									<Grid item xs={2}>
										<TextField
											id="datetime-local"
											label="Upcoming Appointment"
											type="datetime-local"
											variant="outlined"
											defaultValue="2020-05-24T10:30"
											className="mt-8 mb-16"
											InputLabelProps={{
												shrink: true,
											}}
										/>

										<FormControlLabel
											control={<Switch checked={form.includeTravelTime} onChange={handleChange} id="includeTravelTime"
												name="includeTravelTime" />}
											label="Include travel time?"
										/>
										{
											form.includeTravelTime && (
												<div>
													<FormControl id="meansTransport" className="mt-8 mb-16" component="fieldset">
														<FormLabel component="legend">Means of transport</FormLabel>
														<RadioGroup aria-label="gender" id="meansTransport" name="meansTransport" value={form.meansTransport} onChange={handleMeansTranportChange}>
															<FormControlLabel value="Own" control={<Radio />} label="Own Transportation" />
															<FormControlLabel value="Uber" control={<Radio />} label="Uber" />
															<FormControlLabel value="Taxi" control={<Radio />} label="Taxi" />
															<FormControlLabel value="Caregiver" control={<Radio />} label="Caregiver - Transportation" />
														</RadioGroup>
													</FormControl>

													<AlertTransportsDialog open={open} title={dialogTitle} content={dialogContent} setOpen={setOpen}></AlertTransportsDialog>
												</div>
											)
										}
									</Grid>
								</Grid>
							</div>
						)}
						{tabValue === 1 && (
							<div>
								<InstructionsList instructions={form.instructions} />
							</div>
						)}
						{tabValue === 2 && (
							<div>
								<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
									<span className="mx-4">Add a Test Results</span>
									<Icon className="text-35">
										backup
									</Icon>
								</Typography>
								<FuseAnimate animation="transition.slideUpIn" delay={300}>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell className="max-w-64 w-64 p-0 text-center"> </TableCell>
												<TableCell>Name</TableCell>
												<TableCell className="hidden sm:table-cell">Type</TableCell>
												<TableCell className="hidden sm:table-cell">Owner</TableCell>
												<TableCell className="text-center hidden sm:table-cell">Size</TableCell>
												<TableCell className="hidden sm:table-cell">Modified</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{files && files.map(item => {
												return (
													<TableRow
														key={item.id}
														hover
														// onClick={event => dispatch(setSelectedItem(item.id))}
														// selected={item.id === selectedItemId}
														className="cursor-pointer"
													>
														<TableCell className="max-w-64 w-64 p-0 text-center">
															<Icon className={clsx(classes.typeIcon, item.type)} />
														</TableCell>
														<TableCell>{item.name}</TableCell>
														<TableCell className="hidden sm:table-cell">{item.type}</TableCell>
														<TableCell className="hidden sm:table-cell">{item.owner}</TableCell>
														<TableCell className="text-center hidden sm:table-cell">
															{item.size === '' ? '-' : item.size}
														</TableCell>
														<TableCell className="hidden sm:table-cell">{item.modified}</TableCell>
														<Hidden lgUp>
															<TableCell>
																<IconButton
																	onClick={ev => props.pageLayout.current.toggleRightSidebar()}
																	aria-label="open right sidebar"
																>
																	<Icon>info</Icon>
																</IconButton>
															</TableCell>
														</Hidden>
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
								<div className="flex justify-center sm:justify-start flex-wrap -mx-8">
									<label
										htmlFor="button-file"
										className={clsx(
											classes.productImageUpload,
											'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
										)}
									>
										<Icon fontSize="large" color="action">
											cloud_upload
										</Icon>
									</label>
									{form.images && form.images.map((media, i) => (
										<div
											style={{ backgroundColor: i % 2 === 0 ? "#f0020257" : "#DEFFBD" }}
											onClick={() => setFeaturedImage(media.id)}
											onKeyDown={() => setFeaturedImage(media.id)}
											role="button"
											tabIndex={0}
											className={clsx(
												classes.productImageItem,
												'flex items-center justify-center relative flex-col w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5',
												media.id === form.featuredImageId && 'featured'
											)}
											key={media.id}
										>
											<div style={{ fontWeight: '700' }} >	Medical History</div>
											<img className="max-w-none" style={{ height: '84%', width: '84%' }} src={media.url} alt="product" />
										</div>
									))}
								</div>
							</div>
						)}
						{tabValue === 4 && (
							<div>
								<div className="rounded-lg shadow-xl flex flex-col pt-16 px-16 ltr:pl-56 rtl:pr-56 pb-40 overflow-scroll" style={{ height: '50vh', background: '#24aae007', border: '1px solid #00000044' }}>
									<Comments dummyData={comments}></Comments>
									<AlwaysScrollToBottom />
								</div>
								<div style={{ marginTop: "1vh" }}>
									<FormControl className={clsx(classes.margin, classes.textField)} style={{ width: '99%' }} variant="outlined">
										<InputLabel htmlFor="outlined-adornment-password">Type your message ...</InputLabel>
										<OutlinedInput
											className="mt-8 mb-16"
											label="Extra Shipping Fee"
											id="extraShippingFee"
											name="extraShippingFee"
											onChange={(event) => setComment(event.target.value)}
											value={comment}
											variant="outlined"
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														edge="end"
														onClick={() => {
															var data = new Date();
															var newComment =
															{
																message: comment,
																date: `${data.getFullYear()}-${data.getMonth()}-${data.getDate()} ${formatAMPM(data)}`,
																user: 1
															}
															setComments([...comments, newComment])
														}}
													>
														<Icon>
															send
															</Icon>
													</IconButton>
												</InputAdornment>
											}
											fullWidth
										/>
									</FormControl>
								</div>
							</div>


						)}
					</div>
				)
			}
			innerScroll
		/>
	);
}

// export default withRouter(withReducer('eCommerceApp', reducer))(Product);
export default withReducer('eCommerceApp', reducer)(Product);

const dummyData = [
	{
		message: "I want to check, the pain that i have been feeling, and ai justs don’t know what’s happening ....",
		date: "2020-01-19 08:22 pm",
		user: 1
	},
	{
		message: "I checked the new exams and they're all OK",
		date: "2020-01-20 04:30 pm",

		user: 2
	},
	{
		message: "This should be in left again",
		date: "2020-01-20 01:20 pm",

		user: 2
	},
	{
		message: "I realized that the pain are strong when i climb the stairs....",
		date: "2020-01-21 02:20 pm",
		user: 1
	},
	{
		message: "I want to check, the pain that i have been feeling, and ai justs don’t know what’s happening ....",
		date: "2020-01-23 09:20 am",

		user: 1
	},
	{
		message: "I checked the new exams and they're all OK",
		date: "2020-01-23 09:20 am",

		user: 2
	},
	{
		message: "This should be in left again",
		date: "2020-01-23 09:20 am",

		user: 2
	},
	{
		message: "I realized that the pain are strong when i climb the stairs....",
		date: "2020-01-23 09:20 am",

		user: 1
	},
	{
		message: "I want to check, the pain that i have been feeling, and ai justs don’t know what’s happening ....",
		date: "2020-01-23 09:20 am",

		user: 1
	},
	{
		message: "I checked the new exams and they're all OK",
		date: "2020-01-23 09:20 am",

		user: 2
	},
	{
		message: "This should be in left again",
		date: "2020-01-23 09:20 am",

		user: 2
	},
	{
		message: "I realized that the pain are strong when i climb the stairs....",
		date: "2020-01-23 09:20 am",

		user: 1
	}
];