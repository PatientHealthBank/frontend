import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import withReducer from 'app/store/withReducer';
import React, { useRef, useEffect } from 'react';
import reducer from './store';
import { grey } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector } from 'react-redux';

import Icon from '@material-ui/core/Icon';
import Widget5 from './widgets/Widget5';

function DoctorsApp(props) {
	const user = useSelector(({ auth }) => auth.user);
	const [widgets, setWidgets] = React.useState({
		appointments: true,
		careTeam: true,
		emergencyContact: true,
		allergies: true,
		strength: true,
		vaccines: true,
		medicines: true,
		testResults: true
	});
	const [open, setOpen] = React.useState(false);
	const handleWidgetsChange = event => {
		setWidgets({ ...widgets, [event.target.name]: event.target.checked });
	};

	useEffect(() => {
		if (user) {
			// First access
			if (!user.updateDate) {
				props.history.push(`/reset-password/${user.uuid}`);

			}
		}
	}, [user]);

	const handleOpenSettings = () => {
		setOpen(true);
	};
	const handleCloseSettings = () => {
		setOpen(false);
	};
	return (
		<div style={{ padding: '30px' }}>
			<div className="flex justify-between flex-1 px-24 pt-24">
				<Typography variant="h4">Hello, {user.currentUser.displayName}</Typography>
				<Typography variant="h4">
					<IconButton onClick={handleOpenSettings}>
						<Icon style={{ color: grey[800], fontSize: 30 }}> settings</Icon>
					</IconButton>
				</Typography>
			</div>
			<div>
				<Dialog
					open={open}
					onClose={handleCloseSettings}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{'Widgets Settings'}</DialogTitle>
					<DialogContent style={{ display: 'grid' }}>
						<FormControlLabel
							control={
								<Switch
									checked={widgets.appointments}
									onChange={handleWidgetsChange}
									name="appointments"
								/>
							}
							label="Appointments"
						/>
						<FormControlLabel
							control={
								<Switch checked={widgets.careTeam} onChange={handleWidgetsChange} name="careTeam" />
							}
							label="Care Team"
						/>
						<FormControlLabel
							control={
								<Switch
									checked={widgets.emergencyContact}
									onChange={handleWidgetsChange}
									name="emergencyContact"
								/>
							}
							label="Emergency Contact"
						/>
						<FormControlLabel
							control={
								<Switch checked={widgets.medicines} onChange={handleWidgetsChange} name="medicines" />
							}
							label="Medicines"
						/>
						<FormControlLabel
							control={
								<Switch checked={widgets.vaccines} onChange={handleWidgetsChange} name="vaccines" />
							}
							label="Vaccines"
						/>
						<FormControlLabel
							control={
								<Switch checked={widgets.strength} onChange={handleWidgetsChange} name="strength" />
							}
							label="Strength"
						/>
						<FormControlLabel
							control={
								<Switch checked={widgets.allergies} onChange={handleWidgetsChange} name="allergies" />
							}
							label="Allergies"
						/>
						<FormControlLabel
							control={
								<Switch
									checked={widgets.testResults}
									onChange={handleWidgetsChange}
									name="testResults"
								/>
							}
							label="Test Results"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseSettings} color="primary">
							close
						</Button>
					</DialogActions>
				</Dialog>
				<Widget5 widgets={widgets} />
			</div>
		</div>
	);
}

export default withReducer('DoctorsApp', reducer)(DoctorsApp);
