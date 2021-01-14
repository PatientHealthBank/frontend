import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import CaregiverFormDialog from './CaregiverFormDialog'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';


function CaregiverInformationWidget(props) {

    const [open, setOpen] = useState(false);
    const [type, setType] = useState(false);
    const user = useSelector(({ auth }) => auth.user);

    var imageProfile = "assets/images/avatars/profile.jpg";

    const [id, setId] = useState(null);

    const handleOpenModal = (type) => {
        setType(type);
        setOpen(true);
    }

    const handleOpenModalEdit = (row) => {
        setId(row.id);
        setOpen(true);
    }

    const handleDelete = (id) => {
        props.DeletelinkCaregiver(id);
    }

    return (
        (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <Typography className="mt-8 mb-16" variant="h6">
                        Caregiver Info
						</Typography>
                </div>

                <Grid container spacing={3} direction="row">
                    {props.caregiverInformation && props.caregiverInformation.filter(p => p.patientId === user.currentUser.id).map(row => (
                        <Grid item xs={3}>
                            <Card style={{ textAlign: 'center' }} className="w-full mb-16 rounded-8" key={row.id}>
                                <AppBar position="static" elevation={0}>
                                    <Toolbar className="px-8" variant="dense">
                                        <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
                                            Caregiver
                                        </Typography>
                                        <Tooltip title="Delete">
                                            <IconButton size="small" onClick={() => handleDelete(row.id)} aria-label="delete">
                                                <DeleteIcon size="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Toolbar>
                                </AppBar>

                                <CardContent>
                                <img
                                    key="1"
                                    style={{ display: "inline"}}
                                    className={"w-128 m-4 rounded-4 "}
                                    src={imageProfile}
                                    alt="Profile"
                                />
                                    <div className="m-12">
                                        <Typography><b>{row.name}</b></Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}

                    <Grid item xs={2}>
                        <Card variant="outlined" className="w-full mb-16 rounded-8">
                            <CardContent>
                                <Grid container direction="column" alignItems="center">
                                    <button onClick={() => handleOpenModal("NEW") }>
                                        <Grid item xs={1}>
                                            <Icon className="text-28" color="action">
                                                add
											</Icon>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography className="mb-4 text-16">New Caregiver</Typography>
                                        </Grid>
                                    </button>
                                </Grid>
                            </CardContent>
                        </Card>
                    
                        <Card variant="outlined" className="w-full mb-16 rounded-8">
                            <CardContent>
                                <Grid container direction="column" alignItems="center">
                                    <button onClick={() => handleOpenModal("LINK") }>
                                        <Grid item xs={1}>
                                            <Icon className="text-28" color="action">
                                                add
											</Icon>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography className="mb-4 text-16">Link Caregiver</Typography>
                                        </Grid>
                                    </button>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <CaregiverFormDialog 
                    open={open} 
                    setOpen={setOpen} 
                    type={type}
                    newCaregiverForm={props.RegisterNewCaregiverInformation}
                    newCaregiverLink={props.RegisterNewCaregiverLink}  
                    caregivers={props.caregiverInformation}
                    id={id}>
                </CaregiverFormDialog>
            </div>
        )
    );
}

export default React.memo(CaregiverInformationWidget);