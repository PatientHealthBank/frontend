import Typography from '@material-ui/core/Typography';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
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
import reducer from '../../../pages/profile/store';
import {setIntakeForm} from '../../../pages/profile/store/intakeFormSlice';

import withReducer from 'app/store/withReducer';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

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
    const [state, setState] = React.useState({});
    const intakeForm = useSelector(({ ProfilesApp }) => ProfilesApp.intakeForm);

    const theme = useTheme();
    const classes = useStyles(props);
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
        if (intakeForm.answers) {
            var responses = intakeForm.answers.reduce((acc, item) => {
                acc[item.question.description] = { value: item.answer, id: item.id }
                return acc
            }, {})
            console.log(responses)
            setState(responses)
        }
    },[intakeForm.answers]);

    function goToAppointmens() {
        props.history.push(`/appointments`);
    }
    const handleChangeInput = (event, description, id) => {
        console.log({ ...state, [description]: { value: event.target.value, id } })
        setState({ ...state, [description]: { value: event.target.value, id } })
    }
    const handleChangeCheckBox = (event, description, id) => {
        console.log({ ...state, [description]: { value: event.target.checked ? "1" : "0", id } })

        setState({ ...state, [description]: { value: event.target.checked ? "1" : "0", id } })
    }
    const saveIntakeForm = () => {
        var data = []
        for (var item in state) {
            data.push(state[item])
        }
        dispatch(openLoading())
        phbApi().post("patient/PatientIntakeform/" + intakeForm.id, data).then(res=>{
            dispatch(closeLoading())
            setState({})
            dispatch(setIntakeForm({}))
            props.history.push(`/pages/profile/profile-medical-history`);
        })

    }

    return (
        <FusePageCarded
            classes={{
                root: classes.layoutRoot
            }}
            header={
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
                            onClick={saveIntakeForm}
                        >
                            Save
							</Button>
                    </div>
            }
            content={
                (<div className="p-16 sm:p-24">
                    {intakeForm && intakeForm.intakeform ?( <div>

                        <div className="mt-8 mb-32" style={{ textAlign: 'center' }}>
                            <Typography variant="h4" className="text-blue-600">
                                {intakeForm.intakeform.intakeForm.description}
                            </Typography>
                        </div>

                        {/* <Grid container spacing={3} alignContent="center" direction="column">
                            
                                <div style={{ textAlign: 'center' }}>
                                    <Typography variant="h6">
                                        Email Notification
								</Typography>
                                </div>

                            </Grid>
                        </Grid> */}
                        <Grid container spacing={3}>
                            {intakeForm.questions.map(item =>
                            (
                                <Grid key={item.id} item xs={4}>
                                    {item.questionType != 1 && <Typography variant="h6" className="text-blue-600">
                                        {item.description}
                                    </Typography>}
                                    {item.questionType == 3 ?
                                        (
                                            <FormControl fullWidth variant="outlined" className="mt-8 mb-16">
                                             <InputLabel htmlFor="outlined-age-native-simple">{item.description}</InputLabel>

                                                <Select
                                                    native
                                                    id={item.description}
                                                    name={item.description}
                                                    value={state[item.description]?.value}
                                                    onChange={event => handleChangeInput(event, item.description, item.id)}
                                                    label={item.description}
                                                    inputProps={{
                                                        id: 'outlined-age-native-simple',
                                                    }}>
                                                    <option value=""></option>
                                                    {item.options.map(option =>
                                                        <option value={option.value}>{option.description}</option>
                                                    )}
                                                </Select>
                                            </FormControl>
                                        )
                                        :
                                        item.questionType == 2 ? (
                                            <TextField
                                                className="mt-8 mb-16"
                                                required
                                                label={item.description}
                                                id={item.description}
                                                name={item.description}
                                                value={state[item.description]?.value}
                                                onChange={event => handleChangeInput(event, item.description, item.id)}
                                                variant="outlined"
                                                fullWidth
                                                autoFocus
                                            />
                                        ) :
                                            (
                                                <FormControlLabel
                                                    disabled={routeParams.readOnly}
                                                    control={<Checkbox name={item.description}
                                                        value={state[item.description]?.value == "1"}
                                                        checked={state[item.description]?.value == "1"}
                                                        onChange={event => handleChangeCheckBox(event, item.description, item.id)} />}
                                                    label={item.description}
                                                />)
                                    }
                                </Grid>
                            )
                            )}
                        </Grid>
                    </div>): (<></>)}
                </ div >
                )}
        />
    );
}

export default withReducer('ProfilesApp', reducer)(withRouter(IntakeForm));
