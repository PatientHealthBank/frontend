import Grid from '@material-ui/core/Grid';
import React from 'react';
import withReducer from 'app/store/withReducer';
import AllergiesWidget from './widgets/AllergiesWidget';
import MedicinesWidget from './widgets/MedicinesWidget';
import StrengthWidget from './widgets/StrengthWidget';
import ImmunizationWidget from './widgets/ImmunizationWidget';

function ProfileOverview() {

	var allergies = [
		{
			id: '1',
			description: 'Amoxicillin',
			type: 'Drugs Allergy'
		},
		{
			id: '2',
			description: 'Penicillin',
			type: 'Drugs Allergy'
		},
		{
			id: '3',
			description: 'Milk',
			type: 'Food Allergy'
		},
		{
			id: '4',
			description: 'Peanuts',
			type: 'Food Allergy'
		}
	];

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

	const takenVaccines = [
		{
			id: '1',
			description: 'Hepatitis B',
			date: '10/02/2016',
			location: 'Brazil'
		},
		{
			id: '2',
			description: 'Yellow Fever',
			date: '10/05/2012',
			location: 'Brazil'
		},
		{
			id: '3',
			description: 'Diphtheria',
			date: '24/08/2017',
			location: 'Brazil'
		},
		{
			id: '4',
			description: 'Tetanus',
			date: '13/06/2010',
			location: 'Brazil'
		}
	];
	return (
		<div>
			<div className="flex-1 lg:px-12">
				<h1>Profile Overview</h1>
			</div>
			<Grid container spacing={3}>
				<Grid item xs={6} >
					<AllergiesWidget data={allergies} />
				</Grid>
				<Grid item xs={6} >
					<StrengthWidget data={strength} />
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<ImmunizationWidget/>
					{/* <VaccinesTakenWidget data={takenVaccines} /> */}
				</Grid>
				<Grid item xs={6}>
					<MedicinesWidget />
				</Grid>
			</Grid>
		</div>
	);
}

export default ProfileOverview;
