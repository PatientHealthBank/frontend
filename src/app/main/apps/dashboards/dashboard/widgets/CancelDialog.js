import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withRouter } from 'react-router-dom';

function CancelDialog({open, setOpen, confirm, setCheckin, specialty, date, title, setFinished}) {

  const handleClose = () => {
    setOpen(false);  
    setFinished(true)
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          {confirm ?
          <>
            <DialogTitle id="alert-dialog-title">Confirm Appointment</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <br/>{specialty}<br/> {date}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={()=>{setCheckin(true);handleClose()}} color="primary" autoFocus>
                Ok
            </Button>
            </DialogActions>
            </>
            :
            <>
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
             <DialogContent>
                <DialogContentText>
                    If you want to reschedule or cancel in 
                            less than 24 hours before your appointment, the clinic may charge you for a no-show. 
                            If you have any questions, please contact the clinic directly
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
                Ok
            </Button>
            </DialogActions>
            </>
            }
      </Dialog>
    </div>
  );
}
export default withRouter(CancelDialog)