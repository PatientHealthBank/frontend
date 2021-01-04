import { useForm } from '@fuse/hooks';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTest, closeNewTestDialog } from '../../store/AppointmentTestSlice';

const defaultFormState = {
	id: 0,
	name: '',
	appointmentId: 0,
	fileTest: null
};

function TestDialog(props) {
	const dispatch = useDispatch();
	const testDialog = useSelector(({ AppointmentsApp }) => AppointmentsApp.appointmentTest.testDialog);
	const { form, handleChange, setForm, } = useForm(defaultFormState);

	const initDialog = useCallback(() => {
		setForm({
			...defaultFormState,
			...testDialog.data,
			appointmentId:props.appointmentId 
		});
	}, [testDialog.data, testDialog.type, setForm]);

	useEffect(() => {
		if (testDialog.props.open) {
			initDialog();
		}
	}, [testDialog.props.open, initDialog]);

	function closeComposeDialog() {
		return dispatch(closeNewTestDialog());
	}

	function canBeSubmitted() {
		return form.name.length > 0;
	}

	function handleSubmit(test) {
		test.preventDefault();
		dispatch(addTest(form));
		closeComposeDialog();
	}

	return (
		<Dialog
			{...testDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
			component="form"
			classes={{
				paper: 'rounded-8'
			}}
		>
			<AppBar position="static">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						New Test Result
					</Typography>
				</Toolbar>
			</AppBar>

			<form noValidate onSubmit={handleSubmit}>
				<DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
					<TextField
						id="name"
						label="Name"
						className="mt-8 mb-16"
						InputLabelProps={{
							shrink: true
						}}
						name="name"
						value={form.name}
						onChange={handleChange}
						variant="outlined"
						autoFocus
						required
						fullWidth
					/>
					<TextField
						id="fileTest"
						label="File"
						className="mt-8 mb-16"
						type="file"
						InputLabelProps={{
							shrink: true
						}}
						name="fileTest"
						value={form.file}
						onChange={handleChange}
						variant="outlined"
						autoFocus
						required
						fullWidth
					/>
				</DialogContent>

				<DialogActions className="justify-between px-8 sm:px-16">
					<Button variant="contained" color="secondary" type="submit" disabled={!canBeSubmitted()}>
						Add
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default TestDialog;
