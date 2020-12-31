import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl  from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from "react-i18next";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink":{
      background:"#fff"
    }
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

function AppontimentDialog({open, setOpen, member}) {

  console.log(member);
  
  const classes = useStyles();
  const { t } = useTranslation();

  const handleClose = () => {

    setOpen(false);  
  };

  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        maxWidth={"sm"}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> {t('Invoice')}</DialogTitle>

        <DialogContent>

                   <div className={classes.root}>
                     <div>

                    
                        </div>
                    </div>

        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">
            {t('Close')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AppontimentDialog