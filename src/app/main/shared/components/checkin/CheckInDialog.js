import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import { blue } from '@material-ui/core/colors';

function CheckInDialog({ open, setOpen, confirm, setCheckInDone, specialty, date, title }) {
	const handleClose = () => {
		setOpen(false);
		
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Confirm your insurance plan</DialogTitle>
				<DialogContent>
					<Grid direction="row">
						<Grid item>
							<TextField id="outlined-basic" label="Insurance Plan Number" variant="outlined" />
						</Grid>
						<Grid item className="mt-16" style={{ display: 'flex', alignItems: 'center' }}>
							<Icon style={{ color: blue[500] }} fontSize="large">
								camera_alt
							</Icon>
							<Link>Upload picture of your insurance plan card</Link>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setCheckInDone(true);
							handleClose();
						}}
						color="primary"
						autoFocus
					>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
export default withRouter(CheckInDialog);
