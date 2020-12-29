import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { useForm } from '@fuse/hooks';
import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";

function PatientInformationWidget(props) {
    const { t } = useTranslation();
    const { form, handleChange, setForm } = useForm();
    
    const handleSubmit = () => {
        props.editPatientInformation(form.name, form.birthdate, form.ssn, form.phone, form.email, form.photoURL);
    }

    useEffect(() => {
        if ((props.patientInformation && !form) || (props.patientInformation && form && props.patientInformation.id !== form.id)) {
            setForm(props.patientInformation);
        }
    }, [form, props.patientInformation, setForm]);

    return (
        form && (
            <Grid container spacing={3} alignContent="center" alignItems="center" justify="center" >

                <Grid item xs={6} style={{ textAlign: 'center' }}>
                    <Typography variant="h5">
                        Patient Info
		        </Typography>

                    <img
                        key="1"
                        style={{ display: "inline" }}
                        className="w-128 m-4 rounded-4"
                        src="assets/images/avatars/Velazquez.jpg"
                        alt="Profile"
                    />
                    <TextField
                        className="mt-8 mb-16"
                        required
                        label="Full Name"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Icon className="text-20" color="action">
                                        person
											</Icon>
                                </InputAdornment>
                            )
                        }}
                        fullWidth
                    />

                    <TextField
                        className="mb-16"
                        type="text"
                        disabled={ true }
                        name="email"
                        label="Email"
                        value={form.email}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Icon className="text-20" color="action">
                                        email
								</Icon>
                                </InputAdornment>
                            )
                        }}
                        variant="outlined"
                        required
                        fullWidth
                    />

                    <Grid container className="mb-16" spacing={3}>
                        <Grid item xs>
                            <TextField
                                //type="date"
                                id="birthdate"
                                name="birthdate"
                                label="BirthDate"
                                value={new Date(form.birthdate).toLocaleDateString()}
                                onChange={handleChange}
                                className="mr-8"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Icon className="text-20" color="action">
                                                person
											</Icon>
                                        </InputAdornment>
                                    )
                                }}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                type="text"
                                id="ssn"
                                name="ssn"
                                label="SSN (Last 4 digits)"
                                value={form.ssn}
                                onChange={handleChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Icon className="text-20" color="action">
                                                person
											</Icon>
                                        </InputAdornment>
                                    )
                                }}
                                variant="outlined"
                                required
                                fullWidth
                            />
                        </Grid>

                    </Grid>

                    <div style={{ textAlign: 'center' }}>
                        <Typography variant="h6">
                            Contact Info
								</Typography>
                    </div>
                    <TextField
                        className="mt-8 mb-16"
                        required
                        label="Contact Phone"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        className="mb-16"
                        type="text"
                        name="email"
                        disabled={true}
                        label="Email"
                        value={form.email}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Icon className="text-20" color="action">
                                        email
								</Icon>
                                </InputAdornment>
                            )
                        }}
                        variant="outlined"
                        required
                        fullWidth
                    />
                <Button
                    className="whitespace-no-wrap normal-case float-right"
                    variant="contained"
                    color="secondary"
                    //disabled={canBeNotSubmitted()}
                    onClick={handleSubmit}
                >
                    {t("Save")}
                </Button>
            </Grid>

            </Grid >
        )
    );
}


export default React.memo(PatientInformationWidget);