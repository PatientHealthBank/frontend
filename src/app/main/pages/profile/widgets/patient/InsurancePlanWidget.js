import { useDeepCompareEffect, useForm } from '@fuse/hooks';
import { TableHead, TableRow } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Button from '@material-ui/core/Button';

function InsurancePlanWidget(props) {
    const { t } = useTranslation();
    const { form, handleChange, setForm } = useForm();

    return ((

        <div>
            <div style={{ textAlign: 'center' }}>
                <Typography className="mt-8 mb-16" variant="h6">
                    Insurance Plan Info
                    
						</Typography>
            </div>

            <Grid container spacing={3} direction="row">
                {props.insurancePlan.map(row => (
                    <Grid item xs={4}>
                        <Card className="w-full mb-16 rounded-8" key={row.id}>
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
                                    <Typography>{row.memberName}</Typography>
                                </div>

                                <Grid container spacing={3}>
                                    <Grid item>
                                        <Typography className="font-bold mb-4 text-15">Member Id</Typography>
                                        <Typography>{row.memberId}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography className="font-bold mb-4 text-15">Member Service</Typography>
                                        <Typography>{row.memberService}</Typography>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item>
                                        <Typography className="font-bold mb-4 text-15">Effective Date</Typography>

                                        <div className="flex items-center">
                                            <Typography>{new Date(row.effectiveDate).toLocaleDateString()}</Typography>
                                        </div>
                                    </Grid>

                                    <Grid item>
                                        <Typography className="font-bold mb-4 text-15">Health Plan</Typography>
                                        <Typography>{row.healthPlan}</Typography>
                                    </Grid>
                                </Grid>
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
                                        <Typography className="mb-4 text-32">Add Plan</Typography>
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


export default React.memo(InsurancePlanWidget);