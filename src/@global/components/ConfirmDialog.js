import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import { useDispatch } from 'react-redux';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog({title, setOpen, open, description,acceptText, declineText, callBack, thenAction}) {
  const dispatch = useDispatch();
  const handleAction = async () => {
    dispatch(openLoading())
      await callBack();
      setOpen(false);
      dispatch(closeLoading())
      if(thenAction)
        thenAction()
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
      <AppBar position="static">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
              <DialogTitle id="alert-dialog-slide-title">{title || 'Confirm'}</DialogTitle>
					</Typography>
				</Toolbar>
			</AppBar>
        
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
                {description || "Are you sure?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAction} color="primary">
            {acceptText || 'Yes'}
          </Button>
          <Button onClick={handleClose} color="primary">
            {declineText || 'No'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}