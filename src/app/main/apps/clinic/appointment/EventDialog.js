import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeEvent, updateEvent, addEvent, closeNewEventDialog, closeEditEventDialog } from './store/eventsSlice';

const defaultFormState = {
	id: FuseUtils.generateGUID(),
	title: '',
	allDay: true,
	start: moment(new Date(), 'MM/DD/YYYY'),
	end: moment(new Date(), 'MM/DD/YYYY'),
	desc: ''
};

function EventDialog(props) {
	const dispatch = useDispatch();
	const eventDialog = useSelector(({ calendarApp }) => calendarApp.events.eventDialog);
	 // eslint-disable-next-line 
	const { form, handleChange, setForm, setInForm } = useForm(defaultFormState);
	 // eslint-disable-next-line 
	const [specialtyDescription, setSpecialty] = React.useState("Specialty");

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (eventDialog.type === 'edit' && eventDialog.data) {
			setForm({ ...eventDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (eventDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...eventDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [eventDialog.data, eventDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (eventDialog.props.open) {
			initDialog();
		}
	}, [eventDialog.props.open, initDialog]);

	function closeComposeDialog() {
		return eventDialog.type === 'edit' ? dispatch(closeEditEventDialog()) : dispatch(closeNewEventDialog());
	}

	function canBeSubmitted() {
		return form.title.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (eventDialog.type === 'new') {
			dispatch(addEvent(form));
		} else {
			dispatch(updateEvent(form));
		}
		closeComposeDialog();
	}

	function handleRemove() {
		dispatch(removeEvent(form.id));
		closeComposeDialog();
	}

	function handleSpecialtyChange(event) {

		handleChange(event)
		console.log(event.target.options[event.target.selectedIndex].text)
		setSpecialty(event.target.options[event.target.selectedIndex].text)
	}

	return (
		<Dialog
			{...eventDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="md"
			component="form"
			classes={{
				paper: 'rounded-8'
			}}
		>
			<AppBar position="static">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{eventDialog.type === 'new' ? 'New Appointment' : 'Edit Appointment'}
					</Typography>
				</Toolbar>
			</AppBar>

			<form noValidate onSubmit={handleSubmit}>
				<DialogContent classes={{ root: 'p-8 pb-0 sm:p-24 sm:pb-0' }}>
					<div>
						<Typography className="text-8 sm:text-20 truncate">
							{`New Appointment - ${form.clinic}`}
						</Typography>
						<Grid container>
							<Grid container spacing={3}>
								<Grid item xs={6} >
									<TextField
										id="title"
										label="Title"
										className="mt-16 mb-8"
										InputLabelProps={{
											shrink: true
										}}
										name="title"
										value={form.title}
										onChange={handleChange}
										variant="outlined"
										autoFocus
										required
										fullWidth
									/>
									<TextField
										id="datetime-local"
										label="Next appointment"
										type="datetime-local"
										variant="outlined"
										defaultValue="2020-05-24T10:30"
										className="mt-8 mb-8"
										fullWidth
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</Grid>
							</Grid>
							<Grid container spacing={3}>
								<Grid item xs={6} >
									<TextField
										className="mt-4 mb-8"
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
									<TextField
										className="mt-4 mb-8"
										error={form.email === ''}
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
										<Grid item xs={6} >
											<TextField
												className="mt-4 mb-8"
												error={form.ssn === ''}
												required
												label="SSN"
												id="ssn"
												name="ssn"
												value={form.ssn}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
										</Grid>
										<Grid item xs={6} >
											<TextField
												className="mt-4 mb-8"
												error={form.telephone === ''}
												required
												label="Telephone"
												id="telephone"
												name="telephone"
												value={form.telephone}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
										</Grid>
									</Grid>
									<FormControl fullWidth variant="outlined" className="mt-8 mb-8">
										<InputLabel htmlFor="outlined-age-native-simple">Professional</InputLabel>
										<Select
											native
											id="specialty"
											name="specialty"
											value={form.professional}
											onChange={handleSpecialtyChange}
											label="professional"
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

									<FormControlLabel
										control={<Switch checked={form.firstAppointment} onChange={handleChange} id="firstAppointment"
											name="firstAppointment" />}
										label="First Appointment"
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										className="mt-4 mb-8"
										error={form.addressLine1 === ''}
										required
										label="Address Line 1"
										id="addressLine1"
										name="addressLine1"
										value={form.addressLine1}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>
									<TextField
										className="mt-4 mb-8"
										error={form.addressLine2 === ''}
										required
										label="Address Line 2"
										id="addressLine2"
										name="addressLine2"
										value={form.addressLine2}
										onChange={handleChange}
										variant="outlined"
										fullWidth
									/>
									<Grid container spacing={3}>
										<Grid item xs={6} >
											<TextField
												className="mt-4 mb-8"
												error={form.city === ''}
												required
												label="City"
												id="city"
												name="city"
												value={form.city}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
										</Grid>
										<Grid item xs={6} >
											<TextField
												className="mt-4 mb-8"
												error={form.state === ''}
												required
												label="State / Province / Region"
												id="state"
												name="state"
												value={form.state}
												onChange={handleChange}
												variant="outlined"
												fullWidth
											/>
										</Grid>
									</Grid>

									<TextField
										className="mt-8 mb-8"
										id="observation"
										name="observation"
										onChange={handleChange}
										label="Observation"
										type="text"
										value={form.observation}
										multiline
										rows={5}
										variant="outlined"
										fullWidth
									/>
								</Grid>
							</Grid>
						</Grid>
					</div>
				</DialogContent>

				{eventDialog.type === 'new' ? (
					<DialogActions className="justify-between px-8 sm:px-16">
						<Button variant="contained" color="secondary" type="submit" disabled={!canBeSubmitted()}>
							Add
						</Button>
					</DialogActions>
				) : (
						<DialogActions className="justify-between px-8 sm:px-16">
							<Button variant="contained" color="secondary" type="submit" disabled={!canBeSubmitted()}>
								Save
						</Button>
							<IconButton onClick={handleRemove}>
								<Icon>delete</Icon>
							</IconButton>
						</DialogActions>
					)}
			</form>
		</Dialog>
	);
}

export default EventDialog;
