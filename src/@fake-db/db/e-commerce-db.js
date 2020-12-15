import _ from '@lodash';
import mock from '../mock';

const eCommerceDB = {
	products: [
		{
			id: '1',
			clinic: 'UCLA Medical Center',
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
			meansTransport:'Uber',
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
			priority:'Pending',
			date:'Aug 20, 2020',
			firstAppointment: true,
			includeTravelTime: true,
			caregiverAppointment: true,
			notifications: true,
			instructions:[
				{
					id:1,
					description:'Bring the pre-approval from your insurance plan',
					completed:true
				},
				{
					id:2,
					description:'Bring the referral letter from your GP',
					completed:false
				},
				{
					id:3,
					description:'Update your list of current medications and/or vaccinations (pediatric patients only)',
					completed:true
				},
				{
					id:4,
					description:'Fill the topics to discuss',
					completed:false
				},
				{
					id:5,
					description:'Set your treatment goals',
					completed:true
				},
				{
					id:6,
					description:'Update your treatment progress (how do you feel since your last appointment and satisfaction with your current treatment)',
					completed:false
				},
				{
					id:7,
					description:'Answer questionnaires sent by your care team',
					completed:false
				},
				{
					id:8,
					description:'Confirm or update your contact information',
					completed:false
				},
				{
					id:9,
					description:'Confirm or update your insurance information',
					completed:false
				}
			]
		},
		{
			id: '2',
			clinic: 'Cleveland Clinic',
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
			priority:'Ready',			
			date:'Aug 20, 2020',
			firstAppointment: false,
			includeTravelTime: true,
			caregiverAppointment: true,
			notifications: false,
		},
		{
			id: '3',
			clinic: 'Massachusetts General Hospital',
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
			priority:'Ready',			
			date:'Aug 20, 2020',
			firstAppointment: true,
			includeTravelTime: false,
			caregiverAppointment: false,
			notifications: true,
		}				
	]
};

mock.onGet('/api/e-commerce-app/products').reply(() => {
	return [200, eCommerceDB.products];
});

mock.onGet('/api/e-commerce-app/product').reply(request => {
	const { productId } = request.params;
	const response = _.find(eCommerceDB.products, { id: productId });
	return [200, response];
});

mock.onPost('/api/e-commerce-app/product/save').reply(request => {
	const data = JSON.parse(request.data);
	let product = null;

	eCommerceDB.products = eCommerceDB.products.map(_product => {
		if (_product.id === data.id) {
			product = data;
			return product;
		}
		return _product;
	});

	if (!product) {
		product = data;
		eCommerceDB.products = [...eCommerceDB.products, product];
	}

	return [200, product];
});

mock.onGet('/api/e-commerce-app/orders').reply(() => {
	return [200, eCommerceDB.orders];
});

mock.onGet('/api/e-commerce-app/order').reply(request => {
	const { orderId } = request.params;
	const response = _.find(eCommerceDB.orders, { id: orderId });
	return [200, response];
});
