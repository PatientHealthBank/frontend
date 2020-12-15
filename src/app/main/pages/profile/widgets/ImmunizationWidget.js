import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useTranslation } from "react-i18next";

function ImmunizationWidget(props) {
	const { t } = useTranslation();

	return (
		<Card className="w-full rounded-8 shadow-1">
			<div className="p-16 px-4 flex flex-row items-center justify-between">
				<Typography className="h1 px-12">{t('My Vaccines')}</Typography>

				<div>
					<IconButton aria-label="more">
						<Icon>more_vert</Icon>
					</IconButton>
				</div>
			</div>

			<table className="simple clickable">
				<thead>
					<tr>
						<th className="text-right">{t('Description')}</th>
						<th className="text-right">{t('Data')}</th>
						<th className="text-right">{t('Location')}</th>
					</tr>
				</thead>
				<tbody>
					{props.data.map(row => (
						<tr key={row.id}>
							<td className="text-right">{t(row.description)}</td>
							<td className="text-right">{t(row.data)}</td>
							<td className="text-right">{t(row.location)}</td>
						</tr>
					))}
				</tbody>
			</table>

			<Divider className="card-divider w-full" />
		</Card>
	);
}

export default React.memo(ImmunizationWidget);