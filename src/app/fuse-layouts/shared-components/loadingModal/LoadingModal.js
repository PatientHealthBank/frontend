import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store';
import { toggleLoading } from './store/loadingSlice';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
	backdrop: {
	  zIndex: theme.zIndex.drawer + 1,
	  color: '#fff',
	},
  }));


function LoadingModal(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const state = useSelector(({ loadingModal }) => loadingModal.state);

	console.log("state", state)
	const handleClose = () => {
		dispatch(toggleLoading());
	  };

	return (
		<Backdrop className={classes.backdrop} open={state} onClick={handleClose}>
		  <CircularProgress color="inherit" />
		</Backdrop>
	);
}

export default withReducer('loadingModal', reducer)(React.memo(LoadingModal));
