import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';

export const appointmentsList = () => async (dispatch, getState) => {
    dispatch(openLoading())
    var user = getState().auth.user
	return phbApi().get('/appointment/'+user.currentUser.id)
		.then(({data}) => {
			dispatch(closeLoading())
			return dispatch(getAppointmentsList(data));
		})
		.catch(error => {
            return dispatch(closeLoading())
		});
};

const appointmentAdapter = createEntityAdapter({});

export const { selectAll: selectAppointments, selectById: selectAppointmentById } = appointmentAdapter.getSelectors(
	state => state.AppointmentsApp.Appointments
);

const appointmentsSlice = createSlice({
	name: 'e-commerce/Appointments',
	initialState: [],
	reducers: {
        getAppointmentsList:{reducer: (state, action) => {
            return action.payload
        }}
	}
});
export const { getAppointmentsList } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;

