import Typography from '@material-ui/core/Typography';
import { useForm, useDeepCompareEffect, useDebounce } from '@fuse/hooks';
import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Divider } from '@material-ui/core';
import phbApi from 'app/services/phbApi';
import reducer from './store';
import { getParametersList, updateParameter, updateStatusParameter } from './store/parameterSlice';



function NotificationSettings(props) {
	const dispatch = useDispatch();
	const categories = useSelector(({ ProfilesApp }) => ProfilesApp.parameters);

	useDeepCompareEffect(() => {
		function updateProfileState() {}

		updateProfileState();
	}, [dispatch]);

	function handleChange(parameter, value) {
		dispatch(updateParameter(parameter));
		dispatch(
			updateStatusParameter({ userId: parameter.userId, name: parameter.name, isActive: !parameter.isActive })
		);
	}
	useEffect(() => {
		dispatch(getParametersList());
	}, []);
	return (
		categories.data && (
			<div className="p-16 sm:p-24">
				<div className="mt-8 mb-32" style={{ textAlign: 'center' }}>
					<Typography variant="h4">Types Of Notification</Typography>
				</div>
				<div>
					<Grid container spacing={3} alignContent="center" direction="column">
						<div style={{ textAlign: 'center' }}>
							<Typography variant="h6"></Typography>
						</div>
						<Grid item xs={4}>
							{categories.data.map((parameter, parameterIndex) => (
								<div>
									<FormControlLabel
										className="mt-8 mb-16"
										control={
											<Switch
												onChange={e => handleChange(parameter, parameter.isActive)}
												checked={parameter.isActive}
												id={parameter.name}
												name={parameter.name}
											/>
										}
										label={parameter.name}
									/>
								</div>
							))}
						</Grid>
					</Grid>
				</div>
			</div>
		)
	);
	// }
}

export default withReducer('ProfilesApp', reducer)(NotificationSettings);
