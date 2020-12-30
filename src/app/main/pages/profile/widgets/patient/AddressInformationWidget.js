import { useDeepCompareEffect, useForm } from '@fuse/hooks';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect } from 'react';

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';

function AddressInformationWidget(props) {

    const [title, setTitle] = React.useState();
    const [open, setOpen] = React.useState(false);


    const handleOpenModal = (titleModal) => {
        setTitle(titleModal)
        setOpen(true);
        //AddAddress();
    }

    return (
        (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <Typography className="mt-8 mb-16" variant="h6">
                        Address Info
						</Typography>
                </div>

                <Grid container spacing={3} direction="row">
                    {props.addresstInformation.map(row => (
                        <Grid item xs={4}>
                            <Card className="w-full mb-16 rounded-8" key={row.id}>
                                <AppBar position="static" elevation={0}>
                                    <Toolbar className="px-8" variant="dense">
                                        <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
                                            Address - {row.addressTypeId === 1 ? 'Home' : 'Work'}
                                        
                                        </Typography>
                                    </Toolbar>
                                </AppBar>

                                <CardContent>
                                    <div className="mb-12">
                                        <Typography className="font-bold mb-4 text-15">Address</Typography>

                                        <div className="flex items-center">
                                            <Typography>{row.addressLine1}</Typography>
                                            <Icon className="text-16 mx-4" color="action">
                                                location_on
													</Icon>
                                        </div>
                                    </div>

                                    <div className="mb-12">
                                        <Typography className="font-bold mb-4 text-15">Country</Typography>
                                        <Typography>{row.country}</Typography>
                                    </div>

                                    <div className="mb-12">
                                        <Typography className="font-bold mb-4 text-15">City</Typography>
                                        <Typography>{row.city}</Typography>
                                    </div>

                                    <div className="mb-12">
                                        <Typography className="font-bold mb-4 text-15">State</Typography>
                                        <Typography>{row.state}</Typography>
                                    </div>

                                    <div className="mb-12">
                                        <Typography className="font-bold mb-4 text-15">ZIP Code</Typography>
                                        <Typography>{row.zipCode}</Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}

                    <Grid item xs={4}>
                        <Card variant="outlined" className="w-full mb-16 rounded-8">
                            <CardContent>
                                <Grid container direction="column" alignItems="center">
                                    <button>
                                        <Grid item xs={2}>
                                            <Icon className="text-56" color="action">
                                                add
											</Icon>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography className="mb-4 text-32">Add Address</Typography>
                                        </Grid>
                                    </button>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    );
}

function AddAddress() {
    return (
        (
            <div class="modal fade" id="EnSureModal" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Do ypu need change </h4>
                        </div>
                        <div class="modal-body">
                            <p>Are u sure from </p>
                            <label id="FromDate"></label>
                            <p>To</p>
                            <label id="ToDate"></label>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">no</button>
                            <button type="button" class="btn btn-default" data-dismiss="modal">yes</button>
                        </div>
                    </div>
                </div>
            </div>
            )
        );
}


export default React.memo(AddressInformationWidget);