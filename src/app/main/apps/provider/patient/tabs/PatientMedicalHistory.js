import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import React from 'react';
import Icon from '@material-ui/core/Icon';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { setIntakeForm } from 'app/main/pages/profile/store/intakeFormSlice'
import { getPatientIntakeForms } from '../../store/patientSlice';
import { withRouter } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    ratingSize: {
        display: 'flex',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
        '& .MuiSvgIcon-root': {
            width: '2em',
            height: '2em'
        }
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '25ch',
    },
    productImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: orange[400],
        opacity: 0
    },
    productImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut
    },
    productImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& $productImageFeaturedStar': {
                opacity: 0.8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $productImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));

function PatientMedicalHistory(props) {

    const intakeForms = useSelector(({ providerApp }) => providerApp.patient.intakeForms);
    const classes = useStyles(props);
    const dispatch = useDispatch()

    const handleIntakeForm = (intakeForm) => {
        dispatch(setIntakeForm(intakeForm))
        props.history.push("/intake-form")
    }


    React.useEffect(() => {
        dispatch(getPatientIntakeForms(props.patientId));
    }, [])

    return (
        <div className="md:flex max-w-full">
            <div className="flex flex-col md:w-400  md:ltr:pr-32 md:rtl:pl-32">
                <Card className="mb-16 rounded-8">
                    <AppBar position="static" elevation={0}>
                        <Toolbar className="px-8" variant="dense">
                            <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
                                Allergies
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <CardContent>
                        <table className="simple clickable">
                            <thead>
                                <tr>
                                    <th className="text-left">
                                        <Typography className="font-bold text-15">Allergic To</Typography>
                                    </th>
                                    <th className="text-left">
                                        <Typography className="font-bold text-15">Age of Onset</Typography>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.allergies.map(row => (
                                    <tr key={row.id}>
                                        <td className="text-left">{row.allergicTo}</td>
                                        <td className="text-left">{row.ageOfOnset}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Divider className="card-divider w-full" />
                    </CardContent>
                </Card>
                <Card className="mb-16 rounded-8">
                    <AppBar position="static" elevation={0}>
                        <Toolbar className="px-8" variant="dense">
                            <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
                                Immunization History
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <CardContent>
                        <table className="simple clickable">
                            <thead>
                                <tr>
                                    <th className="text-left">
                                        <Typography className="font-bold text-15">Description</Typography>
                                    </th>
                                    <th className="text-left">
                                        <Typography className="font-bold text-15">Location</Typography>
                                    </th>
                                    <th className="text-left">
                                        <Typography className="font-bold text-15">Date</Typography>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.vaccines.map(row => (
                                    <tr key={row.id}>
                                        <td className="text-left">{row.description}</td>
                                        <td className="text-left">{row.location}</td>
                                        <td className="text-left">{moment(row.date).format('YYYY-MM-DD')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Divider className="card-divider w-full" />
                    </CardContent>
                </Card>
            </div>
            <div className="flex justify-center sm:justify-start flex-wrap -mx-8">
                {intakeForms && intakeForms.map((media, i) => (
                    <div
                        style={{ backgroundColor: media.pending == 0 ? "#DEFFBD" : "#f0020257" }}
                        // onClick={() => setFeaturedImage(media.id)}
                        // onKeyDown={() => setFeaturedImage(media.id)}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleIntakeForm(media)}
                        className={clsx(
                            classes.productImageItem,
                            'flex items-center justify-center relative flex-col w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
                            // media.id === form.featuredImageId && 'featured'
                        )}
                        key={media.id}
                    >
                        <div style={{ fontWeight: '700' }} >{media.intakeForm.description}</div>
                        <Icon>format_align_justify </Icon>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default withRouter(PatientMedicalHistory);