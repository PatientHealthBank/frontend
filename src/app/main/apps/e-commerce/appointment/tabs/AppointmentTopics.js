import _ from '@lodash';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import Comments from '../Comments';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
    typeIcon: {
        '&.PDF:before': {
            content: "'picture_as_pdf'",
            color: '#F44336'
        },
        '&.document:before': {
            content: "'insert_drive_file'",
            color: '#1565C0'
        },
        '&.spreadsheet:before': {
            content: "'insert_chart'",
            color: '#4CAF50'
        }
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '25ch',
    },
    appointmentImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: orange[400],
        opacity: 0
    },
    appointmentImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut
    },
    appointmentImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& $appointmentImageFeaturedStar': {
                opacity: 0.8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $appointmentImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $appointmentImageFeaturedStar': {
                opacity: 1
            }
        }
    },
    avatarMain: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginLeft: '5px'
    },
}));
const dummyData = [
    {
        message: "I want to check, the pain that i have been feeling, and ai justs don’t know what’s happening ....",
        date: "2020-01-19 08:22 pm",
        user: 1
    },
    {
        message: "I checked the new exams and they're all OK",
        date: "2020-01-20 04:30 pm",

        user: 2
    },
    {
        message: "This should be in left again",
        date: "2020-01-20 01:20 pm",

        user: 2
    },
    {
        message: "I realized that the pain are strong when i climb the stairs....",
        date: "2020-01-21 02:20 pm",
        user: 1
    },
    {
        message: "I want to check, the pain that i have been feeling, and ai justs don’t know what’s happening ....",
        date: "2020-01-23 09:20 am",

        user: 1
    },
    {
        message: "I checked the new exams and they're all OK",
        date: "2020-01-23 09:20 am",

        user: 2
    },
    {
        message: "This should be in left again",
        date: "2020-01-23 09:20 am",

        user: 2
    },
    {
        message: "I realized that the pain are strong when i climb the stairs....",
        date: "2020-01-23 09:20 am",

        user: 1
    },
    {
        message: "I want to check, the pain that i have been feeling, and ai justs don’t know what’s happening ....",
        date: "2020-01-23 09:20 am",

        user: 1
    },
    {
        message: "I checked the new exams and they're all OK",
        date: "2020-01-23 09:20 am",

        user: 2
    },
    {
        message: "This should be in left again",
        date: "2020-01-23 09:20 am",

        user: 2
    },
    {
        message: "I realized that the pain are strong when i climb the stairs....",
        date: "2020-01-23 09:20 am",

        user: 1
    }
];
function AppointmentTopics(props) {
    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };
    const classes = useStyles(props);
    const theme = useTheme();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(dummyData);

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    return (
        <div>
            <div className="rounded-lg shadow-xl flex flex-col pt-16 px-16 ltr:pl-56 rtl:pr-56 pb-40 overflow-scroll" style={{ height: '50vh', background: '#24aae007', border: '1px solid #00000044' }}>
                <Comments dummyData={comments}></Comments>
                <AlwaysScrollToBottom />
            </div>
            <div style={{ marginTop: "1vh" }}>
                <FormControl className={clsx(classes.margin, classes.textField)} style={{ width: '99%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Type your message ...</InputLabel>
                    <OutlinedInput
                        className="mt-8 mb-16"
                        label="Extra Shipping Fee"
                        id="extraShippingFee"
                        name="extraShippingFee"
                        onChange={(event) => setComment(event.target.value)}
                        value={comment}
                        variant="outlined"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    onClick={() => {
                                        var data = new Date();
                                        var newComment =
                                        {
                                            message: comment,
                                            date: `${data.getFullYear()}-${data.getMonth()}-${data.getDate()} ${formatAMPM(data)}`,
                                            user: 1
                                        }
                                        setComments([...comments, newComment])
                                    }}
                                >
                                    <Icon>
                                        send
                            </Icon>
                                </IconButton>
                            </InputAdornment>
                        }
                        fullWidth
                    />
                </FormControl>
            </div>
        </div>
    );
}

export default AppointmentTopics;
