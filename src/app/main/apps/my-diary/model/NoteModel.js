import FuseUtils from '@fuse/utils';

function NoteModel(data) {
	const item = data || {};
	return {
		id: item.id || 0,
		title: item.title || '',
		description: item.description || '',
		archive: item.archive || false,
		image: item.image || '',
		time: item.time || null,
		reminder: item.reminder || null,
		checklist: item.checklist || [],
		labels: item.labels || [],
		patientId: item.patientId || 0
	};
}

export default NoteModel;
