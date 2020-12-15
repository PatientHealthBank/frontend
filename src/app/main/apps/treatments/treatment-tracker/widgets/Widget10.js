import Card from '@material-ui/core/Card';
import React from 'react';

function Widget10(props) {
	return (
		<Card className="rounded-8 shadow-1">
			{/* <div className="p-16 px-4 flex flex-row items-center justify-between">
				<Typography className="h1 px-12">Goals</Typography>
			</div> */}

			<table className="simple clickable">
				{/* <thead>
					<tr>
						<th aria-label="title" >Activities</th>
						<th className="text-right">Minutes</th> 
					</tr>
				</thead> */}
				<tbody>
					{props.data.rows.map(row => (
						<tr key={row.title}>
							<td>{row.title}</td>
							<td className="text-right">{row.clicks}</td>
						</tr>
					))}
				</tbody>
			</table>
		</Card>
	);
}

export default React.memo(Widget10);
