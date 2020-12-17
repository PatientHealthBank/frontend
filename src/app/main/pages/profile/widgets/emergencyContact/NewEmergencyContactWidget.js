import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from 'react-redux';

function NewEmergencyContactWidget(props) {
	const [name, setName] = React.useState('');
	const [phone, setPhone] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [kinship, setKinship] = React.useState('');

	const handleSubmit = () => {
		props.registerNewEmergencyContact(name, phone, email, kinship);
	}
	const canBeNotSubmitted = () => !name || !phone || !email || !kinship;
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
								label={t("Name")}
								id="name"
								name="name"
								value={name}
								onChange={event => setName(event.target.value)}
								fullWidth
							/>
							<TextField
								className="mt-8 mb-8"
								required
								label={t("Phone")}
								id="phone"
								name="phone"
								value={phone}
								onChange={event => setPhone(event.target.value)}
								fullWidth
							/>
							<TextField
								className="mt-8 mb-8"
								required
								label={t("E-mail")}
								id="email"
								name="email"
								value={email}
								onChange={event => setEmail(event.target.value)}
								fullWidth
							/>
							<TextField
								className="mt-8 mb-8"
								required
								label={t("Kinship")}
								id="kinship"
								name="kinship"
								value={kinship}
								onChange={event => setKinship(event.target.value)}
								fullWidth
							/>
							<Button
								className="whitespace-no-wrap normal-case float-right"
								variant="contained"
								color="secondary"
								disabled={canBeNotSubmitted()}
								onClick={handleSubmit}
							>
								{t("Add Emergency Contact")}
							</Button>
						</Grid>
					</Grid>
				</div>

			</ div>
			<Divider className="card-divider w-full" />
		</Card>
	);
}

export default React.memo(NewEmergencyContactWidget);
