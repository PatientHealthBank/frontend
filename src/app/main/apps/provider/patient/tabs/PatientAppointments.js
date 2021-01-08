import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { withRouter } from 'react-router-dom';


function PatientAppointments(props) {
    function handleClick(appointmentId) {
        props.history.push(`/apps/e-commerce/products/${appointmentId}/a-walk-amongst-friends-canvas-print/true`);
    }
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Appointment</TableCell>
                        <TableCell className="hidden sm:table-cell">Doctor Name</TableCell>
                        <TableCell className="hidden sm:table-cell">Patient</TableCell>
                        <TableCell className="hidden sm:table-cell">Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.appointments.map(n => {
                        return (
                            <TableRow
                                className="h-64 cursor-pointer"
                                hover
                                role="checkbox"
                                onClick={event => handleClick(n.id)}
                                tabIndex={-1}
                                key={n.id}
                            >
                                <TableCell className="p-4 md:p-16" component="th" scope="row">
                                    {n.specialtyDescription}
                                </TableCell>

                                <TableCell className="p-4 md:p-16" component="th" scope="row">
                                    {n.doctorName}
                                </TableCell>

                                <TableCell className="p-4 md:p-16" component="th" scope="row">
                                    {n.patient}
                                </TableCell>

                                <TableCell className="p-4 md:p-16" component="th" scope="row">
                                    {n.date}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

export default withRouter(PatientAppointments);