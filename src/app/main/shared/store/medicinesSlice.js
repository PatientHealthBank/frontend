import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import phbApi from 'app/services/phbApi'
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
//TO DO : Separa esse slice para widget e component pois este slice esta sendo consumido tanto pelo componente quando o widget

export const listMedicines = () => async (dispatch, getState) => {
    dispatch(openLoading())
    var user = getState().auth.user
	return phbApi().get('/patient/Medicines/'+user.currentUser.id)
		.then(({data}) => {
			dispatch(closeLoading())
			return dispatch(getMedicinesList(data));
		})
		.catch(error => {
            console.log(error)
            return dispatch(closeLoading())
		});
};

const medicinesAdapter = createEntityAdapter({});

export const { selectAll: selectMedicines, selectById: selectMedicinesById } = medicinesAdapter.getSelectors(
	state => state.profile.Medicines
);

const medicinesSlice = createSlice({
	name: 'profile/Medicines',
	initialState: [],
	reducers: {
        getMedicinesList:{reducer: (state, action) => {
            return action.payload
        }}
	}
});

export const { getMedicinesList } = medicinesSlice.actions;

export default medicinesSlice.reducer;
