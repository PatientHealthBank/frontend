import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useTranslation } from "react-i18next";
import {listVaccines} from '../store/vaccinesSlice'
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from '../store';

function ImmunizationWidget(props) {
	const { t } = useTranslation();
	const {vaccines} = useSelector(( {ProfilesApp} ) => ProfilesApp);
	const dispatch = useDispatch()
	React.useEffect(()=>{
		if(vaccines.length == 0){
			dispatch(listVaccines())
		}
	},[])
	return (
		<Card className="w-full rounded-8 shadow-1" style={{height:'359px'}} >
			<div className="p-16 px-4 flex flex-row items-center justify-between">
				<Typography className="h1 px-12">{t('My Vaccines')}</Typography>

				<div>
					<IconButton aria-label="more">
						<Icon>more_vert</Icon>
					</IconButton>
				</div>
			</div>
			<div class="overflow-scroll" style={{height:'278px'}}>
				<table className="simple clickable sticky-table">
					<thead>
						<tr>
							<th className="text-right">{t('Description')}</th>
							<th className="text-right">{t('Data')}</th>
							<th className="text-right">{t('Location')}</th>
						</tr>
					</thead>
					<tbody>
						{vaccines.map(row => (
							<tr key={row.id}>
								<td className="text-right">{t(row.description)}</td>
								<td className="text-right">{new Date(row.date).toLocaleDateString()}</td>
								<td className="text-right">{t(row.location)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>


			<Divider className="card-divider w-full" />
		</Card>
	);
}
export default withReducer('ProfilesApp', reducer)(ImmunizationWidget);