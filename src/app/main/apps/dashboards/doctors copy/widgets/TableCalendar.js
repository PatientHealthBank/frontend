import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import {Link} from 'react-router-dom'

import _ from '../../dashboard/node_modules/@lodash';
import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { ListItemSecondaryAction } from '@material-ui/core';

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

function TableCalendar(props) {
    const {data, doctorId, clinicId} = props;
    const classes = useStyles(props);
    var itens = [];
    for(let i =0; i < data[0].data.length; i++){
        var first = Math.floor(Math.random() * (4 - 1) + 1);
        var secc = Math.floor(Math.random() * (4 - 1) + 1);
        var thrd = Math.floor(Math.random() * (4 - 1) + 1);
        var fourt = Math.floor(Math.random() * (4 - 1) + 1);
        var link = `/login/${clinicId}/${doctorId}/${data[0].data[i].hour}`
        itens.push(   
                    <tr>
                        { 
                            ( first ==1 ? (<td><Link to={link}>
                            {data[0].data[i].hour}</Link></td>) :
                            ( first==2 ? <td style={{textDecoration:'line-through'}}>{data[0].data[i].hour}</td> :
                                                          <td>----</td>))
                        }   
                        {
                            
                            ( secc==1 ? (<td><Link to={link}>
                            {data[1].data[i].hour}</Link></td>) :
                            ( secc ==2 ? <td style={{textDecoration:'line-through'}}>{data[1].data[i].hour}</td> :
                                                          <td>----</td>))
                        }  
                      {
                            
                            ( thrd ==1 ? (<td><Link to={link}>
                            {data[2].data[i].hour}</Link></td>) :
                            ( thrd ==2 ? <td style={{textDecoration:'line-through'}}>{data[2].data[i].hour}</td> :
                                                          <td>----</td>))
                        }  
                                                {
                            
                            ( fourt ==1 ? (<td><Link to={link}>
                            {data[3].data[i].hour}</Link></td>) :
                            ( fourt ==2 ? <td style={{textDecoration:'line-through'}}>{data[3].data[i].hour}</td> :
                                                          <td>----</td>))
                        }  
                    </tr>)
                    
    }
    console.log(itens)
	return (

					<div className="w-full p-8 min-h-420 h-420" style={{textAlign: '-webkit-center'}} >
						<table className={classes.table} style={{marginLeft:'auto',marginRight:'auto'}}>
							<thead >
								<tr>
									<th>Today</th>
									<th>Tomorow</th>
									<th>Sunday</th>
									<th>Monday</th>
								</tr>
							</thead>
                            <tbody>
                            {itens}
                            </tbody>
					
						</table>
                    </div>
	);
}

export default TableCalendar;