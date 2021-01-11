import React, { useEffect, useState } from 'react';
import CheckIn from '../components/CheckIn';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import { getMedicalHistory } from '../store/medicalHistorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useDeepCompareEffect, useDebounce } from '@fuse/hooks';

import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

function MedicalHistoryWidget(props) {
	
	const dispatch = useDispatch();
	const medicalHistory = useSelector(({ MedicalHistoryWidgetApp }) => MedicalHistoryWidgetApp.medicalHistory);
	const [data, setData] = useState(medicalHistory);
	useEffect(() => {
		setData(medicalHistory);
	}, [dispatch, medicalHistory]);

	useDeepCompareEffect(() => {
		if (medicalHistory.length == 0 && medicalHistory) {
			dispatch(getMedicalHistory());
		}
	}, [dispatch]);

	return (
		<Card className="w-full rounded-8 shadow-1" style={{ height: '359px' }}>
			<div className="p-16 px-4 flex flex-row items-center justify-between">
				<Typography className="h1 px-12">Medical History</Typography>

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
							<th className="text-right">Description</th>
							<th className="text-right">Creation Date</th>
							<th className="text-right">Status</th>
						</tr>
					</thead>
					<tbody>
						{medicalHistory.map(row => (
							<tr key={row.id}>
								<td className="text-right">{row.intakeForm.description}</td>
								<td className="text-right">{new Date(row.creationDate).toLocaleDateString()}</td>
								<td className="text-right">{row.pending ? 'Pending' : new Date(row.answerdate).toLocaleDateString()}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Divider className="card-divider w-full" />
		</Card>
	);
}

export default withReducer('MedicalHistoryWidgetApp', reducer)(MedicalHistoryWidget);
