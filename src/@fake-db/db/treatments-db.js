import _ from '@lodash';
import mock from '../mock';

const TreatmentsDB = {
	treatments: [
		{
			id: '1',
			treatment: 'Shoulder',
			specialty: 'Physiotherapy',
			patient: 'John Doe',
			nextAppointment: 'Aug 20, 2020',
			priority: 'High',
			progress: '38',
			attendWork: false,
			beMoreActive: true,
			stopMedication: false,
			stopPain: true,
			notFeelingDepress: false,
			notFeelingAnxious: true,
			travel: true,
			activeSexual: false,
			visitFamily: false,
			practiceSports: false,
			others: true,
			othersObservation: '',
			medicines: [
				{
					id: '1',
					dosage: '3000 mg',
					compound: 'Vitamin C',
					form: 'Capsule',
					frequency: '1 time a day',
					dates: '2020-09-15',
				},
				{
					id: '2',
					dosage: '500 mg',
					compound: 'L-Theanine',
					form: 'Capsule',
					frequency: '1 time a day',
					dates: '2020-09-15',
				},
				{
					id: '3',
					dosage: '100 g',
					compound: 'Creatine',
					form: 'Powder',
					frequency: 'Every Morning',
					dates: '2020-09-15',
				},
				{
					id: '4',
					dosage: '10000 mg',
					compound: 'Fish Oil',
					form: 'Capsule',
					frequency: 'After Lunch',
					dates: '2020-09-15',
				}
			],
			careteam: [
				{
					id: 1,
					providerName: 'Dr Scarlet Mcmillan',
					providerSpecialty: 'Orthopedic Surgeon',
					providerSubtitle: 'Knee, Shoulder and Sports Medicine',
					urlAvatar: 'assets/images/avatars/doctor3.jpg'
				},
				{
					id: 2,
					providerName: 'Tyler Tanaka, PT, DPT, PRC',
					providerSpecialty: 'Physical Therapist',
					providerSubtitle: '',
					urlAvatar: 'assets/images/avatars/doctor1.png'
				}
			],
			appointments: [
				{
					id: '1',
					clinic: 'A Walk Amongst Friends',
					handle: 'a-walk-amongst-friends-canvas-print',
					description:
						'Officia amet eiusmod eu sunt tempor voluptate laboris velit nisi amet enim proident et. Consequat laborum non eiusmod cillum eu exercitation. Qui adipisicing est fugiat eiusmod esse. Sint aliqua cupidatat pariatur mollit ad est proident reprehenderit. Eiusmod adipisicing laborum incididunt sit aliqua ullamco.',
					doctorName: 'Dr Christopher Ruiz (Chris)',
					specialty: 2,
					specialtyDescription: 'Sports Medicine',
					tags: ['canvas-print', 'nature'],
					featuredImageId: 'assets/images/avatars/doctor2.png',
					images: [
						{
							id: 0,
							url: 'assets/images/etc/intakeForms.png',
							type: 'image'
						},
						{
							id: 1,
							url: 'assets/images/etc/sampleFilePreview.jpg',
							type: 'image'
						}
					],
					meansTransport: 'Uber',
					patient: 'John Doe',
					taxRate: 10,
					comparedPrice: 19.9,
					quantity: 3,
					sku: 'A445BV',
					width: '22cm',
					height: '24cm',
					depth: '15cm',
					weight: '3kg',
					extraShippingFee: 3.0,
					active: true,
					priority: 'High',
					date: 'Aug 20, 2020',
					firstAppointment: true,
					includeTravelTime: false,
					caregiverAppointment: true,
					notifications: true,
				},
				{
					id: '2',
					clinic: 'Braies Lake',
					handle: 'braies-lake-canvas-print',
					description:
						'Duis anim est non exercitation consequat. Ullamco ut ipsum dolore est elit est ea elit ad fugiat exercitation. Adipisicing eu ad sit culpa sint. Minim irure Lorem eiusmod minim nisi sit est consectetur.',
					doctorName: 'Dr Tianna Nielsen',
					specialty: 3,
					specialtyDescription: 'Physical Therapist',
					tags: ['canvas-print', 'nature'],
					featuredImageId: 'assets/images/avatars/doctor3.jpg',
					images: [
						{
							id: 0,
							url: 'assets/images/etc/intakeForms.png',
							type: 'image'
						},
						{
							id: 1,
							url: 'assets/images/etc/sampleFilePreview.jpg',
							type: 'image'
						}
					],
					priceTaxExcl: 22.381,
					patient: 'John Doe',
					taxRate: 10,
					comparedPrice: 29.9,
					quantity: 92,
					sku: 'A445BV',
					width: '22cm',
					height: '24cm',
					depth: '15cm',
					weight: '3kg',
					extraShippingFee: 3.0,
					active: true,
					priority: 'Normal',
					date: 'Aug 20, 2020',
					firstAppointment: false,
					includeTravelTime: true,
					caregiverAppointment: true,
					notifications: false,
				},
				{
					id: '3',
					clinic: 'Fall Glow',
					handle: 'fall-glow-canvas-print',
					description:
						'Sit ipsum esse eu consequat veniam sit consectetur consectetur anim. Ut Lorem dolor ullamco do. Laboris excepteur consectetur tempor nisi commodo amet deserunt duis.',
					doctorName: 'Dr James Lowe (Jim)',
					specialty: 6,
					specialtyDescription: 'Orthopedic Surgery',
					tags: ['canvas-print', 'nature'],
					featuredImageId: 'assets/images/avatars/doctor1.png',
					images: [
						{
							id: 0,
							url: 'assets/images/etc/intakeForms.png',
							type: 'image'
						},
						{
							id: 1,
							url: 'assets/images/etc/sampleFilePreview.jpg',
							type: 'image'
						}
					],
					priceTaxExcl: 44.809,
					patient: 'John Doe',
					taxRate: 10,
					comparedPrice: 59.9,
					quantity: 60,
					sku: 'A445BV',
					width: '22cm',
					height: '24cm',
					depth: '15cm',
					weight: '3kg',
					extraShippingFee: 3.0,
					active: true,
					priority: 'Low',
					date: 'Aug 20, 2020',
					firstAppointment: true,
					includeTravelTime: false,
					caregiverAppointment: false,
					notifications: true,
				}
			]
		},
		{
			id: '2',
			treatment: 'Lower back pain',
			specialty: 'Physical Therapist',
			patient: 'Clarisse',
			nextAppointment: 'Aug 23, 2020',
			priority: 'Normal',
			progress: '78',
			attendWork: true,
			beMoreActive: true,
			stopMedication: false,
			stopPain: true,
			notFeelingDepress: true,
			notFeelingAnxious: true,
			travel: true,
			activeSexual: false,
			visitFamily: false,
			practiceSports: false,
			others: false,
			othersObservation: '',
			medicines: [
				{
					id: '1',
					dosage: '3000 mg',
					compound: 'Vitamin C',
					form: 'Capsule',
					frequency: '1 time a day',
					dates: '2020-09-15',
				},
				{
					id: '4',
					dosage: '10000 mg',
					compound: 'Fish Oil',
					form: 'Capsule',
					frequency: 'After Lunch',
					dates: '2020-09-15',
				}
			],
			careteam: [
				{
					id: 1,
					providerName: 'Dr Scarlet Mcmillan',
					providerSpecialty: 'Orthopedic Surgeon',
					providerSubtitle: 'Knee, Shoulder and Sports Medicine',
					urlAvatar: 'assets/images/avatars/doctor3.jpg'
				},
				{
					id: 2,
					providerName: 'Emilie Tanaka, PT, DPT, PRC',
					providerSpecialty: 'Physical Therapist',
					providerSubtitle: '',
					urlAvatar: 'assets/images/avatars/doctor1.png'
				}
			],
		}
	]
};

mock.onGet('/api/treatments-app/treatments').reply(() => {
	return [200, TreatmentsDB.treatments];
});

mock.onGet('/api/treatments-app/treatment').reply(request => {
	const { treatmentId } = request.params;
	const response = _.find(TreatmentsDB.treatments, { id: treatmentId });
	return [200, response];
});

mock.onPost('/api/treatments-app/treatment/save').reply(request => {
	const data = JSON.parse(request.data);
	let treatment = null;

	TreatmentsDB.treatments = TreatmentsDB.treatments.map(_treatment => {
		if (_treatment.id === data.id) {
			treatment = data;
			return treatment;
		}
		return _treatment;
	});

	if (!treatment) {
		treatment = data;
		TreatmentsDB.treatments = [...TreatmentsDB.treatments, treatment];
	}

	return [200, treatment];
});

mock.onGet('/api/treatments-app/orders').reply(() => {
	return [200, TreatmentsDB.orders];
});

mock.onGet('/api/treatments-app/order').reply(request => {
	const { orderId } = request.params;
	const response = _.find(TreatmentsDB.orders, { id: orderId });
	return [200, response];
});
