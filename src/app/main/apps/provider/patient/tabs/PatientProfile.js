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

function PatientProfile(props) {
    const theme = useTheme();
    const [currentRange, setCurrentRange] = useState('TW');
    const supporting = {
        created: {
            label: 'Bicycle crunch',
            count: {
                '2W': 48,
                LW: 46,
                TW: '54 Minutes'
            },
            chart: {
                '2W': {
                    datasets: [
                        {
                            label: 'Minutes',
                            data: [5, 8, 5, 6, 7, 8, 7],
                            fill: true,
                            backgroundColor: '#42BFF7',
                            pointRadius: 0,
                            pointHitRadius: 20,
                            borderWidth: 0
                        }
                    ],
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                LW: {
                    datasets: [
                        {
                            label: 'Minutes',
                            data: [6, 3, 7, 5, 5, 4, 7],
                            fill: true,
                            backgroundColor: '#42BFF7',
                            pointRadius: 0,
                            pointHitRadius: 20,
                            borderWidth: 0
                        }
                    ],
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                TW: {
                    datasets: [
                        {
                            label: 'Minutes',
                            data: [3, 2, 1, 4, 8, 8, 4],
                            fill: true,
                            backgroundColor: '#42BFF7',
                            pointRadius: 0,
                            pointHitRadius: 20,
                            borderWidth: 0
                        }
                    ],
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                options: {
                    legend: {
                        display: false
                    },
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [
                            {
                                display: false
                            }
                        ],
                        yAxes: [
                            {
                                display: false
                            }
                        ]
                    }
                }
            }
        },
        closed: {
            label: 'Street Walking',
            count: {
                '2W': 27,
                LW: 31,
                TW: '26 Minutes'
            },
            chart: {
                TW: {
                    datasets: [
                        {
                            label: 'Minutes',
                            data: [6, 3, 7, 5, 5, 4, 7],
                            fill: true,
                            backgroundColor: '#42BFF7',
                            pointRadius: 0,
                            pointHitRadius: 20,
                            borderWidth: 0
                        }
                    ],
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                '2W': {
                    datasets: [
                        {
                            label: 'Created',
                            data: [3, 2, 1, 4, 8, 8, 4],
                            fill: true,
                            backgroundColor: '#42BFF7',
                            pointRadius: 0,
                            pointHitRadius: 20,
                            borderWidth: 0
                        }
                    ],
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                LW: {
                    datasets: [
                        {
                            label: 'Created',
                            data: [6, 5, 4, 5, 7, 4, 7],
                            fill: true,
                            backgroundColor: '#42BFF7',
                            pointRadius: 0,
                            pointHitRadius: 20,
                            borderWidth: 0
                        }
                    ],
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                options: {
                    legend: {
                        display: false
                    },
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [
                            {
                                display: false
                            }
                        ],
                        yAxes: [
                            {
                                display: false
                            }
                        ]
                    }
                }
            }
        },
        reOpened: {
            label: 'Pushups',
            count: {
                '2W': 4,
                LW: 5,
                TW: '33 Times'
            },
            chart: {
                '2W': {
                    datasets: [
                        {
                            label: 'Times',
                            data: [6, 3, 7, 5, 5, 4, 7],
                            fill: true,
                            backgroundColor: '#42BFF7',
                            pointRadius: 0,
                            pointHitRadius: 20,
                            borderWidth: 0
                        }
                    ],
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                LW: {
                    datasets: [
                        {
                            label: 'Created',
                            data: [5, 7, 8, 8, 6, 4, 1],
                            fill: true,
                            backgroundColor: '#42BFF7',
                            pointRadius: 0,
                            pointHitRadius: 20,
                            borderWidth: 0
                        }
                    ],
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                TW: {
                    datasets: [
                        {
                            label: 'Times',
                            data: [3, 2, 1, 4, 8, 8, 4],
                            fill: true,
                            backgroundColor: '#42BFF7',
                            pointRadius: 0,
                            pointHitRadius: 20,
                            borderWidth: 0
                        }
                    ],
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                TW2: [
                    {
                        name: 'RE-OPENED',
                        series: [
                            {
                                name: 'Mon',
                                value: 3
                            },
                            {
                                name: 'Tue',
                                value: 2
                            },
                            {
                                name: 'Wed',
                                value: 1
                            },
                            {
                                name: 'Thu',
                                value: 4
                            },
                            {
                                name: 'Fri',
                                value: 8
                            },
                            {
                                name: 'Sat',
                                value: 8
                            },
                            {
                                name: 'Sun',
                                value: 4
                            }
                        ]
                    }
                ],
                options: {
                    legend: {
                        display: false
                    },
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [
                            {
                                display: false
                            }
                        ],
                        yAxes: [
                            {
                                display: false
                            }
                        ]
                    }
                }
            }
        },
        wontFix: {
            label: "Single-leg deadlifts",
            count: {
                '2W': 6,
                LW: 3,
                TW: '4 Times'
            },
            chart: {
                '2W': {
                    datasets: [
                        {
                            label: 'Created',
                            data: [5, 7, 4, 6, 5, 3, 2],
                            fill: true,
                            backgroundColor: '#42BFF7',
                            pointRadius: 0,
                            pointHitRadius: 20,
                            borderWidth: 0
                        }
                    ],
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                LW: {
                    datasets: [
                        {
                            label: 'Created',
                            data: [6, 3, 7, 5, 5, 4, 7],
                            fill: true,
                            backgroundColor: '#42BFF7',
                            pointRadius: 0,
                            pointHitRadius: 20,
                            borderWidth: 0
                        }
                    ],
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                TW: {
                    datasets: [
                        {
                            label: 'Times',
                            data: [6, 5, 4, 5, 7, 4, 7],
                            fill: true,
                            backgroundColor: '#42BFF7',
                            pointRadius: 0,
                            pointHitRadius: 20,
                            borderWidth: 0
                        }
                    ],
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                options: {
                    legend: {
                        display: false
                    },
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [
                            {
                                display: false
                            }
                        ],
                        yAxes: [
                            {
                                display: false
                            }
                        ]
                    }
                }
            }
        }
    }

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

    function handleChangeRange(range) {
        setCurrentRange(range);
    }
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
                        <div className="mb-8">
                            <Typography className="font-bold text-15">Gender</Typography>
                            <Typography>{props.patient.gender}</Typography>
                        </div>

                        <div className="mb-8">
                            <Grid container>
                                <Grid item>
                                    <Typography className="font-bold text-15">Age</Typography>
                                    <Typography>{props.patient.age}</Typography>
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
                            <Typography>{props.patient.birthday}</Typography>
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
                                        <Typography className="font-bold text-15">Description</Typography>
                                    </th>
                                    <th className="text-left">
                                        <Typography className="font-bold text-15">Quantity</Typography>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {props.patient.medicines.map(row => (
                                    <tr key={row.id}>
                                        <td className="text-left">{row.description}</td>
                                        <td className="text-left">{row.quantity}</td>
                                    </tr>
                                ))} */}
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
                        <div className="w-full md:w-1/3 p-12">
                            <div className="p-16 px-4 flex flex-row items-center justify-between">
                                <Typography className="h1 px-12">List your activities</Typography>
                            </div>

                            <table className="simple clickable">
                                <thead>
                                    <tr>
                                        <th aria-label="title" >Activities</th>
                                        <th className="text-right">Minutes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activities.map(row => (
                                        <tr key={row.title}>
                                            <td>{row.title}</td>
                                            <td className="text-right">{row.clicks}</td>
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