import _ from '@lodash';
import mock from '../mock';

const MembersDB = {
	members: [
		{
			id: '1',
			specialty: 'Orthopedic Surgeon',
			name: 'Rosemarie Armstrong',
			email: 'rosemarie_armstrong@clinic1.com',
			occupation: '1',
			profileType: '1',
			clinic: 'Clinic 1',
			admAccess: false,
			profileImage: '',
			actions: ''
		},
		{
			id: '2',
			specialty: 'Physical Therapist',
			name: 'Kaydan Delgado',
			email: 'kaydan_delgado@clinic2.com',
			occupation: '1',
			profileType: '1',
			clinic: 'Clinic 2',
			admAccess: true,
			profileImage: '',
			actions: ''
		},
		{
			id: '3',
			specialty: 'Sports Medicine',
			name: 'Marta Kavanagh',
			email: 'marta_kavanagh@clinic3.com',
			occupation: '1',
			profileType: '1',
			clinic: 'Clinic 3',
			admAccess: true,
			profileImage: '',
			actions: ''
		}
	]
};

mock.onGet('/api/members-app/members').reply(() => {
	return [200, MembersDB.members];
});

mock.onGet('/api/members-app/member').reply(request => {
	const { membersId } = request.params;
	const response = _.find(MembersDB.members, { id: membersId });
	return [200, response];
});

mock.onPost('/api/members-app/member/save').reply(request => {
	const data = JSON.parse(request.data);
	let member = null;

	MembersDB.members = MembersDB.members.map(_member => {
		if (_member.id === data.id) {
			member = data;
			return member;
		}
		return _member;
	});

	if (!member) {
		member = data;
		MembersDB.members = [...MembersDB.members, member];
	}

	return [200, member];
});

mock.onGet('/api/members-app/orders').reply(() => {
	return [200, MembersDB.orders];
});

mock.onGet('/api/members-app/order').reply(request => {
	const { orderId } = request.params;
	const response = _.find(MembersDB.orders, { id: orderId });
	return [200, response];
});
