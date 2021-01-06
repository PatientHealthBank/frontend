import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProjects = createAsyncThunk('appointmentdApp/projects/getProjects', async () => {
	const response = await axios.get('/api/project-dashboard-app/projects');
	return response.data;
});

const appointmentAdapter = createEntityAdapter({});

export const {
	selectAll: selectProjects,
	selectEntities: selectProjectsEntities,
	selectById: selectProjectById
} = appointmentAdapter.getSelectors(state => state.projectDashboardApp.projects);

const appointmentSlice = createSlice({
	name: 'projectDashboardApp/projects',
	initialState: projectsAdapter.getInitialState(),
	reducers: {},
	extraReducers: {
		[getProjects.fulfilled]: projectsAdapter.setAll
	}
});

export default appointmentSlice.reducer;
