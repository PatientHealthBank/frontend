import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { useTranslation } from "react-i18next";
import { DatePicker } from '@material-ui/pickers';
import { useSelector, useDispatch } from 'react-redux';

export default function AlertDialog({ open, setOpen, title, newInsurancePlanForm, editInsurancePlanForm, insurancePlan}) {
    const { t } = useTranslation();
    const currentLanguageId = useSelector(({ i18n }) => i18n.language);

    const { id, setId } = insurancePlan;
    const { memberName, setMemberName } = insurancePlan;
    const { memberId, setMemberId } = insurancePlan;
    const { memberService, setMemberService } = insurancePlan;
    const { effectiveDate, setEffectiveDate } = insurancePlan;
    const { healthPlan, setHealthPlan } = insurancePlan;

    const handleClose = () => {
        clearState();
        setOpen(false);
    };

    const handleSubmit = () => {

        if (id != null && id > 0)
            editInsurancePlanForm(id, memberName, memberId, memberService, effectiveDate, healthPlan);
        else
            newInsurancePlanForm(memberName, memberId, memberService, effectiveDate, healthPlan);

        clearState();
        setOpen(false);
    }

    const canBeNotSubmitted = () => !memberName || !memberId || !memberService || !effectiveDate || !healthPlan;

    function clearState() {
        setId(null);
        setMemberName("");
        setMemberId("");
        setMemberService("");
        setEffectiveDate(new Date());
        setHealthPlan("");
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <FormControl fullWidth variant="outlined" className="mt-8 mb-16">
                            <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>

                            <Grid item xs={12}>
                                <TextField
                                    className="mt-8 mb-8"
                                    required
                                    label={t("MemberName")}
                                    id="memberName"
                                    name="memberName"
                                    value={memberName}
                                    onChange={event => setMemberName(event.target.value)}
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-8"
                                    required
                                    label={t("MemberId")}
                                    id="memberId"
                                    name="memberId"
                                    value={memberId}
                                    onChange={event => setMemberId(event.target.value)}
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-8"
                                    required
                                    label={t("MemberService")}
                                    id="memberService"
                                    name="memberService"
                                    value={memberService}
                                    onChange={event => setMemberService(event.target.value)}
                                    fullWidth
                                />

                                <DatePicker
                                    label={t("Date")}
                                    value={effectiveDate}
                                    onChange={setEffectiveDate}
                                    animateYearScrolling
                                    className="mt-8 mb-8"
                                    fullWidth
                                    format={currentLanguageId == "en" ? "MM/DD/yyyy" : "DD/MM/yyyy"}
                                />

                                <TextField
                                    className="mt-8 mb-8"
                                    required
                                    label={t("HealthPlan")}
                                    id="healthPlan"
                                    name="healthPlan"
                                    value={healthPlan}
                                    onChange={event => setHealthPlan(event.target.value)}
                                    fullWidth
                                />

                            </Grid>

                        </FormControl>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
          </Button>
                    <Button
                        disabled={canBeNotSubmitted()}
                        onClick={handleSubmit}
                        color="primary"
                        autoFocus>
                        Save
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}