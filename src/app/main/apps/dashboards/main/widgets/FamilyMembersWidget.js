import React from 'react';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useDeepCompareEffect } from '@fuse/hooks';
import { selectFamilyMembers, geFamilyMembers } from '../store/FamilyMemberWidgetSlice';
import reducer from '../store';

function FamilyMembersWidget(props) {
	const dispatch = useDispatch();

	const familyMembers = useSelector(selectFamilyMembers);
	useDeepCompareEffect(() => {
		if (familyMembers && familyMembers.length === 0) {
			dispatch(geFamilyMembers());
		}
	}, [dispatch]);

	return (
		<Card className="w-full rounded-8 shadow-1" style={{ height: '359px' }}>
			<div className="p-16 px-4 flex flex-row items-center justify-between">
				<Typography className="h1 px-12">Family Members</Typography>

				<div>
					<IconButton aria-label="more">
						<Icon>more_vert</Icon>
					</IconButton>
				</div>
			</div>

			<div className="w-full p-8 min-h-420 h-420">
				<TableContainer style={{ height: '278px' }}>
					<Table aria-label="simple table sticky-table">
						<TableHead>
							<TableRow>
								<TableCell align="center">Name</TableCell>
								<TableCell align="center">Address</TableCell>
								<TableCell align="center">Phone</TableCell>
								<TableCell align="center">Relationship</TableCell>
								<TableCell align="center">Date of Birth</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{familyMembers.map(member => (
								<TableRow>
									<TableCell align="center">{member.name}</TableCell>
									<TableCell align="center">{member.address}</TableCell>
									<TableCell align="center">{member.phone}</TableCell>
									<TableCell align="center">{member.relationship}</TableCell>
									<TableCell align="center">{member.birthdate}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</Card>
	);
}

export default withReducer('FamilyMembersWidgetApp', reducer)(FamilyMembersWidget);
