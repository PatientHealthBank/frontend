import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import TableCalendar from './TableCalendar'

import _ from '@lodash';
import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';

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

function Widget5(props) {



	return (
    <div style={{fontSize:'20px', paddingTop:"5px", paddingBottom:'5px'}}><strong>{props.children}</strong></div>	
	);
}

export default React.memo(Widget5);