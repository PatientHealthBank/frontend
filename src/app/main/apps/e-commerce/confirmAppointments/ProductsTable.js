import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '../../dashboards/confirm-appointments/node_modules/@lodash';
import Icon from '@material-ui/core/Icon';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	table:{
		margin:"15px",
			'& tr': {
				'& th, td': {
					paddingLeft: '10px',
					paddingRight: '10px',
					textAlign:"center",
					paddingBottom: '10px',
		
	
			}
	}

}
}));

function ProductsTable(props) {
	const classes = useStyles(props);

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
			<div className="w-full" style={{display:"inline-flex", marginBottom:"10px"}}>
				<div className="flex items-center justify-between px-16 py-16 border-b-1">
					<div style={{fontSize:'19px'}}></div>
					<div className="items-center">
						
					</div>
				</div>
				<div className="flex flex-row">
					<div className="w-full md:w-3/12 p-8 min-h-420 h-420">
						
						<div style={{textAlign:'center', verticalAlign:"middle"}}>
						{/* {x.gender == "m" ? 
							(<img src="assets/images/avatars/doctor-male.png" style={{    display: 'block',marginLeft: 'auto',
								marginRight: 'auto',
								width: '50%',
								alignSelf: 'center',
								marginBottom: '10px'}} alt="Logo"/>):
								(<img src="assets/images/avatars/doctor-female.png" style={{    display: 'block',marginLeft: 'auto',
								marginRight: 'auto',
								width: '50%',
								alignSelf: 'center',
								marginBottom: '10px'}} alt="Logo"/>)
						} */}
			
					<div style={{display:"inline-flex", color:'green'}}>	<Icon>camera_alt</Icon>	<div style={{marginLeft:'10px'}}>Telemedicine</div></div></div>
					</div>
					<div className="flex w-full md:w-7/12 flex-wrap p-8">
						<div>
		<div style={{fontSize:'revert', paddingTop:"5px", paddingBottom:'5px'}}></div>	
		<img src="assets/images/stars/2stars.png" alt="Logo"/>
						</div>
					</div>
				</div>
			</div>
			</FuseScrollbars>
		</div>
	);
}

export default withRouter(ProductsTable);
