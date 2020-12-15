import Grid from '@material-ui/core/Grid';
import React, {useState} from 'react';
import withReducer from 'app/store/withReducer';
import reducer from './store';
import Typography from '@material-ui/core/Typography';
import { Doughnut } from 'react-chartjs-2';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

function ProfileStrength() {
	const theme = useTheme();
	
	// eslint-disable-next-line
	const [dataset, setDataset] = useState('Today');

	var strength = {
		id: 'widget7',
		labels: ['Complate', 'Incomplete'],
		datasets: {
			Today: [
				{
					data: [74.0, 26.0],
					change: [-0.6, 0.7]
				}
			],
			Yesterday: [
				{
					data: [77.2, 8.4],
					change: [-2.3, 0.3]
				}
			],
			'Last 7 days': [
				{
					data: [88.2, 9.2],
					change: [1.9, -0.4]
				}
			],
			'Last 28 days': [
				{
					data: [65.2, 2.6],
					change: [-12.6, -0.7]
				}
			],
			'Last 90 days': [
				{
					data: [93.5, 4.2],
					change: [2.6, -0.7]
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
						<Typography className="h1 px-12">Intermediate Level</Typography>
					</div>
				</Grid>

				<Grid item xs={12}>
					<div className="mt-8 mb-32">
						<Typography variant="h6">
							Tasks to improve your profile:
						</Typography>
					</div>

					<div className={classes.root}>

						<Alert severity="warning">
							<AlertTitle>Incompleted</AlertTitle>
        					Complete your family history to improve your profile — <strong>70%</strong>
						</Alert>
						<Alert severity="warning">
							<AlertTitle>Incompleted</AlertTitle>
        					Complete your allergies to improve your profile — <strong>65%</strong>
						</Alert>
						<Alert severity="success">
							<AlertTitle>Completed</AlertTitle>
        					My Immunization History —<strong>100%</strong>
						</Alert>
						<Alert severity="success">
							<AlertTitle>Completed</AlertTitle>
        					Patient Information —<strong>100%</strong>
						</Alert>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}

export default withReducer('ProfilesApp', reducer)(ProfileStrength);
