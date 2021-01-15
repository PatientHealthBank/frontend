import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

function PatientProfile(props) {
    const theme = useTheme();

    const activities = [
        {
            title: 'Bicycle crunch',
            clicks: 20,
            conversion: 90
        },
        {
            title: 'Street Walking',
            clicks: 30,
            conversion: 90
        },
        {
            title: 'Pushups',
            clicks: 20,
            conversion: 7
        },
        {
            title: 'Single-leg deadlifts',
            clicks: 15,
            conversion: 0
        }
    ]

    return (
        <div className="md:flex max-w-full">
            <div className="flex flex-col md:w-400  md:ltr:pr-32 md:rtl:pl-32">
                <Card className="w-full mb-16 rounded-8">
                    <AppBar position="static" elevation={0}>
                        <Toolbar className="px-8" variant="dense">
                            <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
                                General Information
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <CardContent>
                        {/* <div className="mb-8">
                            <Typography className="font-bold text-15">Gender</Typography>
                            <Typography>{props.patient.gender}</Typography>
                        </div> */}

                        <div className="mb-8">
                            <Grid container>
                                <Grid item>
                                    <Typography className="font-bold text-15">Age</Typography>
                                    <Typography>{moment().diff(new Date(props.patient.birthdate), 'years',false)}</Typography>
                                </Grid>

                                <Grid className="ml-16" item>
                                    <Typography className="font-bold text-15">Phone</Typography>
                                    <Typography>{props.patient.phone}</Typography>
                                </Grid>
                            </Grid>
                        </div>

                        <div className="mb-8">
                            <Typography className="font-bold text-15">E-mail</Typography>
                            <Typography>{props.patient.email}</Typography>
                        </div>

                        <div className="mb-8">
                            <Typography className="font-bold text-15">Birthday</Typography>
                            <Typography>{moment(props.patient.birthdate).format('MMMM Do YYYY')}</Typography>
                        </div>

                        <div>
                            <Typography className="font-bold text-15">Locations</Typography>

                            {props.patient.address.map(address => (
                                <div className="flex items-center" key={address.id}>
                                    <Typography>{address.addressLine1}</Typography>
                                    <Icon className="text-15" color="action">
                                        location_on
                                        </Icon>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full mb-16 rounded-8">
                    <AppBar position="static" elevation={0}>
                        <Toolbar className="px-8" variant="dense">
                            <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
                                Medications & Supplements
                                </Typography>
                        </Toolbar>
                    </AppBar>

                    <CardContent>
                        <table className="simple clickable">
                            <thead>
                                <tr>
                                    <th className="text-left">
                                        <Typography className="font-bold text-15">Name</Typography>
                                    </th>
                                    <th className="text-left">
                                        <Typography className="font-bold text-15">Frequency</Typography>
                                    </th>
                                    <th className="text-left">
                                        <Typography className="font-bold text-15">Dosage</Typography>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.patient.medicines.map(row => (
                                    <tr key={row.id}>
                                        <td className="text-left">{row.name}</td>
                                        <td className="text-left">{row.frequency}</td>
                                        <td className="text-left">{row.dosage}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col flex-1">
                <Card className="w-full mb-16 rounded-8">
                    <AppBar position="static" elevation={0}>
                        <Toolbar className="px-8" variant="dense">
                            <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
                                Home Activities
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div className="flex w-full flex-wrap p-8">
                        <div className="w-full p-12">
                            <div className="p-16 px-4 flex flex-row items-center justify-between">
                                <Typography className="h1 px-12">List your activities</Typography>
                            </div>

                            <table className="simple clickable">
                                <thead>
                                    <tr>
                                        <th className="text-left">
                                            <Typography className="font-bold text-15">Activities</Typography>
                                        </th>
                                        <th className="text-left">
                                            <Typography className="font-bold text-15">Initial Date</Typography>
                                        </th>
                                        <th className="text-left">
                                            <Typography className="font-bold text-15">Final Date</Typography>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.patient.activities.map(row => (
                                        <tr key={row.id}>
                                            <td>{row.description}</td>
                                            <td>{moment(row.initialDate).format('YYYY-MM-DD')}</td>
                                            <td>{moment(row.finalDate).format('YYYY-MM-DD')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </Card>
            </div>
        </div>
    );
}

export default PatientProfile;