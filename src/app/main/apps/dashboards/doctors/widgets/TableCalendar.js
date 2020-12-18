import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import {setConfirmAppointment} from '../store/confirmAppointmentSlice'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles(theme => ({
    table: {
        margin: "15px",
        '& tr': {
            '& th, td': {
                paddingLeft: '10px',
                paddingRight: '10px',
                textAlign: "center",
                paddingBottom: '10px',
            },
            '& th': {
                position: '-webkit-sticky', // this is for all Safari (Desktop & iOS), not for Chrome
                position: 'sticky',
                top: 0,
                zIndex: 5
            }
        }

    }
}));

function TableCalendar(props) {
    const { provider, clinic } = props;
    const dispatch = useDispatch()
    const { startJob, endJob, appointmentInterval } = provider
    const today = new Date();
    const user = useSelector(({ auth }) => auth.user);
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    function eventHour(day, startJob, i) {
        if (!day) {
            return startJob + i > new Date().getHours()
        }
        else {
            return true
        }
    }

    function handleConfirmAppointment(jobHour, jobDay){
        var modelConfirmAppointment = {
            jobHour,
            jobDay: jobDay.toDateString(),
            clinic,
            provider
        }
        dispatch(setConfirmAppointment(modelConfirmAppointment))

        if(!user.role.lenght){
            props.history.push('/login')
        }
        else{
            props.history.push('/confirm-appointment')  
        }

    }
    const classes = useStyles(props);
    var itens = [];
    for (let i = 0; i < (endJob.hours - startJob.hours) / appointmentInterval; i++) {
        itens.push(
            <tr>
                {
                    (eventHour(0, startJob.hours, i) ? (<td ><a  onClick={()=>handleConfirmAppointment(`${(startJob.hours + i).toString().padStart(2, 0)}:00`,today)} style={{ backgroundColor: "aliceblue", padding: "5px" ,cursor: 'pointer'}}>
                        {`${(startJob.hours + i).toString().padStart(2, 0)}:00`}</a></td>) :
                        (<td style={{ padding: "5px" }}>----</td>))
                }
                {
                    (eventHour(1, startJob.hours, i) ? (<td><a  onClick={()=>handleConfirmAppointment(`${(startJob.hours + i).toString().padStart(2, 0)}:00`,today.addDays(1))} style={{ backgroundColor: "aliceblue", padding: "5px" ,cursor: 'pointer'}}>
                        {`${(startJob.hours + i).toString().padStart(2, 0)}:00`}</a></td>) :
                        (<td style={{ padding: "5px" }}>----</td>))
                }
                {
                    (eventHour(2, startJob.hours, i) ? (<td><a onClick={()=>handleConfirmAppointment(`${(startJob.hours + i).toString().padStart(2, 0)}:00`,today.addDays(2))} style={{ backgroundColor: "aliceblue", padding: "5px" ,cursor: 'pointer'}}>
                        {`${(startJob.hours + i).toString().padStart(2, 0)}:00`}</a></td>) :
                        (<td style={{ padding: "5px" }}>----</td>))
                }
                {
                    (eventHour(3, startJob.hours, i) ? (<td><a   onClick={()=>handleConfirmAppointment(`${(startJob.hours + i).toString().padStart(2, 0)}:00`,today.addDays(3))} style={{ backgroundColor: "aliceblue", padding: "5px" ,cursor: 'pointer'}}>
                        {`${(startJob.hours + i).toString().padStart(2, 0)}:00`}</a></td>) :
                        (<td style={{ padding: "5px" }}> ----</td>))
                }
                {
                    (eventHour(4, startJob.hours, i) ? (<td><a   onClick={()=>handleConfirmAppointment(`${(startJob.hours + i).toString().padStart(2, 0)}:00`,today.addDays(4))} style={{ backgroundColor: "aliceblue", padding: "5px" ,cursor: 'pointer'}}>
                        {`${(startJob.hours + i).toString().padStart(2, 0)}:00`}</a></td>) :
                        (<td style={{ padding: "5px" }}>----</td>))
                }
                {
                    (eventHour(5, startJob.hours, i) ? (<td><a   onClick={()=>handleConfirmAppointment(`${(startJob.hours + i).toString().padStart(2, 0)}:00` ,today.addDays(5))} style={{ backgroundColor: "aliceblue", padding: "5px",cursor: 'pointer' }}>
                        {`${(startJob.hours + i).toString().padStart(2, 0)}:00`}</a></td>) :
                        (<td style={{ padding: "5px" }}>----</td>))
                }
            </tr>)

    }
    return (

        <div className="w-full p-8" style={{ textAlign: '-webkit-center', overflow:'auto'}} >
               <table className={classes.table} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <thead >
                    <tr>
                        <th>
                            <div>{daysOfWeek[today.getDay()]}</div>
                            <div>{`${today.getDate()}/${today.getMonth()}`}</div>
                        </th>
                        <th>
                            <div>{daysOfWeek[today.addDays(1).getDay()]}</div>
                            <div> 
                                {`${today.addDays(1).getDate()}/${today.addDays(1).getMonth()}`}
                            </div>
                            
                         </th>
                        <th>
                            <div>{daysOfWeek[today.addDays(2).getDay()]}</div>

                            <div>{`${today.addDays(2).getDate()}/${today.addDays(2).getMonth()}`}</div>
                            
                            </th>
                        <th>
                         <div>{daysOfWeek[today.addDays(3).getDay()]}</div>

                            <div>{`${today.addDays(3).getDate()}/${today.addDays(3).getMonth()}`}</div>   
                            </th>
                        <th>
                            <div>{daysOfWeek[today.addDays(4).getDay()]}</div>

                            <div>{`${today.addDays(4).getDate()}/${today.addDays(4).getMonth()}`}</div>
                            
                            </th>
                        <th>
                            <div>{daysOfWeek[today.addDays(5).getDay()]}</div>

                            <div>{`${today.addDays(5).getDate()}/${today.addDays(5).getMonth()}`}</div>
                            
                            </th>

                    </tr>
                </thead>
                <tbody>
                    {itens}
                </tbody>

            </table>
        </div>
    );
}

export default withRouter(TableCalendar);