import Typography from '@material-ui/core/Typography';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
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
import { getParametersList, updateStatusParameter, updateParameter } from './store/parameterSlice';

function NotificationSettings(props) {
	const dispatch = useDispatch();
	const categories = useSelector(({ ProfilesApp }) => ProfilesApp.parameters);

	const { form, setForm, setInForm } = useForm(null);
	const routeParams = useParams();

	function handleChange(e, formIndex, parameterIndex, isActive, name) {
		e.persist();

		isActive = !isActive;
		console.log(isActive);
		console.log('categoria', categories);
		categories[formIndex].parameters[parameterIndex].isActive = !isActive;
		setForm(categories)



		dispatch(updateStatusParameter({ isActive, formIndex, parameterIndex, name }));
	}

	useDeepCompareEffect(() => {
		function updateProfileState() {
			const { clinicId } = routeParams;
			dispatch(getParametersList(routeParams));
		}

		updateProfileState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (categories) {
			setForm(categories);
		}
	}, [form, categories, setForm]);

	return (
		form && (
			<div className="p-16 sm:p-24">
				<div className="mt-8 mb-32" style={{ textAlign: 'center' }}>
					<Typography variant="h4">Types Of Notification</Typography>
				</div>
				{form.map((category, formIndex) => (
					<div>
						<Grid container spacing={3} alignContent="center" direction="column">
							<div style={{ textAlign: 'center' }}>
								<Typography variant="h6">{category.category}</Typography>
							</div>
							<Grid item xs={4}>
								{category.parameters.map((parameter, parameterIndex) => (
									<div>
										<FormControlLabel
											className="mt-8 mb-16"
											control={
												<Switch
													checked={form[formIndex].parameters[parameterIndex].isActive}
													value={parameter.isActive}
													id={parameter.id}
													name={parameter.name}
													onChange={e =>
														handleChange(
															e,
															formIndex,
															parameterIndex,
															form[formIndex].parameters[parameterIndex].isActive,
															parameter.name
														)
													}
												/>
											}
											label={parameter.name}
										/>
									</div>
								))}
							</Grid>
						</Grid>
					</div>
				))}
			</div>
		)
	);
	// }
}

export default withReducer('ProfilesApp', reducer)(NotificationSettings);
