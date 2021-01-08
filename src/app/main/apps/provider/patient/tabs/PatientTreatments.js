import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import PrimaryIconButton from '../../../../Components/PrimaryIconButton';
import Icon from '@material-ui/core/Icon';
import { withRouter } from "react-router";

const rows = [
    {
        id: 'treatment',
        align: 'left',
        disablePadding: false,
        label: 'Treatment',
        sort: true
    },
    {
        id: 'speacialty',
        align: 'left',
        disablePadding: false,
        label: 'Speacialty',
        sort: true
    },
    {
        id: 'patient',
        align: 'left',
        disablePadding: false,
        label: 'Patient',
        sort: true
    },
    {
        id: 'nextAppointment',
        align: 'left',
        disablePadding: false,
        label: 'Next Appointment',
        sort: true
    },
    {
        id: 'progress',
        align: 'left',
        disablePadding: false,
        label: 'Progress',
        sort: true
    }
];

function PatientTreatments(props) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
     // eslint-disable-next-line 
    const [order, setOrder] = useState({
        direction: 'asc',
        id: null
    });

    function handleChangePage(event, value) {
        setPage(value);
    }

    const handleAddTreatment = () =>{
        props.history.push(`/treatments/new`);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(event.target.value);
    }

    function handleClick(){
        props.history.push(`/treatments/1/true`);
    }
    return (
        <div className="w-full flex flex-col">

            <div className="flex flex-1 w-full items-center justify-between">
                <div className="flex items-center">
                    <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h5">
                        Treatments
				</Typography>
                </div>
                <div className="flex items-right">
                    <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h5">
                        <PrimaryIconButton onClick={handleAddTreatment}>
                            <Icon>add</Icon>
                        </PrimaryIconButton>
                    </Typography>
                </div>
            </div>
            <FuseScrollbars className="flex-grow overflow-x-auto">
                <Table className="min-w-xl" aria-labelledby="tableTitle">
                    <TableHead>
                        <TableRow className="h-64">
                            {rows && rows.map(row => {
                                return (
                                    <TableCell
                                        className="p-4 md:p-16"
                                        key={row.id}
                                        align={row.align}
                                        padding={row.disablePadding ? 'none' : 'default'}
                                        sortDirection={order.id === row.id ? order.direction : false}
                                    >
                                        {row.sort && (
                                            <Tooltip
                                                title="Sort"
                                                placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                                                enterDelay={300}
                                            >
                                                <TableSortLabel
                                                    active={order.id === row.id}
                                                    direction={order.direction}
                                                // onClick={createSortHandler(row.id)}
                                                >
                                                    {row.label}
                                                </TableSortLabel>
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                );
                            }, this)}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {_.orderBy(
                            props.treatments,
                            [
                                o => {
                                    switch (order.id) {
                                        case 'categories': {
                                            return o.categories[0];
                                        }
                                        default: {
                                            return o[order.id];
                                        }
                                    }
                                }
                            ],
                            [order.direction]
                        )
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(n => {
                                return (
                                    <TableRow
                                        className="h-64 cursor-pointer"
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={n.id}
                                        onClick={event => handleClick()}
                                    >

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.treatment}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.specialty}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.patient}
                                        </TableCell>

                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            {n.nextAppointment}
                                        </TableCell>
                                        <TableCell className="p-4 md:p-16" component="th" scope="row">
                                            <Box display="flex" alignItems="center">
                                                <Box width="70%" mr={1}>
                                                    <LinearProgress color="secondary" variant="determinate" value={n.progress} />
                                                </Box>
                                                <Box minWidth={35}>
                                                    <Typography variant="body2" color="textSecondary">{`${Math.round(
                                                        n.progress,
                                                    )}%`}</Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </FuseScrollbars>

            <TablePagination
                className="flex-shrink-0 border-t-1"
                component="div"
                count={props.treatments.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page'
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page'
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}


export default withRouter(PatientTreatments);
