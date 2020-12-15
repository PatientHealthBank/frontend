import Typography from '@material-ui/core/Typography';
import React from 'react';
import PrimaryIconButton from '../../../Components/PrimaryIconButton';
import Icon from '@material-ui/core/Icon';
import { withRouter } from "react-router";


function MembersHeader(props) {
		const handleAddClinic = () =>{
			props.history.push(`/apps/clinic/members/new`);
		}
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h5">
					My Team
					</Typography>
			</div>
			<div className="flex items-right">
				<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h5">
				<PrimaryIconButton onClick={handleAddClinic}>
					<Icon>add</Icon>
				</PrimaryIconButton>
				</Typography>
			</div>
		</div>
	);
}

export default withRouter(MembersHeader);
