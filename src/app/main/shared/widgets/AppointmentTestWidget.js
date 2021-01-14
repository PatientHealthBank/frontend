import React, { useEffect, useState } from 'react';
import CheckIn from '../components/checkin/CheckIn';
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import { selectAppointmentTestWidget, getAppointmentTest } from '../store/appointmentTestSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useDeepCompareEffect, useDebounce } from '@fuse/hooks';
import Moment from 'react-moment';
import { useTranslation } from "react-i18next";

import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

function AppointmentTestWidget(props) {
	const { t } = useTranslation();

	const dispatch = useDispatch();
	const appointmentTest = useSelector(({ AppointmentTestWidgetApp }) => AppointmentTestWidgetApp.appointmentTest);
	const [data, setData] = useState(appointmentTest);
	useEffect(() => {
		setData(appointmentTest);
	}, [dispatch, appointmentTest]);

	useDeepCompareEffect(() => {
		if (appointmentTest.length == 0 && appointmentTest) {
			dispatch(getAppointmentTest());
		}
	}, [dispatch]);

	return (
		<Card className="w-full rounded-8 shadow-1" style={{ height: '359px' }}>
			<div className="p-16 px-4 flex flex-row items-center justify-between">
				<Typography className="h1 px-12">Test Results</Typography>

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
							<th className="text-right">Update File</th>
						</tr>
					</thead>
					<tbody>
						{appointmentTest.map(row => (
							<tr key={row.id}>
								<td className="text-right">{row.name}</td>
								<td className="text-right"><Moment date={row.updateDate}/></td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Divider className="card-divider w-full" />
		</Card>
	);
}

export default withReducer('AppointmentTestWidgetApp', reducer)(AppointmentTestWidget);
