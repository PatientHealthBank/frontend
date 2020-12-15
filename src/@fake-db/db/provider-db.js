import _ from '@lodash';
import mock from '../mock';

const providerDB = {
	patients: [
		{
			id: '1',
			name: 'Jhon Doe',
			birthday: 'February 30th, 1986',
			age: 34,
			gender: 'Male',
			locations: ['London, UK', 'New York, USA'],
			contactPhone: '+9 555 5255',
			email: 'jhon.doe@patienthealthbank.com.br',
			onTreatement: 'Under Treatment',
			lastAppoinemt: 'october 9th',
			featuredImageId: 'assets/images/avatars/Velazquez.jpg',
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
			allergies: [
				{
					id: '1',
					description: 'Amoxicillin',
					age: '20'
				},
				{
					id: '2',
					description: 'Penicillin',
					age: '20'
				},
				{
					id: '3',
					description: 'Milk',
					age: '21'
				},
				{
					id: '4',
					description: 'Peanuts',
					age: '8'
				}
			],
			medicines: [
				{
					id: '1',
					description: 'Ventolin HFA',
					quantity: '2 Times a day'
				},
				{
					id: '2',
					description: 'Nexium',
					quantity: '1 Pill'
				}
			],
			vaccines: [
				{
					id: '1',
					description: 'Hepatitis B',
					date: '10/02/2016',
					location: 'Brazil'
				},
				{
					id: '2',
					description: 'Yellow Fever',
					date: '10/05/2012',
					location: 'Brazil'
				},
				{
					id: '3',
					description: 'Diphtheria',
					date: '24/08/2017',
					location: 'Brazil'
				},
				{
					id: '4',
					description: 'Tetanus',
					date: '13/06/2010',
					location: 'Brazil'
				}
			],
			exams: [
				{
					id: '1',
					name: 'Magnetic resonance imaging (MRI) Knee',
					type: 'PDF',
					owner: 'Me',
					size: '750 Kb',
					modified: 'July 8, 2020',
					opened: 'July 8, 2020',
					created: 'July 8, 2020',
					extention: '',
					location: 'My Files > Documents',
					offline: true
				},
				{
					id: '4',
					name: 'Blood test',
					type: 'document',
					owner: 'Emily Bennett',
					size: '1.2 Mb',
					modified: 'July 8, 2020',
					opened: 'July 8, 2020',
					created: 'July 8, 2020',
					extention: '',
					location: 'My Files > Documents',
					offline: true,
					preview: 'assets/images/etc/sample-file-preview.jpg'
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
			],

			treatments: [
				{
					id: '1',
					treatment: 'Shoulder',
					specialty: 'Physiotherapy',
					patient: 'John Doe',
					nextAppointment: 'Aug 20, 2020',
					priority: 'High',
					progress: 38,
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
				}
			],

			videoLibrary: [
				{
					id: '1',
					name: 'Lower Back Pain - June 2020',
					otherName: 'Videos - Patient Health Bank',
					info: '3 Videos',
					media: [
						{
							type: 'video',
							title: 'Side Plank - 1:05',
							preview: 'assets/images/Videos/Capa1.png'
						},
						{
							type: 'video',
							title: 'Partial curl - 1:32',
							preview: 'assets/images/Videos/Capa1.png'
						},
						{
							type: 'video',
							title: 'Extension exercise - 0:55',
							preview: 'assets/images/Videos/Capa1.png'
						}
					]
				},
				{
					id: '2',
					name: 'Knee Strengthening - August 2020',
					otherName: 'Videos - Clinic',
					info: '1 Video',
					media: [
						{
							type: 'photo',
							title: 'Single Leg Bridge',
							preview: 'assets/images/Videos/Capa1.png'
						}
					]
				},
			],
		}
	]
};

mock.onGet('/api/provider-app/patients').reply(() => {
	return [200, providerDB.patients];
});

mock.onGet('/api/provider-app/patient').reply(request => {
	const { patientId } = request.params;
	const response = _.find(providerDB.patients, { id: patientId });
	return [200, response];
});

mock.onPost('/api/provider-app/patient/save').reply(request => {
	const data = JSON.parse(request.data);
	let patient = null;

	providerDB.patients = providerDB.patients.map(_patient => {
		if (_patient.id === data.id) {
			patient = data;
			return patient;
		}
		return _patient;
	});

	if (!patient) {
		patient = data;
		providerDB.patients = [...providerDB.patients, patient];
	}

	return [200, patient];
});
