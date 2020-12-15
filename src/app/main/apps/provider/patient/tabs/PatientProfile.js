
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Divider from '@material-ui/core/Divider';

function PatientProfile(props) {
    return (
        <div className="md:flex max-w-3xl">
            <div className="flex flex-col md:w-400  md:ltr:pr-32 md:rtl:pl-32">
                <FuseAnimateGroup
                    enter={{
                        animation: 'transition.slideUpBigIn'
                    }}
                >
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
                                <Typography className="font-bold text-15">Age</Typography>
                                <Typography>{props.patient.age}</Typography>
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

                                {props.patient.locations.map(location => (
                                    <div className="flex items-center" key={location}>
                                        <Typography>{location}</Typography>
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
                                    {props.patient.medicines.map(row => (
                                        <tr key={row.id}>
                                            <td className="text-left">{row.description}</td>
                                            <td className="text-left">{row.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </FuseAnimateGroup>
            </div>
            <div className="flex flex-col flex-1">
                <FuseAnimateGroup
                    enter={{
                        animation: 'transition.slideUpBigIn'
                    }}
                >
                    <Card className="w-full mb-16 rounded-8">
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
                                    {props.patient.allergies.map(row => (
                                        <tr key={row.id}>
                                            <td className="text-left">{row.description}</td>
                                            <td className="text-left">{row.age}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <Divider className="card-divider w-full" />
                        </CardContent>
                    </Card>
                    <Card className="w-full mb-16 rounded-8">
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
                                    {props.patient.vaccines.map(row => (
                                        <tr key={row.id}>
                                            <td className="text-left">{row.description}</td>
                                            <td className="text-left">{row.location}</td>
                                            <td className="text-left">{row.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <Divider className="card-divider w-full" />
                        </CardContent>
                    </Card>

                </FuseAnimateGroup>
            </div>
        </div>
    );
}

export default PatientProfile;