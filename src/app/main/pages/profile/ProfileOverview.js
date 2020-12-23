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
					<StrengthWidget  />
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
