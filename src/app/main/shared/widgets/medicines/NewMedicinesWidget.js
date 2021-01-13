import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useTranslation } from "react-i18next";

function NewMedicinesWidget(props) {
	const[name,setName] =  React.useState('');
	const[dosage,setDosage] =  React.useState('');
	const[frequency,setFrequency] =  React.useState('');
	const[refillStatus,setRefillStatus] =  React.useState(false);

	const handleSubmit = ()=> {
		props.registerNewMedicines(name, dosage, frequency, refillStatus);
		setName('');
		setRefillStatus(false)
		setFrequency('')
		setDosage('')
	}
	const canBeNotSubmitted=()=>!name || !dosage|| !frequency;
	const { t } = useTranslation();
	return (
		<Card className="w-full rounded-8 shadow-1">
			<div className="p-4 px-4 flex flex-row items-center justify-between">
				<Typography className="h3 px-12 font-bold">{t('New Medicine')}</Typography>
			</div>

			<div className="p-16">
				<div>
					<Grid container>
						<Grid item xs={12}>
							<TextField
								className="mt-8 mb-8"
								required
								label={t('Name')}
								id="name"
								name="name"
								value={name}
								onChange={event=>setName(event.target.value)}
								variant="outlined"
								fullWidth
							/>
							<TextField
								className="mt-8 mb-8"
								required
								label={t('Dosage')}
								id="dosage"
								name="dosage"
								value={dosage}
								onChange={event=>setDosage(event.target.value)}
								required
								variant="outlined"
								fullWidth
							/>
							<TextField
								className="mt-8 mb-8"
								required
								label={t('Frequency')}
								id="frequency"
								name="frequency"
								value={frequency}
								onChange={event=>setFrequency(event.target.value)}
								required
								variant="outlined"
								fullWidth
							/>
							<FormControl fullWidth variant="outlined" className="mt-8 mb-16">
								<InputLabel htmlFor="refillStatus">Refill Status</InputLabel>
								<Select
									native
									id="refillStatus"
									name="refillStatus"
									value={refillStatus ? "yes" : "no"}
									required
									// disabled={routeParams.readOnly}
									onChange={event=>setRefillStatus(event.target.value == "yes")}
									label={t('refillStatus')}
									inputProps={{
										name: 'refillStatus',
										id: 'refillStatus',
									}}
								>
									<option value={"yes"}>{t('Yes')}</option>
									<option value={"no"}>{t('No')}</option>
								</Select>
							</FormControl>
							<Button
								className="whitespace-no-wrap normal-case float-right"
								variant="contained"
								color="secondary"
							    disabled={canBeNotSubmitted()}
								onClick={handleSubmit}
							>
								{t('Add Medicine')}
							</Button>
						</Grid>
					</Grid>
				</div>

			</ div>
			<Divider className="card-divider w-full" />
		</Card>
	);
}

export default React.memo(NewMedicinesWidget);
