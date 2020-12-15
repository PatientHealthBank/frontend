import FuseUtils from '@fuse/utils';
import moment from 'moment';
import mock from '../mock';

function setDate(year, month, date, hours, minutes, seconds) {
	return moment(new Date(year, month, date, hours, minutes, seconds)).format('YYYY-MM-DDTHH:mm:ss.sssZ');
}

const calendarDB = {
	events: [
		{
			id: 0,
			title: '08:00 - Physiotherapy',
			clinic:'Physical Therapist - Clinic 1',
			allDay: true,
			start: setDate(2020, 9, 0),
			end: setDate(2020, 9, 1),
			patient:'John Due',
			email:'john.due@patitienthealth.com',
			ssn:165416541,
			telephone:165416541,
			professional:'Dra Gabriela Miana de Mattos Paixao',
			firstAppointment:true,
			addressLine1:'addressLine1',
			addressLine2:'addressLine2',
			city:'city',
			state:'state',
			observation:'observation'
		},
		{
			id: 1,
			title: '12:00 - Physiotherapy',
			clinic:'Physical Therapist - Clinic 1',
			allDay: false,
			start: setDate(2020, 9, 7),
			end: setDate(2020, 9, 10),
			patient:'John Due',
			email:'john.due@patitienthealth.com',
			ssn:165416541,
			telephone:165416541,
			professional:'Dra Gabriela Miana de Mattos Paixao',
			firstAppointment:true,
			addressLine1:'addressLine1',
			addressLine2:'addressLine2',
			city:'city',
			state:'state',
			observation:'observation'
		},
		{
			id: 2,
			title: '14:00 - Physiotherapy',
			clinic:'Physical Therapist - Clinic 1',
			allDay: false,
			start: setDate(2021, 2, 13, 0, 0, 0),
			end: setDate(2021, 2, 20, 0, 0, 0),
			patient:'John Due',
			email:'john.due@patitienthealth.com',
			ssn:165416541,
			telephone:165416541,
			professional:'Dra Gabriela Miana de Mattos Paixao',
			firstAppointment:true,
			addressLine1:'addressLine1',
			addressLine2:'addressLine2',
			city:'city',
			state:'state',
			observation:'observation'
		},
		{
			id: 3,
			title: '11:00 - Physiotherapy',
			clinic:'Physical Therapist - Clinic 1',
			allDay: false,
			start: setDate(2021, 10, 6, 0, 0, 0),
			end: setDate(2021, 10, 13, 0, 0, 0),
			patient:'John Due',
			email:'john.due@patitienthealth.com',
			ssn:165416541,
			telephone:165416541,
			professional:'Dra Gabriela Miana de Mattos Paixao',
			firstAppointment:true,
			addressLine1:'addressLine1',
			addressLine2:'addressLine2',
			city:'city',
			state:'state',
			observation:'observation'
		},
		{
			id: 4,
			title: '13:00 - Physiotherapy',
			clinic:'Physical Therapist - Clinic 1',
			allDay: false,
			start: setDate(2020, 9, 9, 0, 0, 0),
			end: setDate(2020, 9, 9, 0, 0, 0),
			patient:'John Due',
			email:'john.due@patitienthealth.com',
			ssn:165416541,
			telephone:165416541,
			professional:'Dra Gabriela Miana de Mattos Paixao',
			firstAppointment:true,
			addressLine1:'addressLine1',
			addressLine2:'addressLine2',
			city:'city',
			state:'state',
			observation:'observation'
		},
		{
			id: 5,
			title: '17:00 - Dermatologist',
			clinic:'Physical Therapist - Clinic 1',
			allDay: false,
			start: setDate(2020, 9, 13, 12, 0, 0, 0),
			desc: 'Big conference for important people',
			patient:'John Due',
			email:'john.due@patitienthealth.com',
			ssn:165416541,
			telephone:165416541,
			professional:'Dra Gabriela Miana de Mattos Paixao',
			firstAppointment:true,
			addressLine1:'addressLine1',
			addressLine2:'addressLine2',
			city:'city',
			state:'state',
			observation:'observation'
		},
		{
			id: 6,
			title: '16:00 - Physiotherapy',
			clinic:'Physical Therapist - Clinic 1',
			allDay: false,
			start: setDate(2020, 9, 12, 10, 30, 0, 0),
			end: setDate(2020, 9, 12, 12, 30, 0, 0),
			desc: 'Pre-meeting meeting, to prepare for the meeting',
			patient:'John Due',
			email:'john.due@patitienthealth.com',
			ssn:165416541,
			telephone:165416541,
			professional:'Dra Gabriela Miana de Mattos Paixao',
			firstAppointment:true,
			addressLine1:'addressLine1',
			addressLine2:'addressLine2',
			city:'city',
			state:'state',
			observation:'observation'
		},
		{
			id: 7,
			title: '17:00 - Dermatologist',
			clinic:'Physical Therapist - Clinic 1',
			allDay: false,
			start: setDate(2020, 9, 12, 12, 0, 0, 0),
			end: setDate(2020, 9, 12, 13, 0, 0, 0),
			desc: 'Power lunch',
			patient:'John Due',
			email:'john.due@patitienthealth.com',
			ssn:165416541,
			telephone:165416541,
			professional:'Dra Gabriela Miana de Mattos Paixao',
			firstAppointment:true,
			addressLine1:'addressLine1',
			addressLine2:'addressLine2',
			city:'city',
			state:'state',
			observation:'observation'
		},
		{
			id: 8,
			title: '10:00 - Physiotherapy',
			clinic:'Physical Therapist - Clinic 1',
			allDay: false,
			start: setDate(2020, 9, 22, 14, 0, 0, 0),
			end: setDate(2020, 9, 22, 15, 0, 0, 0),
			patient:'John Due',
			email:'john.due@patitienthealth.com',
			ssn:165416541,
			telephone:165416541,
			professional:'Dra Gabriela Miana de Mattos Paixao',
			firstAppointment:true,
			addressLine1:'addressLine1',
			addressLine2:'addressLine2',
			city:'city',
			state:'state',
			observation:'observation'
		},
		{
			id: 9,
			title: '18:00 - Happy Hour',
			clinic:'Physical Therapist - Clinic 1',
			allDay: false,
			outlook:true,
			start: setDate(2020, 9, 13, 17, 0, 0, 0),
			end: setDate(2020, 9, 13, 17, 30, 0, 0),
			desc: 'Most important meal of the day',
			patient:'John Due',
			email:'john.due@patitienthealth.com',
			ssn:165416541,
			telephone:165416541,
			professional:'Dra Gabriela Miana de Mattos Paixao',
			firstAppointment:true,
			addressLine1:'addressLine1',
			addressLine2:'addressLine2',
			city:'city',
			state:'state',
			observation:'observation'
		},
		{
			id: 10,
			title: '10:00 - Physiotherapy',
			clinic:'Physical Therapist - Clinic 1',
			allDay: false,
			start: setDate(2020, 9, 24, 20, 0, 0, 0),
			end: setDate(2020, 9, 24, 21, 0, 0, 0),
			patient:'John Due',
			email:'john.due@patitienthealth.com',
			ssn:165416541,
			telephone:165416541,
			professional:'Dra Gabriela Miana de Mattos Paixao',
			firstAppointment:true,
			addressLine1:'addressLine1',
			addressLine2:'addressLine2',
			city:'city',
			state:'state',
			observation:'observation'
		},
		{
			id: 11,
			title: '13:00 - Swimmming',
			clinic:'Physical Therapist - Clinic 1',
			allDay: false,
			outlook:true,
			start: setDate(2020, 9, 15, 7, 0, 0),
			end: setDate(2020, 9, 15, 10, 30, 0),
			patient:'John Due',
			email:'john.due@patitienthealth.com',
			ssn:165416541,
			telephone:165416541,
			professional:'Dra Gabriela Miana de Mattos Paixao',
			firstAppointment:true,
			addressLine1:'addressLine1',
			addressLine2:'addressLine2',
			city:'city',
			state:'state',
			observation:'observation'
		},
		{
			id: 12,
			title: '13:00 - Swimmming',
			clinic:'Physical Therapist - Clinic 1',
			allDay: false,
			outlook:true,
			start: setDate(2020, 9, 16, 20, 0, 0, 0),
			end: setDate(2020, 9, 16, 21, 0, 0, 0),
			patient:'JhJohnon Due',
			email:'john.due@patitienthealth.com',
			ssn:165416541,
			telephone:165416541,
			professional:'Dra Gabriela Miana de Mattos Paixao',
			firstAppointment:true,
			addressLine1:'addressLine1',
			addressLine2:'addressLine2',
			city:'city',
			state:'state',
			observation:'observation'
		},
		{
			id: 13,
			title: '10:00 - Swimmming',
			clinic:'Physical Therapist - Clinic 1',
			allDay: false,
			outlook:true,
			start: setDate(2020, 9, 1, 10, 0, 0),
			end: setDate(2020, 9, 1, 11, 30, 0),
			patient:'John Due',
			email:'john.due@patitienthealth.com',
			ssn:165416541,
			telephone:165416541,
			professional:'Dra Gabriela Miana de Mattos Paixao',
			firstAppointment:true,
			addressLine1:'addressLine1',
			addressLine2:'addressLine2',
			city:'city',
			state:'state',
			observation:'observation'
		},
		{
			id: 14,
			title: '13:00 - Team Meeting',
			clinic:'Physical Therapist - Clinic 1',
			allDay: false,
			outlook:true,
			start: setDate(2020, 9, 1, 13, 0, 0),
			end: setDate(2020, 9, 1, 15, 30, 0),
			patient:'John Due',
			email:'john.due@patitienthealth.com',
			ssn:165416541,
			telephone:165416541,
			professional:'Dra Gabriela Miana de Mattos Paixao',
			firstAppointment:true,
			addressLine1:'addressLine1',
			addressLine2:'addressLine2',
			city:'city',
			state:'state',
			observation:'observation'
		},
		{
			id: 15,
			title: '18:00 - Gym',
			clinic:'Physical Therapist - Clinic 1',
			allDay: false,
			outlook:true,
			start: setDate(2020, 9, 3, 18, 0, 0),
			end: setDate(2020, 9, 3, 19, 30, 0),
			patient:'John Due',
			email:'john.due@patitienthealth.com',
			ssn:165416541,
			telephone:165416541,
			professional:'Dra Gabriela Miana de Mattos Paixao',
			firstAppointment:true,
			addressLine1:'addressLine1',
			addressLine2:'addressLine2',
			city:'city',
			state:'state',
			observation:'observation'
		},
		{
			id: 16,
			title: "22:00 - Barbara's Party",
			clinic:'Physical Therapist - Clinic 1',
			allDay: false,
			outlook:true,
			start: setDate(2020, 9, 8, 22, 0, 0),
			end: setDate(2020, 9, 8, 22, 30, 0),
			patient:'John Due',
			email:'john.due@patitienthealth.com',
			ssn:165416541,
			telephone:165416541,
			professional:'Dra Gabriela Miana de Mattos Paixao',
			firstAppointment:true,
			addressLine1:'addressLine1',
			addressLine2:'addressLine2',
			city:'city',
			state:'state',
			observation:'observation'
		}
	]
};

mock.onGet('/api/calendar-app/events').reply(config => {
	return [200, calendarDB.events];
});

mock.onPost('/api/calendar-app/add-event').reply(request => {
	const data = JSON.parse(request.data);
	const newEvent = {
		...data.newEvent,
		id: FuseUtils.generateGUID()
	};
	calendarDB.events = [...calendarDB.events, newEvent];
	return [200, newEvent];
});

mock.onPost('/api/calendar-app/update-event').reply(request => {
	const data = JSON.parse(request.data);

	calendarDB.events = calendarDB.events.map(event => {
		if (data.event.id === event.id) {
			return data.event;
		}
		return event;
	});

	return [200, data.event];
});

mock.onPost('/api/calendar-app/remove-event').reply(request => {
	const data = JSON.parse(request.data);
	const event = calendarDB.events.find(_event => data.eventId === _event.id);
	calendarDB.events = calendarDB.events.filter(_event => _event.id !== event.id);

	return [200, event];
});
