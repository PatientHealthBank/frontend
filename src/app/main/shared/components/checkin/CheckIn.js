import Button from '@material-ui/core/Button';
import IconButton  from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import React, { useState } from 'react';
import {  withStyles } from '@material-ui/core/styles';
import { orange, red } from '@material-ui/core/colors';
import CancelDialog from '../CancelDialog'
import CheckInDialog from './CheckInDialog'


const RescheduleButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(orange[500]),
      backgroundColor: orange[500],
      '&:hover': {
        backgroundColor: orange[700],
      },
    },
  }))(IconButton);

  const CancelButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: red[500],
      '&:hover': {
        backgroundColor: red[700],
      },
    },
  }))(IconButton);

  const ConfirmButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: '#24aae0',
      '&:hover': {
        backgroundColor: '#1d8ab5',
      },
    },
  }))(IconButton);

function CheckIn(props) {

    const [ checkin, setCheckin] =  useState(false)
    const [ open, setOpen] =  useState(false)
    const [ finished, setFinished] =  useState(false)

    const [ disableCheckin, setDisableCheckin] =  useState(false)
    const [ openCheckin, setOpenCheckin] =  useState(false)

    const [ confirm, setConfirm] =  useState(false)
    const [ title, setTitle] = useState("")

    const confirmAppointment =()=>{
        setConfirm(true)
        setOpen(true)
    }

    const cancelOrReschedule = (title)=>{
        setTitle(title)
        setConfirm(false)
        setOpen(true)
    }

    const checkInAppointment =()=>{
        setOpenCheckin(true)
    }

	return (<div>
            {!checkin ?
            ( !finished ?<>
            <Tooltip title="Confirm Your Appointment" placement="top">
                <ConfirmButton size="small" variant="contained" disabled={props.disabled} onClick={confirmAppointment} color="secondary" style={{margin:'0 5px'}}> <Icon>check</Icon></ConfirmButton>
            </Tooltip>
            <Tooltip title="Reschedule" placement="top">
                <RescheduleButton size="small" variant="contained" disabled={props.disabled} onClick={()=> cancelOrReschedule("Reschedule")} color="secondary" style={{margin:'0 5px'}} > <Icon>edit</Icon></RescheduleButton>	
            </Tooltip>
               <Tooltip title="Cancel" placement="top">
                 <CancelButton size="small" variant="contained" disabled={props.disabled} onClick={()=> cancelOrReschedule("Cancel")} color="secondary" style={{margin:'0 5px'}}> <Icon>clear</Icon></CancelButton>	
                </Tooltip>
              </>
              :
              <Button variant="contained" color="secondary" disabled style={{borderRadius:'200px', fontSize: '11px'}}>{title==="Reschedule" ? "Rescheduled" : "Canceled"}</Button>)
              :
              <>
              <Button variant="contained" color="secondary" onClick={()=> checkInAppointment()}  disabled={disableCheckin} style={{borderRadius:'200px', fontSize: '11px'}}>{!disableCheckin ? "Check-in" : "Check-in Done"}</Button>
            </>
                }
                <CancelDialog setCheckin={setCheckin} setFinished={setFinished} title={title} open={open} setOpen={setOpen} confirm={confirm} specialty={props.specialty} date={props.date} />
                <CheckInDialog setCheckInDone={setDisableCheckin} open={openCheckin} setOpen={setOpenCheckin} />

            </div>
            );
}

export default React.memo(CheckIn);