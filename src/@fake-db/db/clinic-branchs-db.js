import _ from '@lodash';
import mock from '../mock';

const clinicBranchsDB = {
	clinics: [
		{
			id: '1',
			clinicName: 'Orthopedic Surgeon - Clinic 1',
			zipcode: '',
			number: '',
			addressLine1: '1919  Saint Clair Street',
			addressLine2: '1919  Saint Clair Street',
			city:'Canton',
			state: 'Colorado',
			telephone:'',
			TaxId: ''			
		},
		{
			id: '2',
			clinicName: 'Physical Therapist - Clinic 2',
			zipcode: '',
			number: '',
			addressLine1: '1451  Timberbrook Lane',
			addressLine2: '1451  Timberbrook Lane',
			city:'San Francisco',
			state: 'Oklahoma',
			telephone:'',
			TaxId: ''			
		},
		{
			id: '3',
			clinicName: 'Sports Medicine - Clinic 3',
			zipcode: '',
			number: '',
			addressLine1: '3099  Park Street',
			addressLine2: '3099  Park Street',
			city:'Stamford',
			state: 'Pennsylvania',
			telephone:'',
			TaxId: ''			
		}			
	]
};

mock.onGet('/api/clinic-branchs-app/clinicBranchs').reply(() => {
	return [200, clinicBranchsDB.clinics];
});

mock.onGet('/api/clinic-branchs-app/clinicBranch').reply(request => {
	const { clinicId } = request.params;
	const response = _.find(clinicBranchsDB.clinics, { id: clinicId });
	return [200, response];
});

mock.onPost('/api/clinic-branchs-app/clinicBranch/save').reply(request => {
	const data = JSON.parse(request.data);
	let clinic = null;

	clinicBranchsDB.clinics = clinicBranchsDB.clinics.map(_clinics => {
		if (_clinics.id === data.id) {
			clinic = data;
			return clinic;
		}
		return _clinics;
	});

	if (!clinic) {
		clinic = data;
		clinicBranchsDB.clinics = [...clinicBranchsDB.clinics, clinic];
	}

	return [200, clinic];
});