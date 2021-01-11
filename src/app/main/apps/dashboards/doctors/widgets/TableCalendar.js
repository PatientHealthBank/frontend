import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import {setConfirmAppointment} from '../store/confirmAppointmentSlice'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'

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

    const { provider, clinic, events } = props;
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
    var eventsProvider = events.filter(event => event.providerId === provider.id);

     function availableTime(day, i) {
            
            var date = today.addDays(day);
            var hour = `${(startJob.hours + i).toString().padStart(2, 0)}`;
            date = date.getFullYear()+''+date.getMonth()+''+date.getDate()+''+ hour;

            if (
                setArrayAvailableTime().indexOf(date) != -1 
                || (startJob.hours + i < new Date().getHours() && !day)
                ){
                return false;
            }else{  
                return true;
            }
        
    }

    function setArrayAvailableTime(){

        var arraDateAvailableTime = [];

        eventsProvider.map(function(value, i) {
            var date = new Date(value.eventDate);
            var endTimeEvent = new Date(date.getTime() + (value.duration - 1)*60000); 
            
            var hourStartEvent = date.getHours().toString().padStart(2, 0);
            var hourEndEvent = endTimeEvent.getHours().toString().padStart(2, 0);

            var timeStartEvent = date.getFullYear()+''+date.getMonth()+''+date.getDate()+''+hourStartEvent;
            var timeEndEvent = date.getFullYear()+''+date.getMonth()+''+date.getDate()+''+hourEndEvent;

            if(timeStartEvent < timeEndEvent){
                arraDateAvailableTime.push(date.getFullYear()+''+date.getMonth()+''+endTimeEvent.getDate()+''+hourEndEvent);
            }

            arraDateAvailableTime.push(date.getFullYear()+''+date.getMonth()+''+date.getDate()+''+hourStartEvent);

        });

        return arraDateAvailableTime;
    }

    function handleConfirmAppointment(jobHour, jobDay){
        var modelConfirmAppointment = {
            jobHour,
            jobDay: jobDay.toDateString(),
            clinic,
            provider,
            events
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

    var momentStartJob = moment(startJob,'hh:mm:ss')
    var momentEndJob = moment(endJob,'hh:mm:ss')
    var calcInterval = (60/appointmentInterval)
    var workTime = (momentEndJob.hours()-momentStartJob.hours())


    for (let i = 0; i < workTime* calcInterval; i++) {
        var newTime = momentStartJob.add((appointmentInterval),'minutes');

        var jobTimeFormated =newTime.format('HH:mm')

        if(momentEndJob.diff(newTime) > 0){
        itens.push(
            <tr key={i}>
                {
                    (availableTime(0, i) ? (<td ><a onClick={()=>handleConfirmAppointment(`${newTime.format('HH:mm')}`,today)} style={{ backgroundColor: "aliceblue", padding: "5px" ,cursor: 'pointer'}}>
                        {jobTimeFormated}</a></td>) :
                        (<td style={{ padding: "5px" }}>----</td>)) 
                }
                {
                    (availableTime(1, i) ? (<td><a  onClick={()=>handleConfirmAppointment(`${newTime.format('HH:mm')}`,today.addDays(1))} style={{ backgroundColor: "aliceblue", padding: "5px" ,cursor: 'pointer'}}>
                        {jobTimeFormated}</a></td>) :
                        (<td style={{ padding: "5px" }}>----</td>))
                }
                {
                    (availableTime(2,i) ? (<td><a onClick={()=>handleConfirmAppointment(`${newTime.format('hh:mm')}`,today.addDays(2))} style={{ backgroundColor: "aliceblue", padding: "5px" ,cursor: 'pointer'}}>
                        {jobTimeFormated}</a></td>) :
                        (<td style={{ padding: "5px" }}>----</td>))
                }
                {
                    (availableTime(3, i) ? (<td><a   onClick={()=>handleConfirmAppointment(`${newTime.format('hh:mm')}`,today.addDays(3))} style={{ backgroundColor: "aliceblue", padding: "5px" ,cursor: 'pointer'}}>
                        {jobTimeFormated}</a></td>) :
                        (<td style={{ padding: "5px" }}> ----</td>))
                }
                {
                    (availableTime(4, i) ? (<td><a   onClick={()=>handleConfirmAppointment(`${newTime.format('hh:mm')}`,today.addDays(4))} style={{ backgroundColor: "aliceblue", padding: "5px" ,cursor: 'pointer'}}>
                        {jobTimeFormated}</a></td>) :
                        (<td style={{ padding: "5px" }}>----</td>))
                }
                {
                    (availableTime(5, i) ? (<td><a   onClick={()=>handleConfirmAppointment(`${newTime.format('hh:mm')}` ,today.addDays(5))} style={{ backgroundColor: "aliceblue", padding: "5px",cursor: 'pointer' }}>
                        {jobTimeFormated}</a></td>) :
                        (<td style={{ padding: "5px" }}>----</td>))
                }
            </tr>)
            }

    }
    return (

        <div className="w-full p-8" style={{ textAlign: '-webkit-center', overflow:'auto'}} >
               <table className={classes.table} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <thead >
                    <tr>
                        <th>
                            <div>{daysOfWeek[today.getDay()]}</div>
                            <div>{`${today.getDate()}/${(today.getMonth()+1)}`}</div>
                        </th>
                        <th>
                            <div>{daysOfWeek[today.addDays(1).getDay()]}</div>
                            <div> 
                                {`${today.addDays(1).getDate()}/${(today.addDays(1).getMonth()+1)}`}
                            </div>
                            
                         </th>
                        <th>
                            <div>{daysOfWeek[today.addDays(2).getDay()]}</div>

                            <div>{`${today.addDays(2).getDate()}/${(today.addDays(2).getMonth()+1)}`}</div>
                            
                            </th>
                        <th>
                         <div>{daysOfWeek[today.addDays(3).getDay()]}</div>

                            <div>{`${today.addDays(3).getDate()}/${(today.addDays(3).getMonth()+1)}`}</div>   
                            </th>
                        <th>
                            <div>{daysOfWeek[today.addDays(4).getDay()]}</div>

                            <div>{`${today.addDays(4).getDate()}/${(today.addDays(4).getMonth()+1)}`}</div>
                            
                            </th>
                        <th>
                            <div>{daysOfWeek[today.addDays(5).getDay()]}</div>

                            <div>{`${today.addDays(5).getDate()}/${(today.addDays(5).getMonth()+1)}`}</div>
                            
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