import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
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

function AppointmentPreparation(props) {
    
	const classes = useStyles(props);
	const theme = useTheme();
	function setFeaturedImage(id) {
		props.history.push(`../intake-form`);
    }
    return (
        <div>
            <div className="flex justify-center sm:justify-start flex-wrap -mx-8">
                <label
                    htmlFor="button-file"
                    className={clsx(
                        classes.appointmentImageUpload,
                        'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5'
                    )}
                >
                    <Icon fontSize="large" color="action">
                        cloud_upload
										</Icon>
                </label>
                {props.appointment.images && props.appointment.images.map((media, i) => (
                    <div
                        style={{ backgroundColor: i % 2 === 0 ? "#f0020257" : "#DEFFBD" }}
                        onClick={() => setFeaturedImage(media.id)}
                        onKeyDown={() => setFeaturedImage(media.id)}
                        role="button"
                        tabIndex={0}
                        className={clsx(
                            classes.appointmentImageItem,
                            'flex items-center justify-center relative flex-col w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5',
                            media.id === props.appointment.featuredImageId && 'featured'
                        )}
                        key={media.id}
                    >
                        <div style={{ fontWeight: '700' }} >	Medical History</div>
                        <img className="max-w-none" style={{ height: '84%', width: '84%' }} src={media.url} alt="appointment" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AppointmentPreparation;