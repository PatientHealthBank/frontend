import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from '../../pages/profile/store';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { listEmergencyContact } from '../store/emergencyContactSlice'

function EmergencyContactWidget(props) {
	const { emergencyContact } = useSelector(({ ProfilesApp }) => ProfilesApp);
	const dispatch = useDispatch()
	React.useEffect(() => {
		if (emergencyContact.length == 0) {
			dispatch(listEmergencyContact())
		}
	}, [])
	return (
		<Card className="w-full rounded-8 shadow-1" style={{height:'359px'}}>
			<div className="p-16 px-4 flex flex-row items-center justify-between">
				<Typography className="h1 px-12">My Emergency Contact</Typography>

				<div>
					<IconButton aria-label="more">
						<Icon>more_vert</Icon>
					</IconButton>
				</div>
			</div>
			<div class="overflow-scroll" style={{ height: '278px' }}>

				<table className="simple clickable sticky-table">
					<thead>
						<tr>
							<th className="text-right">Name</th>
							<th className="text-right">Phone</th>
							<th className="text-right">E-mail</th>
							<th className="text-right">Kinship</th>
						</tr>
					</thead>
					<tbody>
						{emergencyContact.map(row => (
							<tr key={row.id}>
								<td className="text-right">{row.name}</td>
								<td className="text-right">{row.phone}</td>
								<td className="text-right">{row.email}</td>
								<td className="text-right">{row.kinship}</td>

							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Divider className="card-divider w-full" />
		</Card>
	);
}

export default withReducer('ProfilesApp', reducer)(EmergencyContactWidget);
