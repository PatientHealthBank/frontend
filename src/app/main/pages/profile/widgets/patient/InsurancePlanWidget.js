import { useDeepCompareEffect, useForm } from '@fuse/hooks';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';

function InsurancePlanWidget(props) {
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

            <>
                <div style={{ textAlign: 'center' }}>
                    <Typography className="mt-8 mb-16" variant="h6">
                        Insurance Plan Info
						</Typography>
                </div>

                <Grid container spacing={3} direction="row">

                    <Grid item xs={4}>
                        <Card className="w-full mb-16 rounded-8">
                            <AppBar position="static" elevation={0}>
                                <Toolbar className="px-8" variant="dense">
                                    <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
                                        Insurance Plan - Meridian health
										</Typography>
                                </Toolbar>
                            </AppBar>

                            <CardContent>
                                <div className="mb-12">
                                    <Typography className="font-bold mb-4 text-15">Member Name</Typography>
                                    <Typography>{'Jhon Doe'}</Typography>
                                </div>

                                <Grid container spacing={3}>
                                    <Grid item>
                                        <Typography className="font-bold mb-4 text-15">Member Id</Typography>
                                        <Typography>{'523448999'}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography className="font-bold mb-4 text-15">Member Service</Typography>
                                        <Typography>{'888-437-0606'}</Typography>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item>
                                        <Typography className="font-bold mb-4 text-15">Effective Date</Typography>

                                        <div className="flex items-center">
                                            <Typography>{'23/06/2019'}</Typography>
                                        </div>
                                    </Grid>

                                    <Grid item>
                                        <Typography className="font-bold mb-4 text-15">Health Plan</Typography>
                                        <Typography>{'Prime'}</Typography>
                                    </Grid>
                                </Grid>
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
                                        <Typography className="mb-4 text-32">Add Plan</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </>

        )
    );
}


export default React.memo(InsurancePlanWidget);