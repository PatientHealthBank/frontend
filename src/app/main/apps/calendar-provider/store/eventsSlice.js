import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import phbApi from 'app/services/phbApi';
import moment from 'moment';

export const dateFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';

export const getEvents = createAsyncThunk('calendarApp/events/getEvents', async (params, { getState, dispatch })=> {

	var user = getState().auth.user; 
	const response = await phbApi().get(`/event/provider/${user.currentUser.id}/list`);
	const data = await response.data;
	var events = data.map(event=>({
		id:event.id,
		title:event.title,
		clinic:event.clinic.companyName,
		allDay:false,
		eventType: event.eventType,
		start: moment(new Date(event.eventDate)).format('YYYY-MM-DDTHH:mm:ss.sssZ'),
		end: moment(new Date(event.eventDate)).add(event.duration,'minutes').format('YYYY-MM-DDTHH:mm:ss.sssZ'),
		patient:event.patient.name,
		email: event.patient.email,
		ssn: event.patient.ssn,
		telephone: event.patient.telephone,
		professional:event.provider.name,
		firstAppointment: event.eventType,
		desc: event.description,
		duration: event.duration
	}))
	return events;
});

export const addEvent = createAsyncThunk('calendarApp/events/addEvent', async (newEvent, { getState, dispatch }) => {
	var user = getState().auth.user; 
	newEvent.providerId = user.currentUser.id
	newEvent.start = moment(new Date(newEvent.start)).format('YYYY-MM-DDTHH:mm') 
    newEvent.end =  moment(new Date(newEvent.end)).format('YYYY-MM-DDTHH:mm')
	newEvent.description = newEvent.desc
	delete newEvent.id

	const response = await phbApi().post('/event', 	newEvent);
	const data = await response.data;

	return data;
});

export const updateEvent = createAsyncThunk('calendarApp/events/updateEvent', async (event, { dispatch }) => {
	event.description = event.desc
	const response = await phbApi().put('/event', event  );
	const data = await response.data;
	data.desc = data.description

	return data;
});

export const removeEvent = createAsyncThunk('calendarApp/events/remove-event', async (eventId, { dispatch }) => {
	const response = await phbApi().delete('/event/'+eventId);
	const data = await response.data;

	return data;
});

const eventsAdapter = createEntityAdapter({});

export const {
	selectAll: selectEvents,
	selectIds: selectEventIds,
	selectById: selectEventById
} = eventsAdapter.getSelectors(state => state.calendarApp.events);

const eventsSlice = createSlice({
	name: 'calendarApp/events',
	initialState: eventsAdapter.getInitialState({
		eventDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		openNewEventDialog: {
			prepare: event => {
				const payload = {
					type:event.type=='block'?event.type: 'new',
					props: {
						open: true
					},
					data: {
						start: moment(event.start).format(dateFormat).toString(),
						end: moment(event.end).format(dateFormat).toString(),
						eventType:event.eventType?event.eventType:3,
					}
				};
				return { payload };
			},
			reducer: (state, action) => {
				state.eventDialog = action.payload;
			}
		},
		openEditEventDialog: {
			prepare: event => {
				const payload = {
					type: 'edit',
					props: {
						open: true
					},
					data: {
						...event,
						start: moment(event.start).format(dateFormat).toString(),
						end: moment(event.end).format(dateFormat).toString()
					}
				};
				return { payload };
			},
			reducer: (state, action) => {
				state.eventDialog = action.payload;
			}
		},
		closeNewEventDialog: (state, action) => {
			state.eventDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		closeEditEventDialog: (state, action) => {
			state.eventDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		[getEvents.fulfilled]: eventsAdapter.setAll,
		[addEvent.fulfilled]: eventsAdapter.addOne,
		[updateEvent.fulfilled]: eventsAdapter.upsertOne,
		[removeEvent.fulfilled]: eventsAdapter.removeOne
	}
});

export const {
	openNewEventDialog,
	closeNewEventDialog,
	openEditEventDialog,
	closeEditEventDialog
} = eventsSlice.actions;

export default eventsSlice.reducer;
