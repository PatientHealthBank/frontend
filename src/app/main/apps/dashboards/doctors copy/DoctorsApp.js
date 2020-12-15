import FuseAnimateGroup from '../dashboard/node_modules/@fuse/core/FuseAnimateGroup';
import FusePageSimple from '../dashboard/node_modules/@fuse/core/FusePageSimple';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import withReducer from '../dashboard/node_modules/app/store/withReducer';
import clsx from 'clsx';
import _ from '../dashboard/node_modules/@lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import reducer from './store';

import { getWidgets, selectWidgets } from './store/widgetsSlice';

import Widget1 from './widgets/Widget1';
import Widget10 from './widgets/Widget10';
import Widget11 from './widgets/Widget11';
import Widget2 from './widgets/Widget2';
import Widget3 from './widgets/Widget3';
import Widget4 from './widgets/Widget4';
import Widget5 from './widgets/Widget5';
import Widget6 from './widgets/Widget6';
import Widget7 from './widgets/Widget7';
import Widget8 from './widgets/Widget8';
import Widget9 from './widgets/Widget9';
import WidgetNow from './widgets/WidgetNow';
import WidgetWeather from './widgets/WidgetWeather';

const useStyles = makeStyles(theme => ({
	content: {
		'& canvas': {
			maxHeight: '100%'
		}
	},
	selectedProject: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '8px 0 0 0'
	},
	projectMenuButton: {
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		borderRadius: '0 8px 0 0',
		marginLeft: 1
	}
}));

function DoctorsApp(props) {
	const routeParams = useParams();
	const dispatch = useDispatch();

	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const [tabValue, setTabValue] = useState(0);
	const clinic = clinics.find(x=>x.id = routeParams.clinicId)


	function handleChangeTab(event, value) {
		setTabValue(value);
	}



	return (
		<FusePageSimple
			classes={{
				toolbar: 'min-h-48 h-48',
				rightSidebar: 'w-288',
				content: classes.content
			}}
			header={
				<div className="flex flex-col justify-between flex-1 px-24 pt-24">
					<div className="flex justify-between items-start">
						<Typography className="py-0 sm:py-24 text-24 md:text-32" variant="h4">
							{clinic.title}
						</Typography>

					</div>
					
				</div>
			}

			content={
				<div className="p-12">
						<FuseAnimateGroup
							className="flex flex-wrap"
							enter={{
								animation: 'transition.slideUpBigIn'
							}}
						>
							<div className="widget flex w-full p-12" style={{padding:"10px"}}>
								<Widget5 clinic={clinic} />
							</div>
						</FuseAnimateGroup>
				</div>
			}

			ref={pageLayout}
		/>
	);
}

export default withReducer('DoctorsApp', reducer)(DoctorsApp);


const clinics = [
	{ id:1,title: 'Clinica Dermatologica 1', doctors: [
		{
			id:1, 
			name:"Dr Alex Junior de Araujo", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			],
		},
		{
			id:2, 
			name:"Dra Marcela da Silva", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]

		},
		{
			id:3, 
			name:"Dr José Alvaro", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:4, 
			name:"Dra Tais Almeida", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
	]},
	 { id:2,title: 'Clinica Dermatologica 2', doctors: [
		{
			id:1, 
			name:"Dr Alex Junior de Araujo", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			] ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:2, 
			name:"Dra Marcela da Silva", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:3, 
			name:"Dr José Alvaro", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:4, 
			name:"Dra Tais Almeida", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
	]},
	 { id:3,title: 'Clinica Dermatologica 3', doctors: [
		{
			id:1, 
			name:"Dr Alex Junior de Araujo", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:2, 
			name:"Dra Marcela da Silva", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:3, 
			name:"Dr José Alvaro", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:4, 
			name:"Dra Tais Almeida", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
	]},
	 { id:4,title: 'Clinica Dermatologica 4',doctors: [
		{
			id:1, 
			name:"Dr Alex Junior de Araujo", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:2, 
			name:"Dra Marcela da Silva", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:3, 
			name:"Dr José Alvaro", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:4, 
			name:"Dra Tais Almeida", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
	]},
	 { id:5,title: 'Clinica Dermatologica 5', doctors: [
		{
			id:1, 
			name:"Dr Alex Junior de Araujo", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:2, 
			name:"Dra Marcela da Silva", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:3, 
			name:"Dr José Alvaro", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:4, 
			name:"Dra Tais Almeida", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
	] },
	 { id:6,title: 'Clinica Dermatologica 6', doctors: [
		{
			id:1, 
			name:"Dr Alex Junior de Araujo", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:2, 
			name:"Dra Marcela da Silva", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:3, 
			name:"Dr José Alvaro", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:4, 
			name:"Dra Tais Almeida", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
	]},
	 { id:7,title: 'Oftalmologista 1', doctors: [
		{
			id:1, 
			name:"Dr Alex Junior de Araujo", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:2, 
			name:"Dra Marcela da Silva", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:3, 
			name:"Dr José Alvaro", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:4, 
			name:"Dra Tais Almeida", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
	]},
	 { id:8,title: 'Clinica Oftalmologista 2', doctors: [
		{
			id:1, 
			name:"Dr Alex Junior de Araujo", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:2, 
			name:"Dra Marcela da Silva", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:3, 
			name:"Dr José Alvaro", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:4, 
			name:"Dra Tais Almeida", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
	]},
	 { id:9,title: 'Clinica Oftalmologista 3',doctors: [
		{
			id:1, 
			name:"Dr Alex Junior de Araujo", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:2, 
			name:"Dra Marcela da Silva", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:3, 
			name:"Dr José Alvaro", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:4, 
			name:"Dra Tais Almeida", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
	]},
	 { id:10,title: 'Oftalmologista 4',doctors: [
		{
			id:1, 
			name:"Dr Alex Junior de Araujo", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:2, 
			name:"Dra Marcela da Silva", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:3, 
			name:"Dr José Alvaro", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:4, 
			name:"Dra Tais Almeida", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
	]},
	 { id:11,title: 'Oftalmologista 5', doctors: [
		{
			id:1, 
			name:"Dr Alex Junior de Araujo", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:2, 
			name:"Dra Marcela da Silva", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:3, 
			name:"Dr José Alvaro", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:4, 
			name:"Dra Tais Almeida", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
	]},
	 { id:12,title: 'Oftalmologista 6', doctors: [
		{
			id:1, 
			name:"Dr Alex Junior de Araujo", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:2, 
			name:"Dra Marcela da Silva", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:3, 
			name:"Dr José Alvaro", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:4, 
			name:"Dra Tais Almeida", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
	] },
	 { id:13,title: 'Phisioterapist 1', doctors: [
		{
			id:1, 
			name:"Dr Alex Junior de Araujo", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:2, 
			name:"Dra Marcela da Silva", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:3, 
			name:"Dr José Alvaro", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:4, 
			name:"Dra Tais Almeida", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
	] },
	 { id:14,title: 'Phisioterapist 2', doctors: [
		{
			id:1, 
			name:"Dr Alex Junior de Araujo", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:2, 
			name:"Dra Marcela da Silva", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:3, 
			name:"Dr José Alvaro", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:4, 
			name:"Dra Tais Almeida", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
	] },
	 { id:15,title: 'Phisioterapist 3', doctors: [
		{
			id:1, 
			name:"Dr Alex Junior de Araujo", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:2, 
			name:"Dra Marcela da Silva", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:3, 
			name:"Dr José Alvaro", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:4, 
			name:"Dra Tais Almeida", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
	] },
	 { id:16,title: 'Phisioterapist 4',doctors: [
		{
			id:1, 
			name:"Dr Alex Junior de Araujo", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:2, 
			name:"Dra Marcela da Silva", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:3, 
			name:"Dr José Alvaro", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:4, 
			name:"Dra Tais Almeida", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
	] },
	 { id:17,title: 'Phisioterapist 5', doctors: [
		{
			id:1, 
			name:"Dr Alex Junior de Araujo", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:2, 
			name:"Dra Marcela da Silva", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:3, 
			name:"Dr José Alvaro", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:4, 
			name:"Dra Tais Almeida", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
	] },
	 { id:18,title: 'Phisioterapist 6', doctors: [
		{
			id:1, 
			name:"Dr Alex Junior de Araujo", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:2, 
			name:"Dra Marcela da Silva", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:3, 
			name:"Dr José Alvaro", 
			gender:"m",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
		{
			id:4, 
			name:"Dra Tais Almeida", 
			gender:"f",
			description:"Dermatologist (Skin spots, Hair and nail diseases, Early detection of skin cancer, Aesthetic dermatology" ,
			data:[
				{name:'Today',data:
					[
						{hour:'11:00', status:1},
						{hour:'12:00', status:2},
						{hour:'13:00', status:1},
						{hour:'14:00', status:3},
						{hour:'15:00', status:2},
						{hour:'16:00', status:1},
					]
				},
				{name:'Tomorow',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Sunday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
				{name:'Monday',data:
				[
					{hour:'11:00', status:1},
					{hour:'12:00', status:2},
					{hour:'13:00', status:1},
					{hour:'14:00', status:3},
					{hour:'15:00', status:2},
					{hour:'16:00', status:1},
				]
				},
			]
		},
	] },
  ];