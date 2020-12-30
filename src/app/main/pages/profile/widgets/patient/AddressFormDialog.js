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
import Select from '@material-ui/core/Select';
import { useTranslation } from "react-i18next";

export default function AlertDialog({ open, setOpen, title, newAddressForm, editAddressForm, addressInformation }) {
    const { t } = useTranslation();

    const { id, setId } = addressInformation;
    const { addressLine1, setAddress } = addressInformation;
    const { addressTypeId, setAddressTypeId } = addressInformation;
    const { country, setCountry } = addressInformation;
    const { city, setCity } = addressInformation;
    const { state, setState } = addressInformation;
    const { zipCode, setZipCode } = addressInformation;

    const handleClose = () => {
        clearState();
        setOpen(false);
    };

    const handleSubmit = () => {

       if (id != null && id > 0)
            editAddressForm(id, parseInt(addressTypeId, 10), addressLine1, country, city, state, zipCode);
        else 
            newAddressForm(parseInt(addressTypeId, 10), addressLine1, country, city, state, zipCode);

        clearState();
        setOpen(false);
    }

    function clearState() {
        setId(null);
        setAddressTypeId("");
        setAddress("");
        setCountry("");
        setCity("");
        setState("");
        setZipCode("");
    }

    const canBeNotSubmitted = () => !addressTypeId || !addressLine1 || !country || !city || !state || !zipCode;

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
                                <FormControl fullWidth variant="outlined" className="mt-8 mb-16">
                                    <InputLabel htmlFor="outlined-age-native-simple">Address Type</InputLabel>
                                    <Select
                                        native
                                        id="addressTypeId"
                                        name="addressTypeId"
                                        value={addressTypeId}
                                        onChange={event => setAddressTypeId(event.target.value)}
                                        label="Address Type"
                                        autoFocus
                                        inputProps={{
                                            name: 'addressType',
                                            id: 'outlined-age-native-simple',
                                        }}
                                    >
                                        <option aria-label="None" value="" />
                                        <option value={1}>Home</option>
                                        <option value={2}>Business</option>
                                        <option value={3}>Other</option>
                                    </Select>
                                </FormControl>

                                <TextField
                                    className="mt-8 mb-8"
                                    required
                                    label={t("Address")}
                                    id="addressLine1"
                                    name="addressLine1"
                                    value={addressLine1}
                                    onChange={event => setAddress(event.target.value)}
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-8"
                                    required
                                    label={t("Country")}
                                    id="country"
                                    name="country"
                                    value={country}
                                    onChange={event => setCountry(event.target.value)}
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-8"
                                    required
                                    label={t("City")}
                                    id="city"
                                    name="city"
                                    value={city}
                                    onChange={event => setCity(event.target.value)}
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-8"
                                    required
                                    label={t("State")}
                                    id="state"
                                    name="state"
                                    value={state}
                                    onChange={event => setState(event.target.value)}
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-8"
                                    required
                                    label={t("ZipCode")}
                                    id="zipCode"
                                    name="zipCode"
                                    value={zipCode}
                                    onChange={event => setZipCode(event.target.value)}
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