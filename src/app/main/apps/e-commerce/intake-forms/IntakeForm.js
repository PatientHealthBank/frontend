import Typography from '@material-ui/core/Typography';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FusePageCarded from '@fuse/core/FusePageCarded';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    layoutRoot: {}
});

const intakeForm = {
    id: 1,
    firstName: 'Jhon',
    lastName: 'Doe',
    phoneNumber: '9953854632',
    areaCode: '36',
    asthma: false,
    cardiacDisease: false,
    hypertension: false,
    psychiatricDisorder: false,
    epilepsy: false,
    cancer: false,
    diabetes: false,
    historyTobacco: 1,
    medicationAlergies: 'no',
    oftenAlcohol: 'never'
};

function IntakeForm(props) {
    const dispatch = useDispatch();

    const theme = useTheme();
    const classes = useStyles(props);
    const { form, handleChange, setForm } = useForm(null);
    const routeParams = useParams();

    useDeepCompareEffect(() => {
        function updateProfileState() {
            const { clinicId } = routeParams;
            if (clinicId === 'new') {
                // dispatch(newProfile());
            } else {
                // dispatch(getProfile(routeParams));
            }
        }

        updateProfileState();
    }, [dispatch, routeParams]);


    useEffect(() => {
        if ((intakeForm && !form) || (intakeForm && form && intakeForm.id !== form.id)) {
            setForm(intakeForm);
        }
    }, [form, setForm]);

    function goToAppointmens() {
        props.history.push(`/appointments`);
    }

    return (
        <FusePageCarded
            classes={{
                root: classes.layoutRoot
            }}
            header={
                form && (
                    <div className="flex flex-1 w-full items-center justify-between">
                        <div className="flex flex-col items-start max-w-full">
                            <Typography
                                className="normal-case flex items-center sm:mb-12"
                                component={Link}
                                role="button"
                                to="/appointments"
                                color="inherit"
                            >
                                <Icon className="text-20">
                                    {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                                </Icon>
                                <span className="mx-4">Appointments</span>
                            </Typography>

                            <div className="flex items-center max-w-full">
                                <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                                    <Typography className="text-16 sm:text-20 truncate">
                                        {'Intake Forms'}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <Button
                            className="whitespace-no-wrap normal-case"
                            variant="contained"
                            color="secondary"
                            onClick={goToAppointmens}
                        >
                            Save
							</Button>
                    </div>
                )
            }
            content={
                form && (<div className="p-16 sm:p-24">
                    <div>

                        <div className="mt-8 mb-32" style={{ textAlign: 'center' }}>
                            <Typography variant="h4" className="text-blue-600">
                                Medical History
						    </Typography>
                        </div>

                        {/* <Grid container spacing={3} alignContent="center" direction="column">
                            <Grid item xs={4}>
                                <div style={{ textAlign: 'center' }}>
                                    <Typography variant="h6">
                                        Email Notification
								</Typography>
                                </div>

                            </Grid>
                        </Grid> */}

                        <Typography variant="h6" className="text-blue-600">
                            1 - Name of the Patient
						</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <TextField
                                    className="mt-8 mb-16"
                                    error={form.firstName === ''}
                                    required
                                    label="First Name"
                                    id="firstName"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    className="mt-8 mb-16"
                                    error={form.lastName === ''}
                                    required
                                    label="Last Name"
                                    id="lastName"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Typography variant="h6" className="text-blue-600">
                            2 - Phone Number
						</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={1}>
                                <TextField
                                    className="mt-8 mb-16"
                                    error={form.areaCode === ''}
                                    required
                                    label="Area Code"
                                    id="areaCode"
                                    name="areaCode"
                                    value={form.areaCode}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    className="mt-8 mb-16"
                                    error={form.phoneNumber === ''}
                                    required
                                    label="Phone Number"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={form.phoneNumber}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Typography variant="h6" className="text-blue-600">
                            3 - Check the conditions that apply to you or to any members of your immediate relatives:
						</Typography>
                        <Grid container spacing={1}>
                            <FormControl component="fieldset" className="mr-32">
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox name="asthma" checked={form.asthma} onChange={handleChange} />}
                                        label="Asthma"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox name="cardiacDisease" checked={form.cardiacDisease} onChange={handleChange} />}
                                        label="Cardiac Disease"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox name="hypertension" checked={form.hypertension} onChange={handleChange} />}
                                        label="Hypertension"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={form.psychiatricDisorder} onChange={handleChange} name="psychiatricDisorder" />}
                                        label="Psychiatric Disorder"
                                    />
                                </FormGroup>
                            </FormControl>

                            <FormControl component="fieldset">
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={form.epilepsy} onChange={handleChange} name="epilepsy" />}
                                        label="Epilepsy"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={form.cancer} onChange={handleChange} name="cancer" />}
                                        label="Cancer"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={form.diabetes} onChange={handleChange} name="diabetes" />}
                                        label="Diabetes"
                                    />
                                </FormGroup>
                            </FormControl>
                        </Grid>

                        <Typography variant="h6" className="text-blue-600 mt-16 mb-8">
                            4 - Do you use or do you have history of using tobacco?
						</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <FormControl fullWidth variant="outlined" className="mt-8 mb-16">
                                    <InputLabel htmlFor="outlined-age-native-simple">Option</InputLabel>
                                    <Select
                                        native
                                        id="historyTobacco"
                                        name="historyTobacco"
                                        value={form.historyTobacco}
                                        onChange={handleChange}
                                        label="History Tobacco"
                                        inputProps={{
                                            name: 'historyTobacco',
                                            id: 'outlined-age-native-simple',
                                        }}
                                    >
                                        <option aria-label="None" value="" />
                                        <option value={1}>Yes</option>
                                        <option value={2}>No</option>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Typography variant="h6" className="text-blue-600 mt-16 mb-8">
                            5 - Do you have any medication allergies?
						</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <FormControl id="medicationAlergies" className="mt-8 mb-16" component="fieldset">
                                    <RadioGroup aria-label="gender" id="medicationAlergies" name="medicationAlergies" value={form.medicationAlergies} onChange={handleChange}>
                                        <FormControlLabel value="no" control={<Radio />} label="No" />
                                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="sure" control={<Radio />} label="Sure" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Typography variant="h6" className="text-blue-600 mt-16 mb-8">
                            6 - How often do you consume alcohol?
						</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <FormControl id="oftenAlcohol" className="mt-8 mb-16" component="fieldset">
                                    <RadioGroup aria-label="gender" id="oftenAlcohol" name="oftenAlcohol" value={form.oftenAlcohol} onChange={handleChange}>
                                        <FormControlLabel value="never" control={<Radio />} label="Never" />
                                        <FormControlLabel value="daily" control={<Radio />} label="Daily" />
                                        <FormControlLabel value="occasionally" control={<Radio />} label="Occasionally" />
                                        <FormControlLabel value="weekly" control={<Radio />} label="Weekly" />
                                        <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
                </ div >
                )}
        />
    );
}

export default IntakeForm;
