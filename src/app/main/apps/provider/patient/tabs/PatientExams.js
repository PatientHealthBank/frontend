import FuseAnimate from '@fuse/core/FuseAnimate';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';

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
    }
}));

function PatientExams(props) {
    const classes = useStyles(props);
    return (
        <div>
            <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
                <span className="mx-4">Add a Test Results </span>
                <Icon className="text-35">
                    backup
            </Icon>
            </Typography>
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
                    {props.exams.map(item => {
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
        </div>
    );
}

export default PatientExams;