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

function MemberDialog({open, setOpen, member, setMember, title, handleAdd, handleEdit, appointmentId, currentFile}) {
  
  const classes = useStyles();
  const { t } = useTranslation();
  var labelFile = '';

  if(title === 'Edit'){
    labelFile = currentFile ? 'Replace File' : 'New File';
  }

  const handleChange = (event) => {
    setMember({ ...member, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
      setMember({ ...member, [event.target.name]: event.target.files[0] });
  }

  const setDisabled = ()=>{
    return !member.companyName || !member.serviceDate || !member.serviceValue || !member.registerServiceProvider
  }
  const handleSave = event => {

    if(title === 'Edit'){

      handleEdit(
          member.id, 
          member.companyName, 
          new Date(member.serviceDate), 
          parseFloat(member.serviceValue), 
          member.registerServiceProvider, 
          appointmentId, 
          member.fileUrl, 
          currentFile
        )
    }
    else{
      handleAdd(
          member.companyName, 
          new Date(member.serviceDate), 
          parseFloat(member.serviceValue), 
          member.registerServiceProvider, 
          appointmentId, 
          member.fileUrl
        )
    }
    setMember({});
    handleClose()
  }
  const handleClose = () => {

    if(member != ''){
      setMember({});
    }
    setOpen(false);  
  };
  const handleDateChange = (date) => {
    setMember({ ...member, "serviceDate": date });
  }

  const colorLabel = {color: '#c2c2c2'};

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
        <DialogTitle id="alert-dialog-title">{title} {t('Invoice')}</DialogTitle>

        <DialogContent>

                   <div className={classes.root}>
                     <div>

                     <FormControl fullWidth className={classes.margin} variant="outlined">
                            <TextField
                               id="outlined-adornment-amount"
                              variant="outlined"
                              name={"companyName"}
                              value={member.companyName}
                              onChange={handleChange}
                              label={"Company Name"}
                            />
                        </FormControl >
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <KeyboardDatePicker
                                  id="date-picker-dialog"
                                  label="Service Date"
                                  format="MM-DD-yyyy"
                                  inputVariant="outlined"
                                  onChange={handleDateChange}
                                  name={"serviceDate"}
                                  value={member.serviceDate || "01/01/2000"}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                             />
                        </FormControl >
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <TextField
                              type="numeric"
                              variant="outlined"
                              name={"serviceValue"}
                              onChange={handleChange}
                              value={member.serviceValue}
                              label="Service Value"
                            />
                        </FormControl >
                        
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <TextField
                              variant="outlined"
                              name={"registerServiceProvider"}
                              onChange={handleChange}
                              value={member.registerServiceProvider}
                              label="Service Provider"
                            />
                        </FormControl >
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                          <div class="ml-8" style={colorLabel}> 
                            {labelFile} 
                          </div>
                       
                            <TextField
                              type='file'
                              variant="outlined"
                              name={"fileUrl"}
                              onChange={handleFileChange}
                            />
                        </FormControl >
                        </div>
                    </div>

        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">
            {t('Close')}
          </Button>
          <Button onClick={handleSave} disabled={setDisabled()} color="primary">
             {t('Save')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default MemberDialog