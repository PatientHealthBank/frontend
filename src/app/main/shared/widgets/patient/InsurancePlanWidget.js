import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import InsurancePlanFormDialog from './InsurancePlanFormDialog'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

function InsurancePlanWidget(props) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState();

    const [id, setId] = useState(null);
    const [memberName, setMemberName] = useState("");
    const [memberId, setMemberId] = useState("");
    const [memberService, setMemberService] = useState("");
    const [effectiveDate, setEffectiveDate] = useState(new Date());
    const [healthPlan, setHealthPlan] = useState("");

    const handleOpenModal = (titleModal) => {
        setTitle(titleModal)
        setOpen(true);
    }

    const handleOpenModalEdit = (titleModal, row) => {

        setTitle(titleModal);
        setId(row.id);
        setMemberName(row.memberName);
        setMemberId(row.memberId);
        setMemberService(row.memberService);
        setEffectiveDate(row.effectiveDate);
        setHealthPlan(row.healthPlan);

        setOpen(true);
    }

    const handleDelete = (id) => {
        props.deleteInsurancePlan(id);
    }

    return (
        (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <Typography className="mt-8 mb-16" variant="h6">
                        Insurance Plan Info
						</Typography>
                </div>

                <Grid container spacing={3} direction="row">
                    {props.insurancePlan && props.insurancePlan.map(row => (
                        <Grid item xs={4}>
                            <Card className="w-full mb-16 rounded-8" key={row.id}>
                                <AppBar position="static" elevation={0}>
                                    <Toolbar className="px-8" variant="dense">
                                        <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
                                            Insurance Plan
										</Typography>
                                        <Tooltip title="Edit">
                                            <IconButton size="medium" onClick={() => handleOpenModalEdit("Edit Insurance Plan", row)} aria-label="delete">
                                                <Icon size="medium">edit</Icon>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton size="small" onClick={() => handleDelete(row.id)} aria-label="delete">
                                                <DeleteIcon size="small" />
                                            </IconButton>
                                        </Tooltip>
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
                                    <button onClick={() => handleOpenModal("Add a New insurance Plan")}>
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

                <InsurancePlanFormDialog
                    open={open}
                    setOpen={setOpen}
                    title={title}
                    newInsurancePlanForm={props.registerNewInsurancePlan}
                    editInsurancePlanForm={props.editInsurancePlan}
                    insurancePlan={{id, setId, memberName, setMemberName, memberId, setMemberId, memberService, setMemberService, effectiveDate, setEffectiveDate, healthPlan, setHealthPlan }} ></InsurancePlanFormDialog>

            </div>
        )
    );
}


export default React.memo(InsurancePlanWidget);