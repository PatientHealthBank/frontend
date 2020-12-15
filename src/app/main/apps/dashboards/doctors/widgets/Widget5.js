import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Rating from '@material-ui/lab/Rating';
import TableCalendar from './TableCalendar'
import React from 'react';

function Widget5(props) {
	const { clinic, providers, specialty, clinicalInterest } = props;

	return (
		<div className="w-full">
			{(providers && providers.map(provider => (
				<div key={provider.id} className="w-full lg:inline-flex md:flex" style={{  marginBottom: "10px", height:"260px" }}>
					<Paper className="w-full lg:w-1/2 md:w-full rounded-8 shadow-1">
						<div className="flex items-center justify-between px-16 py-16 border-b-1">
							<div style={{ fontSize: '19px' }}><strong>{provider.name}</strong></div>
							<div className="items-center">

							</div>
						</div>
						<div className="flex flex-row">
							<div className="w-full md:w-3/12  p-8 min-h-420 h-420">

								<div style={{ textAlign: 'center', verticalAlign: "middle" }}>
									{provider.gender == 1 ?
										(<img src="assets/images/avatars/doctor-male.png" style={{
											display: 'block', marginLeft: 'auto',
											marginRight: 'auto',
											width: '50%',
											alignSelf: 'center',
											marginBottom: '10px'
										}} alt="Logo" />) :
										(<img src="assets/images/avatars/doctor-female.png" style={{
											display: 'block', marginLeft: 'auto',
											marginRight: 'auto',
											width: '50%',
											alignSelf: 'center',
											marginBottom: '10px'
										}} alt="Logo" />)
									}

									{provider.telemedicine && (<div style={{ display: "inline-flex", color: 'green' }}>	<Icon>camera_alt</Icon>	<div style={{ marginLeft: '10px' }}>Telemedicine</div></div>)}
								</div>
							</div>
							<div className="flex w-full md:w-7/12 flex-wrap p-8">
								<div>
									{specialty && <div><strong>{specialty}</strong></div>}
									{clinicalInterest && <div><strong>{clinicalInterest}</strong></div>}


									<div style={{ fontSize: 'revert', paddingTop: "5px", paddingBottom: '5px' }}>{provider.description}</div>
									<Rating name="read-only" precision={0.1} value={provider.rating} readOnly />
								</div>
							</div>
						</div>
					</Paper>
					<Paper className="w-full lg:w-1/2 md:w-full rounded-8 shadow-1 overflow-auto" >
						<div className="flex flex-row">
							<div className="w-full p-8" style={{ textAlign: '-webkit-center', overflow:"auto" }} >
								{ <TableCalendar  provider={provider} clinic={clinic}></TableCalendar> }
							</div>
						</div>
					</Paper>
					<br />
				</div>

			)))}
		</div>
	);
}

export default React.memo(Widget5);