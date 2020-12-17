import FuseUtils from '@fuse/utils';
import mock from '../mock';

const notesDB = {
	notes: [
		{
			id: '5739d1fb4d27bc5341fd33s1',
			title: '',
			description: 'Check what type of treatment options are available for my condition',
			archive: false,
			image: '',
			time: '2020-02-25T04:01:06.587Z',
			reminder: '2020-01-13T11:09:00.587Z',
			checklist: [],
			labels: ['5725a6809fdd915739187ed5']
		},
		{
			id: '5739d1fb4d27bc5341fd33b3',
			title: 'Ask my doctor to adjust my diet',
			description: '',
			archive: false,
			image: '',
			time: '2020-05-10T04:01:06.587Z',
			reminder: '2020-01-13T11:09:00.587Z',
			checklist: [],
			labels: ['5725a6806acf030f9341e932', '5725a6806acf030f9341e925']
		},
		{
			id: '5739d1fbaac9710256574208',
			title: '',
			description: 'Every night my pain changes over time',
			archive: false,
			image: '',
			time: '2020-04-12T15:14:56.587Z',
			reminder: '2020-03-03T18:08:32.587Z',
			checklist: [],
			labels: ['5725a680606588342058356d']
		},
		{
			id: '5739d1fb843f747d5dc0e42a',
			title: '',
			description: 'Check the restrictions I will have with this type of treatment.',
			archive: false,
			image: '',
			time: '2020-03-21T23:23:53.587Z',
			reminder: '2020-01-13T11:09:00.587Z',
			checklist: [],
			labels: ['5725a6809fdd915739187ed5']
		},
		{
			id: '5739d1fbf2726fe3e5e5014a',
			title: 'Medicines List',
			description: '',
			archive: false,
			image: '',
			time: '2020-04-10T22:18:14.587Z',
			reminder: '2020-01-13T11:09:00.587Z',
			checklist: [
				{
					id: '1',
					checked: true,
					text: 'Ibuprofen'
				},
				{
					id: '2',
					checked: true,
					text: 'Advil'
				},
				{
					id: '3',
					checked: false,
					text: 'Motrin IB'
				},
				{
					id: '4',
					checked: true,
					text: 'Others'
				}
			],
			labels: ['5725a68031fdbb1db2c1af47']
		},
		{
			id: '5739d1fbc4ebca7d947b4763',
			title: '',
			description: "Don't forget to take medicine",
			archive: true,
			image: '',
			time: '2020-01-05T15:08:41.587Z',
			reminder: '2020-04-01T21:35:24.587Z',
			checklist: [],
			labels: ['5725a6806acf030f9341e925']
		}
	],
	labels: [
		{
			id: '5725a6802d10e277a0f35739',
			name: 'Physical Therapy',
			handle: 'physicaltherapy'
		},
		{
			id: '5725a6809fdd915739187ed5',
			name: 'Sports Medicine',
			handle: 'sportsmedicine'
		},
		{
			id: 'c64c4OLbg0mGm2FZvUdLMQ',
			name: 'Internal/General Medicine',
			handle: 'internal/generalmedicine'
		},
		{
			id: '5725a68031fdbb1db2c1af47',
			name: 'Dermatology',
			handle: 'dermatology'
		},
		{
			id: '5725a680606588342058356d',
			name: 'Cardiology',
			handle: 'cardiology'
		},
		{
			id: '5725a6806acf030f9341e925',
			name: 'Neurology',
			handle: 'neurology'
		},
		{
			id: '5725a6806acf030f9341e932',
			name: 'Mental Health',
			handle: 'mentalhealth'
		}
	]
};

mock.onGet('/api/notes-app/notes').reply(config => {
	return [200, notesDB.notes];
});

mock.onGet('/api/notes-app/labels').reply(config => {
	return [200, notesDB.labels];
});

mock.onPost('/api/notes-app/create-note').reply(request => {
	const data = JSON.parse(request.data);
	const newNote = {
		...data.note
	};
	notesDB.notes = [newNote, ...notesDB.notes];
	return [200, newNote];
});

mock.onPost('/api/notes-app/update-note').reply(request => {
	const { note } = JSON.parse(request.data);

	notesDB.notes = notesDB.notes.map(_note => {
		if (note.id === _note.id) {
			return note;
		}
		return _note;
	});

	return [200, note];
});

mock.onPost('/api/notes-app/update-labels').reply(request => {
	const data = JSON.parse(request.data);

	notesDB.labels = data.labels;

	return [200, notesDB.labels];
});

mock.onPost('/api/notes-app/remove-note').reply(request => {
	const data = JSON.parse(request.data);

	notesDB.notes = notesDB.notes.filter(note => data.noteId !== note.id);

	return [200, data.noteId];
});
