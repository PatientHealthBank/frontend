import Grid from '@material-ui/core/Grid';
import React, { useState } from 'react';
import withReducer from 'app/store/withReducer';
import reducer from './store';
import Typography from '@material-ui/core/Typography';
import { Doughnut } from 'react-chartjs-2';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import { getStrength } from '../../shared/store/strengthWidgetSlice'

import { useDispatch, useSelector } from 'react-redux';


function ProfileStrength() {
	const dispatch = useDispatch()
	const strengthParams = useSelector(({ ProfilesApp }) => ProfilesApp.strength);
	console.log(strengthParams)

	React.useEffect(() => {
		if(!strengthParams.total)
			dispatch(getStrength())
	}, [])
	const theme = useTheme();

	// eslint-disable-next-line
	const [dataset, setDataset] = useState('Today');

	var strength = {
		id: 'widget7',
		labels: ['Complate', 'Incomplete'],
		datasets: {
			Today: [
				{
					data: [strengthParams.total, 100 - strengthParams.total],
				}
			]
		},
		options: {
			cutoutPercentage: 75,
			spanGaps: false,
			legend: {
				display: false
			},
			maintainAspectRatio: false
		}
	};

	const useStyles = makeStyles((theme) => ({
		root: {
			width: '100%',
			'& > * + *': {
				marginTop: theme.spacing(2),
			},
		},
	}));

	const classes = useStyles();

	return (
		<div>
			<Grid container spacing={3}>
				<Grid item xs={4}>
					<div className="mt-8 mb-32">
						<Typography variant="h6">
							Profile strength
						</Typography>
					</div>
				</Grid>
				<Grid item>
					<div className="h-224 relative">
						<Doughnut
							data={{
								labels: strength.labels,
								datasets: strength.datasets[dataset].map(obj => ({
									...obj,
									borderColor: theme.palette.divider,
									backgroundColor: [
										theme.palette.primary.main,
										theme.palette.primary.light,
										theme.palette.primary.dark
									],
									hoverBackgroundColor: [
										theme.palette.secondary.dark,
										theme.palette.secondary.main,
										theme.palette.secondary.light
									]
								}))
							}}
							options={strength.options}
						/>
					</div>
					<div className="p-16 flex flex-row items-center justify-center">
						{strengthParams.total  && (!strengthParams.total ||  strengthParams.total < 40 ? 
						(<Typography className="h1 px-12">Basic Level</Typography>)
							:
							strengthParams.total < 60 ? (<Typography className="h1 px-12">Intermediate Level</Typography>):
							(<Typography className="h1 px-12">Advanced Level</Typography>)

					)}
					</div>
				</Grid>
				{strengthParams.total && 
				<Grid item xs={12}>
					<div className="mt-8 mb-32">
						<Typography variant="h6">
							Tasks to improve your profile:
						</Typography>
					</div>

					<div className={classes.root}>

						{strengthParams.strength.medicalHistory == 100 ?
							<Alert severity="success">
								<AlertTitle>Completed</AlertTitle>
								My Medications —<strong>100%</strong>

							</Alert> :
							<Alert severity="warning">
								<AlertTitle>Incompleted</AlertTitle>
								Complete your family history to improve your profile — <strong>{strengthParams.strength.medicalHistory}</strong>
							</Alert>
						}
						{strengthParams.strength.allergies == 100 ?
							<Alert severity="success">
								<AlertTitle>Completed</AlertTitle>
								My Allergies —<strong>100%</strong>

							</Alert> :
							<Alert severity="warning">
								<AlertTitle>Incompleted</AlertTitle>
								Complete your Allergies to improve your profile — <strong>{strengthParams.strength.allergies}</strong>
							</Alert>
						}
						{strengthParams.strength.medication == 100 ?
							<Alert severity="success">
								<AlertTitle>Completed</AlertTitle>
								My Medications —<strong>100%</strong>

							</Alert> :
							<Alert severity="warning">
								<AlertTitle>Incompleted</AlertTitle>
								Complete your Medications to improve your profile — <strong>{strengthParams.strength.medication}</strong>
							</Alert>
						}
						{strengthParams.strength.vaccines == 100 ?
							<Alert severity="success">
								<AlertTitle>Completed</AlertTitle>
								My Immunization History —<strong>100%</strong>

							</Alert> :
							<Alert severity="warning">
								<AlertTitle>Incompleted</AlertTitle>
								Complete your Patient Information to improve your profile — <strong>{strengthParams.strength.vaccines}</strong>
							</Alert>
						}
						{strengthParams.strength.patientInformation == 100 ?
							<Alert severity="success">
								<AlertTitle>Completed</AlertTitle>
        					Patient Information —<strong>100%</strong>
							</Alert> :
							<Alert severity="warning">
								<AlertTitle>Incompleted</AlertTitle>
								Complete your Patient Information to improve your profile — <strong>{strengthParams.strength.patientInformation}</strong>
							</Alert>
						}
					</div>
				</Grid>}
			</Grid>
		</div>
	);
}

export default withReducer('ProfilesApp', reducer)(ProfileStrength);
