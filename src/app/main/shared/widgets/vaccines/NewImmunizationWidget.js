import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useTranslation } from "react-i18next";
import { DatePicker } from '@material-ui/pickers';
import { useSelector, useDispatch } from 'react-redux';

function NewImmunizationWidget(props) {
	const [description, setDescription] = React.useState('');
	const [selectedDate, handleDateChange] = React.useState(new Date());
	const [location, setLocation] = React.useState('');
	const handleSubmit = () => {
		props.registerNewImmunization(description, selectedDate, location);
	}
	const canBeNotSubmitted = () => !description || !selectedDate || !location;
	const { t } = useTranslation();
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);

	return (
		<Card className="w-full rounded-8 shadow-1">
			<div className="p-4 px-4 flex flex-row items-center justify-between">
				<Typography className="h3 px-12 font-bold">{t('New Immunization')}</Typography>
			</div>
			<div className="p-16">
				<div>
					<Grid container>
						<Grid item xs={12}>
							<TextField
								className="mt-8 mb-8"
								required
								label={t("Description")}
								id="description"
								name="description"
								value={description}
								onChange={event => setDescription(event.target.value)}
								fullWidth
							/>
							<DatePicker
								label={t("Date")}
								value={selectedDate}
								onChange={handleDateChange}
								animateYearScrolling
								className="mt-8 mb-8"
								fullWidth
								format={currentLanguageId=="en"?"MM/DD/yyyy":"DD/MM/yyyy"}
							/>
							<TextField
								className="mt-8 mb-8"
								required
								label={t("Location")}
								id="location"
								name="location"
								value={location}
								onChange={event => setLocation(event.target.value)}
								fullWidth
							/>
							<Button
								className="whitespace-no-wrap normal-case float-right"
								variant="contained"
								color="secondary"
								disabled={canBeNotSubmitted()}
								onClick={handleSubmit}
							>
								{t("Add Vaccine")}
							</Button>
						</Grid>
					</Grid>
				</div>

			</ div>
			<Divider className="card-divider w-full" />
		</Card>
	);
}

export default React.memo(NewImmunizationWidget);
