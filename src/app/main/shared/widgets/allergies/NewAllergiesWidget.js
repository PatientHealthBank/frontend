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

function NewAllergiesWidget(props) {
	const[allergicTo,setAllergicTo] =  React.useState('');
	const[ageOfOnset,setAgeOfOnset] =  React.useState('');
	const[type,setType] =  React.useState('');
	const[severity,setSeverity] =  React.useState('');
	const handleSubmit = ()=> {
		props.registerNewAllergies(allergicTo, ageOfOnset, type, severity);
	}
	const canBeNotSubmitted=()=>!allergicTo || !ageOfOnset|| !type || !severity;
	const { t } = useTranslation();
	return (
		<Card className="w-full rounded-8 shadow-1">
			<div className="p-4 px-4 flex flex-row items-center justify-between">
				<Typography className="h3 px-12 font-bold">{t('New Allergy')}</Typography>
			</div>

			<div className="p-16">
				<div>
					<Grid container>
						<Grid item xs={12}>
							<TextField
								className="mt-8 mb-8"
								required
								label={t('Allergic to')}
								id="allergicTo"
								name="allergicTo"
								value={allergicTo}
								onChange={event=>setAllergicTo(event.target.value)}
								variant="outlined"
								fullWidth
							/>
							<TextField
								className="mt-8 mb-8"
								required
								label={t('Age of Onset')}
								id="ageOfOnset"
								name="ageOfOnset"
								inputProps={{
									maxlength: 3
								  }}
								value={ageOfOnset}
								onChange={event=>setAgeOfOnset(event.target.value.replace(/[^0-9]/g, ''))}
								required
								variant="outlined"
								fullWidth
							/>
							<FormControl fullWidth variant="outlined" className="mt-8 mb-16">
								<InputLabel htmlFor="outlined-age-native-simple">Type</InputLabel>
								<Select
									native
									id="type"
									name="type"
									value={type}
									// disabled={routeParams.readOnly}
									onChange={event=>setType(event.target.value)}
									label={t('Type')}
									inputProps={{
										name: 'type',
										id: 'outlined-age-native-simple',
									}}
								>
									<option aria-label="None" value="" />
									<option value={"Drug Allergies"}>{t('Drug Allergies')}</option>
									<option value={"Latex Allergies"}>{t('Latex Allergies')}</option>
									<option value={"Food Allergies"}>{t('Food Allergies')}</option>
									<option value={"Animals Allergies"}>{t('Animals Allergies')}</option>
									<option value={"Plants Allergies"}>{t('Plants Allergies')}</option>
									<option value={"Environmental Allergies"}>{t('Environmental Allergies')}</option>
									<option value={"Other Allergies"}>{t('Other Allergies')}</option>
								</Select>
							</FormControl>
							<FormControl fullWidth variant="outlined" className="mt-8 mb-16">
								<InputLabel htmlFor="outlined-age-native-simple">Severity</InputLabel>
								<Select
									native
									id="severity"
									name="severity"
									value={severity}
									// disabled={routeParams.readOnly}
									onChange={event=>setSeverity(event.target.value)}
									label={t('Severity')}
									inputProps={{
										name: 'severity',
										id: 'outlined-age-native-simple',
									}}
								>
									<option aria-label="None" value="" />
									<option value={"Severe"}>{t('Severe')}</option>
									<option value={"Moderate"}>{t('Moderate')}</option>
									<option value={"Mild"}>{t('Mild')}</option>
								</Select>
							</FormControl>
							<Button
								className="whitespace-no-wrap normal-case float-right"
								variant="contained"
								color="secondary"
							    disabled={canBeNotSubmitted()}
								onClick={handleSubmit}
							>
								{t('Add Allergy')}
							</Button>
						</Grid>
					</Grid>
				</div>

			</ div>
			<Divider className="card-divider w-full" />
		</Card>
	);
}

export default React.memo(NewAllergiesWidget);
