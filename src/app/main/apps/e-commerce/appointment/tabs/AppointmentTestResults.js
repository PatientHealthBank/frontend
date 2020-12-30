import FuseAnimate from '@fuse/core/FuseAnimate';
import _ from '@lodash';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { orange } from '@material-ui/core/colors';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';



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

function AppointmentTestResult(props) {
    const theme = useTheme();

    const classes = useStyles(props);

    var files = [
		{
			id: '1',
			name: 'Magnetic resonance imaging (MRI) Knee',
			type: 'PDF',
			owner: 'Me',
			size: '750 Kb',
			modified: 'July 8, 2020',
			opened: 'July 8, 2020',
			created: 'July 8, 2020',
			extention: '',
			location: 'My Files > Documents',
			offline: true
		},
		{
			id: '4',
			name: 'Blood test',
			type: 'document',
			owner: 'Emily Bennett',
			size: '1.2 Mb',
			modified: 'July 8, 2020',
			opened: 'July 8, 2020',
			created: 'July 8, 2020',
			extention: '',
			location: 'My Files > Documents',
			offline: true,
			preview: 'assets/images/etc/sample-file-preview.jpg'
		}
	];
return (
    <div>
    <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
        <span className="mx-4">Add a Test Results</span>
        <Icon className="text-35">
            backup
        </Icon>
    </Typography>
    <FuseAnimate animation="transition.slideUpIn" delay={300}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell className="max-w-64 w-64 p-0 text-center"> </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell className="hidden sm:table-cell">Type</TableCell>
                    <TableCell className="hidden sm:table-cell">Owner</TableCell>
                    <TableCell className="text-center hidden sm:table-cell">Size</TableCell>
                    <TableCell className="hidden sm:table-cell">Modified</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {files && files.map(item => {
                    return (
                        <TableRow
                            key={item.id}
                            hover
                            // onClick={event => dispatch(setSelectedItem(item.id))}
                            // selected={item.id === selectedItemId}
                            className="cursor-pointer"
                        >
                            <TableCell className="max-w-64 w-64 p-0 text-center">
                                <Icon className={clsx(classes.typeIcon, item.type)} />
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="hidden sm:table-cell">{item.type}</TableCell>
                            <TableCell className="hidden sm:table-cell">{item.owner}</TableCell>
                            <TableCell className="text-center hidden sm:table-cell">
                                {item.size === '' ? '-' : item.size}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{item.modified}</TableCell>
                            <Hidden lgUp>
                                <TableCell>
                                    <IconButton
                                        onClick={ev => props.pageLayout.current.toggleRightSidebar()}
                                        aria-label="open right sidebar"
                                    >
                                        <Icon>info</Icon>
                                    </IconButton>
                                </TableCell>
                            </Hidden>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    </FuseAnimate>
    </div>    
    );
}

export default AppointmentTestResult;