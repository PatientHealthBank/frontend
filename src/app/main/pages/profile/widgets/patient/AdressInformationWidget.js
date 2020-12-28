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

function AdressinformationWidget(props) {
    console.log('adressss');
    const { t } = useTranslation();
    const user = useSelector(({ auth }) => auth);
    const { form, handleChange, setForm } = useForm(null);

    useEffect(() => {
        if ((props.patientInformation && !form) || (props.patientInformation && form && props.patientInformation.id !== form.id)) {
            setForm(props.patientInformation);
        }
    }, [form, props.patientInformation, setForm]);

    return (
       (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <Typography className="mt-8 mb-16" variant="h6">
                        Address Info
						</Typography>
                </div>

                <Grid container spacing={3} direction="row">

                    <Grid item xs={4}>
                        <Card className="w-full mb-16 rounded-8">
                            <AppBar position="static" elevation={0}>
                                <Toolbar className="px-8" variant="dense">
                                    <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
                                        Address - Home
												</Typography>
                                </Toolbar>
                            </AppBar>

                            <CardContent>
                                <div className="mb-12">
                                    <Typography className="font-bold mb-4 text-15">Address</Typography>

                                    <div className="flex items-center">
                                        <Typography>{'Av Nossa Senha do Carmo'}</Typography>
                                        <Icon className="text-16 mx-4" color="action">
                                            location_on
													</Icon>
                                    </div>
                                </div>

                                <div className="mb-12">
                                    <Typography className="font-bold mb-4 text-15">Country</Typography>
                                    <Typography>{'Brazil'}</Typography>
                                </div>

                                <div className="mb-12">
                                    <Typography className="font-bold mb-4 text-15">City</Typography>
                                    <Typography>{'Belo Horizonte'}</Typography>
                                </div>

                                <div className="mb-12">
                                    <Typography className="font-bold mb-4 text-15">State</Typography>
                                    <Typography>{'Minas Gerais'}</Typography>
                                </div>

                                <div className="mb-12">
                                    <Typography className="font-bold mb-4 text-15">ZIP Code</Typography>
                                    <Typography>{'33003000'}</Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card className="w-full mb-16 rounded-8">
                            <AppBar position="static" elevation={0}>
                                <Toolbar className="px-8" variant="dense">
                                    <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
                                        Address - Work
												</Typography>
                                </Toolbar>
                            </AppBar>

                            <CardContent>

                                <div className="mb-12">
                                    <Typography className="font-bold mb-4 text-15">Address</Typography>

                                    <div className="flex items-center">
                                        <Typography>{'Av Nossa Senha do Carmo'}</Typography>
                                        <Icon className="text-16 mx-4" color="action">
                                            location_on
													</Icon>
                                    </div>
                                </div>

                                <div className="mb-12">
                                    <Typography className="font-bold mb-4 text-15">Country</Typography>
                                    <Typography>{'Brazil'}</Typography>
                                </div>

                                <div className="mb-12">
                                    <Typography className="font-bold mb-4 text-15">City</Typography>
                                    <Typography>{'Belo Horizonte'}</Typography>
                                </div>

                                <div className="mb-12">
                                    <Typography className="font-bold mb-4 text-15">State</Typography>
                                    <Typography>{'Minas Gerais'}</Typography>
                                </div>

                                <div className="mb-12">
                                    <Typography className="font-bold mb-4 text-15">ZIP Code</Typography>
                                    <Typography>{'33003000'}</Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card variant="outlined" className="w-full mb-16 rounded-8">
                            <CardContent>
                                <Grid container direction="column" alignItems="center">
                                    <Grid item xs={2}>
                                        <Icon className="text-56" color="action">
                                            add
											</Icon>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography className="mb-4 text-32">Add Address</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    );
}



export default React.memo(AdressinformationWidget);