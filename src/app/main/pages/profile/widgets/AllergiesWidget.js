import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useTranslation } from "react-i18next";
import withReducer from 'app/store/withReducer';
import reducer from '../store';
import { listAllergies } from '../store/allergiesSlice'
import { useDispatch, useSelector } from 'react-redux';

function AllergiesWidget(props) {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const allergies = useSelector(({ ProfilesApp }) => ProfilesApp.allergies);

	React.useEffect(() => {
		if (allergies.length == 0) {
			dispatch(listAllergies())
		}
	}, [dispatch])

	return (
		<Card className="w-full rounded-8 shadow-1" style={{height:'359px'}}>
			<div className="p-16 px-4 flex flex-row items-center justify-between">
				<Typography className="h1 px-12">{t('Allergies')}</Typography>
			</div>
			<div class="overflow-scroll" style={{ height: '278px' }}>

				<table className="simple clickable sticky-table">
					<thead>
						<tr>
							<th className="text-right">{t('Description')}</th>
							<th className="text-right">{t('Type')}</th>
							<th className="text-right">{t('Severity')}</th>
						</tr>
					</thead>
					<tbody>
						{allergies.map(row => (
							<tr key={row.id}>
								<td className="text-right">{t(row.allergicTo)}</td>
								<td className="text-right">{t(row.type)}</td>
								<td className="text-right">{t(row.severity)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<Divider className="card-divider w-full" />
		</Card>
	);
}

export default withReducer('ProfilesApp', reducer)(AllergiesWidget);