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
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';

import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import reducer from '../../../pages/profile/store';
import {setIntakeForm} from '../../../pages/profile/store/intakeFormSlice';

import withReducer from 'app/store/withReducer';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const useStyles = makeStyles({
    layoutRoot: {},
    formControl: {

        minWidth: 120,
        maxWidth: 300,
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
      },
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
            setState(responses)
        }
    },[intakeForm.answers]);

    useEffect(() => {
        return () => {dispatch(setIntakeForm({}))};
      }, []);

    function goToAppointmens() {
        props.history.push(`/appointments`);
    }
    const handleChangeInput = (event, description, id) => {
        setState({ ...state, [description]: { value: event.target.value, id } })
    }

    const handleChangeMultiple = (event, description, id) => {

        setState({ ...state, [description]: { value : event.target.value.join(';'), id } })
      };

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
    const isValidIntakeForm = () =>{
        return !intakeForm?.questions?.some(item=> {
            if(item.questionType != 1)
                return item.required && !state[item.description]?.value 
            else
                return item.required && (!state[item.description]?.value ||(state[item.description]?.value == 0))
            
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
                                onClick={()=>props.history.goBack()}
                                color="inherit"
                            >
                                <Icon className="text-20">
                                    {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                                </Icon>
                                <span className="mx-4">back</span>
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
                            disabled={!isValidIntakeForm()}
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
                                    <Typography variant="h6" className="text-blue-600">
                                        {item.description} {item.required && <Tooltip title="This field is required"><span>*</span></Tooltip>}
                                    </Typography>
                                    {item.questionType == 5 ?
                                        (<FormControl fullWidth variant="outlined" className="mt-8 mb-16">
                                            <InputLabel id={item.description}>{item.description}</InputLabel>
                                            <Select
                                              labelId={item.description}
                                              id={item.description}
                                              multiple
                                              value={state[item.description]?.value.split(';') || []}
                                              onChange={event => handleChangeMultiple(event, item.description, item.id)}
                                              name={item.description}
                                              input={<Input id="select-multiple-chip" />}
                                              renderValue={(selected) => (
                                                <div className={classes.chips}>
                                                  {selected.map((value) => (
                                                    <Chip key={value} label={value} className={classes.chip} />
                                                  ))}
                                                </div>
                                              )}
                                              MenuProps={MenuProps}
                                            >
                                              {item.options.map((item, i) => (
                                                <MenuItem key={i} value={item.value} style={getStyles(item.value, item.description, theme)}>
                                                  {item.description}
                                                </MenuItem>
                                              ))}
                                            </Select>
                                          </FormControl>
                                        ):
                                        item.questionType == 4 ? (
                                            <TextField
                                                className="mt-8 mb-16"
                                                label={item.description}
                                                id={item.description}
                                                name={item.description}
                                                type={'number'}
                                                value={state[item.description]?.value}
                                                onChange={event => handleChangeInput(event, item.description, item.id)}
                                                variant="outlined"
                                                fullWidth
                                                autoFocus
                                            />
                                        ) :
                                    item.questionType == 3 ?
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
