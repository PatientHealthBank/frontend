import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import _ from '@lodash';
import React from 'react';
import {Link} from 'react-router-dom'

function Widget5(props) {
	const theme = useTheme();
	const {specialty, city} = props;

	const widget = _.merge({}, props.widget);

	_.setWith(widget, 'widget.mainChart.options.scales.xAxes[0].ticks.fontColor', theme.palette.text.secondary);
	_.setWith(widget, 'widget.mainChart.options.scales.yAxes[0].ticks.fontColor', theme.palette.text.secondary);


	return (
		<div className="w-full">
		{(clinics.filter(x=>(x.specialty.toLowerCase() === specialty.toLowerCase() && x.city.toLowerCase() === city.toLowerCase())).map(x=>(
			<Link to={"/find-doctors/" + x.id}>

			<Paper className="w-full rounded-8 shadow-1">
				<div className="flex items-center justify-between px-16 py-16 border-b-1">
		<Typography variant="h5"><strong>{x.title}</strong></Typography>
					<div className="items-center">
						
					</div>
				</div>
				<div className="flex flex-row flex-wrap">
					<div className="w-full md:w-1/4 p-8 min-h-420 h-420">
					<img src="assets/images/logos/clinic.png" style={{margin:'30px'}} alt="Logo"/>
					</div>
					<div className="flex w-full md:w-3/4 flex-wrap p-8">
						<div>
		<div style={{fontSize:'large', paddingTop:"5px", paddingBottom:'5px'}}><strong style={{marginRight:'5px'}}>Adress:</strong> {x.Address}</div>	
						<div style={{fontSize:'large',  paddingTop:"5px", paddingBottom:'5px'}}><strong style={{marginRight:'5px'}}>Phone:</strong> (31) 3322-3322</div>
						<img src="assets/images/stars/2stars.png" alt="Logo"/>
						</div>
					</div>
				</div>
			</Paper>
			<br/>
			</Link>

		))	)}
		</div>
	);
}

export default React.memo(Widget5);


const clinics = [
	{ id:1,title: 'Physical Therapist 1', specialty:"Physical Therapist",
	 city:"Belo Horizonte", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Belo Horizonte - Minas Gerais" },
	 { id:2,title: 'Physical Therapist 2', specialty:"Physical Therapist",
	 city:"Belo Horizonte", Address:"Edifício Lamark - Avenida Afonso Pena, 487 - 1101, Belo Horizonte - Minas Gerais" },
	 { id:3,title: 'Physical Therapist 3', specialty:"Physical Therapist",
	 city:"Belo Horizonte", Address:"Avenida Amazonas, 4747 - 1101, Belo Horizonte - Minas Gerais" },
	 { id:4,title: 'Physical Therapist 4', specialty:"Physical Therapist",
	 city:"Boston", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Boston - Minas Gerais" },
	 { id:5,title: 'Physical Therapist 5', specialty:"Physical Therapist",
	 city:"Boston", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Boston - Minas Gerais" },
	 { id:6,title: 'Physical Therapist 6', specialty:"Physical Therapist",
	 city:"Boston", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Boston - Minas Gerais" },
	 { id:7,title: 'Orthopedic Surgeon 1', specialty:"Orthopedic Surgeon",
	 city:"Belo Horizonte", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Belo Horizonte - Minas Gerais" },
	 { id:8,title: 'Orthopedic Surgeon 2', specialty:"Orthopedic Surgeon",
	 city:"Belo Horizonte", Address:"Edifício Lamark - Avenida Afonso Pena, 487 - 1101, Belo Horizonte - Minas Gerais" },
	 { id:9,title: 'Orthopedic Surgeon 3', specialty:"Orthopedic Surgeon",
	 city:"Belo Horizonte", Address:"Avenida Amazonas, 4747 - 1101, Belo Horizonte - Minas Gerais" },
	 { id:10,title: 'Orthopedic Surgeon 4', specialty:"Orthopedic Surgeon",
	 city:"Boston", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Boston - Minas Gerais" },
	 { id:11,title: 'Orthopedic Surgeon 5', specialty:"Orthopedic Surgeon",
	 city:"Boston", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Boston - Minas Gerais" },
	 { id:12,title: 'Orthopedic Surgeon 6', specialty:"Orthopedic Surgeon",
	 city:"Boston", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Boston - Minas Gerais" },
	 { id:13,title: 'Sports Medicine 1', specialty:"Sports Medicine",
	 city:"Belo Horizonte", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Belo Horizonte - Minas Gerais" },
	 { id:14,title: 'Sports Medicine 2', specialty:"Sports Medicine",
	 city:"Belo Horizonte", Address:"Edifício Lamark - Avenida Afonso Pena, 487 - 1101, Belo Horizonte - Minas Gerais" },
	 { id:15,title: 'Sports Medicine 3', specialty:"Sports Medicine",
	 city:"Belo Horizonte", Address:"Avenida Amazonas, 4747 - 1101, Belo Horizonte - Minas Gerais" },
	 { id:16,title: 'Sports Medicine 4', specialty:"Sports Medicine",
	 city:"Boston", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Boston - Minas Gerais" },
	 { id:17,title: 'Sports Medicine 5', specialty:"Sports Medicine",
	 city:"Boston", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Boston - Minas Gerais" },
	 { id:18,title: 'Sports Medicine 6', specialty:"Sports Medicine",
	 city:"Boston", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Boston - Minas Gerais" },
	{ id:19,title: 'Sports Medicine 7', specialty:"Sports Medicine",
	 city:"Miami", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Boston - Minas Gerais" },
	 { id:20,title: 'Sports Medicine 8', specialty:"Sports Medicine",
	 city:"Miami", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Boston - Minas Gerais" },
	 { id:21,title: 'Sports Medicine 9', specialty:"Sports Medicine",
	 city:"Miami", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Boston - Minas Gerais" },
	 { id:22,title: 'Orthopedic Surgeon 4', specialty:"Orthopedic Surgeon",
	 city:"Miami", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Boston - Minas Gerais" },
	 { id:23,title: 'Orthopedic Surgeon 5', specialty:"Orthopedic Surgeon",
	 city:"Miami", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Boston - Minas Gerais" },
	 { id:24,title: 'Orthopedic Surgeon 6', specialty:"Orthopedic Surgeon",
	 city:"Miami", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Boston - Minas Gerais" },
	 { id:25,title: 'Physical Therapist 4', specialty:"Physical Therapist",
	 city:"Miami", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Boston - Minas Gerais" },
	 { id:26,title: 'Physical Therapist 5', specialty:"Physical Therapist",
	 city:"Miami", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Boston - Minas Gerais" },
	 { id:27,title: 'Physical Therapist 6', specialty:"Physical Therapist",
	 city:"Miami", Address:"Edifício LifeCenter - Avenida do Contorno, 4747 - 1101, Boston - Minas Gerais" },	 
  ];
