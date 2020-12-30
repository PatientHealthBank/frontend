import { useDeepCompareEffect, useForm } from '@fuse/hooks';
import _ from '@lodash';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useRef, useState } from 'react';
import AlertTransportsDialog from '../AlertTransportsDialog';

function AppointmentTab({appointment,handleChange}) {
        const [open, setOpen] = useState(false);
        const [dialogContent, setDialogContent] = useState([]);
        const [dialogTitle, setDialogTitle] = useState("Title");

        function handleMeansTranportChange(event) {
    
            switch (event.target.value) {
                case 'Uber':
                    setDialogTitle('Reminder for Uber');
                    setDialogContent(["This will generate a reminder/notification for you 2 hours before your appointment."
                        , "This option doesn't book an Uber for you, please use the link to go to Uber app or website"]);
                    setOpen(true);
                    break;
                case 'Taxi':
                    setDialogTitle('Reminder for Taxi');
                    setDialogContent(["This will generate a reminder/notification for you 2 hours before your appointment."
                        , "This option doesn't book a taxi for you. Please call your local company if you want to book a taxi in advance"]);
                    setOpen(true);
                    break;
                case 'Caregiver':
                    setDialogTitle('Reminder for Caregiver');
                    setDialogContent(["This will send a text message, 2 hours before your appointment, to the caregiver you selected on your profile."
                        , "If you need to update this information, go to profile page"]);
                    setOpen(true);
                    break;
                default:
            }
    
            handleChange(event);
    
        }
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                        className="mt-8 mb-16"
                        label="Clinic"
                        id="clinic.companyName"
                        name="clinic.companyName"
                        disabled = {appointment.clinic === null? false:true}
                        value={appointment.clinic === null? appointment.clinicName : appointment.clinic?.companyName}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        className="mt-8 mb-16"
                        id="comments"
                        name="comments"
                        onChange={handleChange}
                        label="Notes/Comments"
                        type="text"
                        value={appointment.comments}
                        multiline
                        rows={5}
                        variant="outlined"
                        fullWidth
                    />
                    <Grid item xs={8}>
                        {/* <FormControlLabel
                        control={<Switch checked={form.appointment.firstAppointment} onChange={handleChange} id="firstAppointment"
                            name="firstAppointment" />}
                        label="First Appointment"
                    /> */}
                        <FormControlLabel
                            control={<Switch checked={appointment.notifications} onChange={handleChange} id="notifications"
                                name="notifications" />}
                            label="Receive Notifications"
                        />
                    </Grid>
                    <FormControlLabel
                        control={<Switch checked={appointment.caregiverAppointment} onChange={handleChange} id="caregiverAppointment"
                            name="caregiverAppointment" />}
                        label="Notify Caregiver"
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        id="scheduleDate"
                        name="scheduleDate"
                        label="Upcoming Appointment"
                        type="datetime-local"
                        variant="outlined"
                        value={appointment.scheduleDate}
                        onChange={handleChange}
                        className="mt-8 mb-16"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <FormControlLabel
                        control={<Switch checked={appointment.includeTravelTime} onChange={handleChange} id="includeTravelTime"
                            name="includeTravelTime" />}
                        label="Include travel time?"
                    />
                    {
                        appointment.includeTravelTime && (
                            <div>
                                <FormControl id="meansTransport" className="mt-8 mb-16" component="fieldset">
                                    <FormLabel component="legend">Means of transport</FormLabel>
                                    <RadioGroup aria-label="gender" id="meansTransport" name="meansTransport" value={appointment.meansTransport} onChange={handleMeansTranportChange}>
                                        <FormControlLabel value="Own" control={<Radio />} label="Own Transportation" />
                                        <FormControlLabel value="Uber" control={<Radio />} label="Uber" />
                                        <FormControlLabel value="Taxi" control={<Radio />} label="Taxi" />
                                        <FormControlLabel value="Caregiver" control={<Radio />} label="Caregiver - Transportation" />
                                    </RadioGroup>
                                </FormControl>

                                <AlertTransportsDialog open={open} title={dialogTitle} content={dialogContent} setOpen={setOpen}></AlertTransportsDialog>
                            </div>
                        )
                    }
                </Grid>
            </Grid>
        </div>
    );
}

export default AppointmentTab;