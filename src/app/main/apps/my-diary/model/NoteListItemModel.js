import FuseUtils from '@fuse/utils';

function NoteListItemModel(data) {
	const item = data || {};
	return {
		id: item.id || 0,
		checked: item.checked || false,
		text: item.text || ''
	};
}

export default NoteListItemModel;
