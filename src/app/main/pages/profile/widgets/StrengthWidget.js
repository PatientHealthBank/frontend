import _ from '@lodash';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import withReducer from 'app/store/withReducer';
import { getStrength } from '../store/strengthSlice'
import reducer from '../store';

import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';


function StrengthWidget(props) {
	const theme = useTheme();
	 // eslint-disable-next-line 
	const [dataset, setDataset] = useState('Today');
	const dispatch = useDispatch();

	const strengthParams = useSelector(({ ProfilesApp }) => ProfilesApp.strength);

	React.useEffect(() => {
		if(!strengthParams.total)
			dispatch(getStrength())
	}, [])

	const handleStrengthNavigate = ()=>{
		props.history.push(	"/pages/profile/profile-strength");
	}
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
			cutoutPercentage: strengthParams.total,
			spanGaps: false,
			legend: {
				display: false
			},
			maintainAspectRatio: false
		}
	};

	return (
		<Card className="w-full rounded-8 shadow-1" style={{height:'359px'}}>
			<div className="p-16 px-4 flex flex-row items-center justify-between">
				<Typography className="h1 px-12">Profile strength</Typography>

				<div>
					<IconButton aria-label="more">
						<Icon>more_vert</Icon>
					</IconButton>
				</div>
			</div>

			<div className="h-180 relative">
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
				{/* {data.labels.map((label, index) => (
					<div key={label} className="px-16 flex flex-col items-center">
						<Typography className="h4" color="textSecondary">
							{label}
						</Typography>
						<Typography className="h2 font-300 py-8">{data.datasets[dataset][0].data[index]}%</Typography>

						<div className="flex flex-row items-center justify-center">
							{data.datasets[dataset][0].change[index] < 0 && (
								<Icon className="text-18 text-red">arrow_downward</Icon>
							)}

							{data.datasets[dataset][0].change[index] > 0 && (
								<Icon className="text-18 text-green">arrow_upward</Icon>
							)}
							<div className="h5 px-4">{data.datasets[dataset][0].change[index]}%</div>
						</div>
					</div>
				))} */}
			</div>

			<Divider className="mx-16" />

			<div className="p-16 flex flex-row items-center justify-between">
				<Typography>
					<a onClick={handleStrengthNavigate} style={{cursor: "pointer"}}>
						Complete your profile to increase your percentage
  					</a>
				</Typography>
			</div>
		</Card>
	);
}
export default  withReducer('ProfilesApp', reducer)(withRouter(StrengthWidget));

