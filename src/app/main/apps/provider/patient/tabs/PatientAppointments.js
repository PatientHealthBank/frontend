import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientAppointments } from '../../store/patientSlice';


function PatientAppointments(props) {
    const appointments = useSelector(({ providerApp }) => providerApp.patient.appointments);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPatientAppointments({ patientId: props.patientId, providerId: props.providerId }));
    }, [dispatch]);

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
                    {appointments && appointments.map(item => { 
                        return (
                            <TableRow
                                className="h-64 cursor-pointer"
                                hover
                                role="checkbox"
                                onClick={event => handleClick(item.id)}
                                tabIndex={-1}
                                key={item.id}
                            >
                                <TableCell className="p-4 md:p-16" component="th" scope="row">
                                    {item.specialty.description}
                                </TableCell>

                                <TableCell className="p-4 md:p-16" component="th" scope="row">
                                    {item.provider.name}
                                </TableCell>

                                <TableCell className="p-4 md:p-16" component="th" scope="row">
                                    {item.patient.name}
                                </TableCell>

                                <TableCell className="p-4 md:p-16" component="th" scope="row">
                                    {item.scheduleDate}
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