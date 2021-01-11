import React, { useEffect, useState } from 'react';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import { useDeepCompareEffect } from '@fuse/hooks';
import { selectCareTeamWidget, getCareTeamByAppointment } from '../store/careTeamWidgetSlice';
import reducer from '../store';

function CareTeamWidget(props) {
	const dispatch = useDispatch();

	// todor receber estado do componente pai
	const careTeam = useSelector(selectCareTeamWidget);
	const [data, setData] = useState(careTeam);

	useEffect(() => {
		setData(careTeam);
	}, [dispatch, careTeam]);

	useDeepCompareEffect(() => {
		if (careTeam.length === 0 && careTeam) {
			dispatch(getCareTeamByAppointment());
		}
	}, [dispatch]);

	return (
		<Card className="w-full rounded-8 shadow-1" style={{ height: '359px' }}>
			<div className="p-16 px-4 flex flex-row items-center justify-between">
				<Typography className="h1 px-12">Care Team</Typography>

				<div>
					<IconButton aria-label="more">
						<Icon>more_vert</Icon>
					</IconButton>
				</div>
			</div>
			<AvatarGroup max={5}>
				{careTeam
					.sort((a, b) => Date(b.scheduleDate) - Date(a.scheduleDate))
					.slice(0, 4)
					.filter((v, i, a) => a.findIndex(t => t.provider.name === v.provider.name) === i)
					.map(appointment => (
						<Tooltip title={appointment.provider.name} aria-label="add">
							<Avatar class={props.classes.avatar} alt="Remy Sharp" src={appointment.provider.imageUrl} />
						</Tooltip>
					))}
			</AvatarGroup>
		</Card>
	);
}

export default withReducer('CareTeamWidgetApp', reducer)(CareTeamWidget);
