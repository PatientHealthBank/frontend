import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { submitRegister } from 'app/auth/store/registerSlice';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl  from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { useTranslation } from "react-i18next";
import {
    KeyboardDatePicker,
  } from '@material-ui/pickers';

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

export default function AlertDialog({ open, setOpen, type, newCaregiverForm, newCaregiverLink, caregivers, id }) {
	// eslint-disable-next-line 
    const [isFormValid, setIsFormValid] = useState(false);
    const classes = useStyles();
    const { t } = useTranslation();
    const [caregiverId, setCaregiverId] = useState(false);
    const [startDate, setStartDate] = useState(false);
    const [endDate, setEndDate] = useState(false);

	const [state, setState] = React.useState({
		AcceptTerms: false,
	});
	const formRef = useRef(null);
	const handleChange = (event) => {
        setCaregiverId(event.target.value);
        
    };

    const handleChecked = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    }

	function disableButton() {
		setIsFormValid(false);
	}

	const enableButton = (AcceptTerms) => {
		console.log(AcceptTerms)
		if(AcceptTerms){
			setIsFormValid(true);
		}
		else{
			setIsFormValid(false);
		}
	}

	function handleSubmit(model) {
        model.AcceptTerms = state.AcceptTerms;
        newCaregiverForm(model.fullName, model.email, model.password, new Date(model.startDate), new Date(model.endDate));
        handleClose();
    }
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        newCaregiverLink(caregiverId, new Date(startDate), new Date(endDate));
        handleClose();
    }

    const setDisabled = ()=>{
        return !caregiverId || !startDate || !endDate 
    }

    const handleStartDateChange = (date) =>{
        setStartDate(date);
    }

    const handleEndDateChange = (date) =>{
        setEndDate(date);
    }

    if(type != "NEW"){
    return (
        <div item xs={6}>
        <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogTitle id="alert-dialog-title">Link Caregiver</DialogTitle>
                <DialogContent>
                <div className={classes.root}>
                     <div>
                        
                      <FormControl fullWidth className={classes.margin} variant="outlined">
                        <InputLabel id="caregivers">Select Caregiver</InputLabel>
                        <Select
                            native
                            labelId="caregivers"
                            value={caregiverId}
                            onChange={handleChange}
                            inputProps={{
                              name: 'caregivers',
                              id: 'caregivers',
                            }}
                          >
                            {caregivers.map(row => (
                            <option key={row.id} value={row.id}>{row.name}</option>
                            ))}
                            
                          </Select>
                        </FormControl >
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <KeyboardDatePicker
                                  id="date-picker-dialog"
                                  label="Date to start Link"
                                  format="MM-DD-yyyy"
                                  inputVariant="outlined"
                                  onChange={handleStartDateChange}
                                  name={"startDate"}
                                  value={startDate || "01/01/2000"}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                             />
                        </FormControl >
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <KeyboardDatePicker
                                  id="date-picker-dialog"
                                  label="Date to endLink"
                                  format="MM-DD-yyyy"
                                  inputVariant="outlined"
                                  onChange={handleEndDateChange}
                                  name={"endDate"}
                                  value={endDate || "01/01/2000"}
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
    }else{
 
    return (
        <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogTitle id="alert-dialog-title">New Caregiver</DialogTitle>
                <DialogContent>
        <div className="w-full">
        <Formsy
            onValidSubmit={handleSubmit}
            onValid={()=> enableButton(state.AcceptTerms)}
            onInvalid={disableButton}
            ref={formRef}
            className="flex flex-col justify-center w-full"
        >
            <TextFieldFormsy
                className="mb-16"
                type="text"
                name="fullName"
                label="Full Name"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Icon className="text-20" color="action">
                                person
                            </Icon>
                        </InputAdornment>
                    )
                }}
                variant="outlined"
                required
            />

            <TextFieldFormsy
                className="mb-16"
                type="text"
                name="email"
                label="Email"
                validations="isEmail"
                validationErrors={{
                    isEmail: 'Please enter a valid email'
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Icon className="text-20" color="action">
                                email
                            </Icon>
                        </InputAdornment>
                    )
                }}
                variant="outlined"
                required
            />

            <TextFieldFormsy
                className="mb-16"
                type="password"
                name="password"
                label="Password"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Icon className="text-20" color="action">
                                vpn_key
                            </Icon>
                        </InputAdornment>
                    )
                }}
                variant="outlined"
                required
            />

            <TextFieldFormsy
                className="mb-16"
                type="password"
                name="password-confirm"
                label="Confirm Password"
                validations="equalsField:password"
                validationErrors={{
                    equalsField: 'Passwords do not match'
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Icon className="text-20" color="action">
                                vpn_key
                            </Icon>
                        </InputAdornment>
                    )
                }}
                variant="outlined"
                required
            />

            <Grid container className="mb-16">
                <Grid item xs>
                    <TextFieldFormsy
                        type="date"
                        format="MM-DD-yyyy"
                        name="startDate"
                        label="Date to start link"
                        className="mr-8"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">

                                </InputAdornment>
                            )
                        }}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />
                </Grid>
                <Grid item xs>
                <TextFieldFormsy
                        type="date"
                        format="MM-DD-yyyy"
                        name="endDate"
                        label="Date to end link"
                        className="mr-8"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">

                                </InputAdornment>
                            )
                        }}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />
                </Grid>
            </Grid>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.AcceptTerms}
                        onChange={(event)=> {handleChecked(event); enableButton(event.target.checked) }}
                        name="AcceptTerms"
                        color="primary"
                    />
                }
                label="I read and accept terms and conditions"
            />
            <Button
                type="submit"
                variant="contained"
                color="seccondary"
                disabled={!isFormValid}
                className="w-full mx-auto mt-16 normal-case"
                aria-label="REGISTER"
                value="legacy"
            >
                Register
            </Button>
        </Formsy>
        
    </div>
    </DialogContent>
                
            </Dialog>
    );

    }
}
