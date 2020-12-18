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


function MemberDialog({open, setOpen, title, member,setMember, handleAdd, handleEdit}) {
  const classes = useStyles();
  const { t } = useTranslation();
  const handleChange = (event) => {
    console.log(event.target.name)
    setMember({ ...member, [event.target.name]: event.target.value });
  };



  const setDisabled = ()=>{
    return !member.name || !member.address || !member.phone || !member.relationship || !member.dateofBirth
  }
  const handleSave = () => {
    if(title === "Edit"){
      handleEdit(member.id, member.name, member.address, member.phone, member.relationship, new Date(member.dateofBirth))
    }
    else{
      handleAdd(member.name, member.address, member.phone, member.relationship, new Date(member.dateofBirth))
    }
    setMember({});
    handleClose()
  }
  const handleClose = () => {

    if(title === "Edit"){
      setMember({});
    }
    setOpen(false);  
  };
  const handleDateChange = (date) => {
    setMember({ ...member, "dateofBirth": date });
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
        <DialogTitle id="alert-dialog-title">{title} Member</DialogTitle>

        <DialogContent>

                   <div className={classes.root}>
                     <div>

                     <FormControl fullWidth className={classes.margin} variant="outlined">
                            <TextField
                               id="outlined-adornment-amount"
                              variant="outlined"
                              name={"name"}
                              value={member.name}
                              onChange={handleChange}
                              label={"Name"}
                            />
                        </FormControl >
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <TextField
                              variant="outlined"
                              name={"address"}
                              value={member.address}
                              onChange={handleChange}
                              label="Address"
                            />
                        </FormControl >
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <TextField
                              variant="outlined"
                              name={"phone"}
                              onChange={handleChange}
                              value={member.phone}
                              label="Phone"
                            />
                        </FormControl >
                        
                      <FormControl fullWidth className={classes.margin} variant="outlined">
                        <InputLabel id="relationship">Relationship</InputLabel>
                        <Select
                            native
                            value={member.relationship}
                            onChange={handleChange}
                            labelId="relationship"
                            inputProps={{
                              name: 'relationship',
                              id: 'age-native-simple',
                            }}
                          >
                            <option value={"Kid"}>Child</option>
                            <option value={"Spouse"}>Spouse</option>
                            <option value={"Other"}>Other</option>
                          </Select>
                        </FormControl >
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <KeyboardDatePicker
                                  id="date-picker-dialog"
                                  label="Date of Birth"
                                  format="MM-DD-yyyy"
                                  inputVariant="outlined"
                                  onChange={handleDateChange}
                                  name={"relationship"}
                                  value={member.dateofBirth || "01/01/2000"}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
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