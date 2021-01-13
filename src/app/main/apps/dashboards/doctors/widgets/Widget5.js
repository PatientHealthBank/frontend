import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Rating from '@material-ui/lab/Rating';
import TableCalendar from './TableCalendar';
import Tooltip from '@material-ui/core/Tooltip';

import React from 'react';

function Widget5(props) {
	const { clinic, providers, specialty, clinicalInterest, events } = props;

	return (
		<div className="w-full" align="center">
			{providers &&
				providers.map(provider => (
					<div
						key={provider.id}
						className="w-full lg:inline-flex md:flex"
						style={{ marginBottom: '50px', height: '260px' }}
					>
						<Paper className="w-full lg:w-1/2 md:w-full  shadow-1">
							<div>
								<div style={{ fontSize: '19px' }}>
					
									<strong>{provider.name}</strong>
								</div>
								<div className="items-center"></div>
							</div>
							<div>
								<div className=" md:w-3/12   min-h-420 h-420">
									<div style={{ textAlign: 'center', verticalAlign: 'middle' }}>
										{provider.gender == 1 ? (
											<img
												src="assets/images/avatars/doctor-male.png"
												style={{
													display: 'block',
													marginLeft: 'auto',
													marginRight: 'auto',
													width: '50%',
													alignSelf: 'center'
												}}
												alt="Logo"
											/>
										) : (
											<img
												src="assets/images/avatars/doctor-female.png"
												style={{
													display: 'block',
													marginLeft: 'auto',
													marginRight: 'auto',
													width: '50%',
													alignSelf: 'center'
												}}
												alt="Logo"
											/>
										)}
									</div>
									{provider.telemedicine && (
										      <Tooltip title="Telemedicine" aria-label="Telemedicine">

										<div 
											style={{
												color: 'green',
												top: '0',
												margin: '5px;',
												marginTop:'5px;',
												padding: '0px;',
											}}
										>
											{' '}
											<Icon>camera_alt</Icon> 
										</div>
										</Tooltip>
									)}
								</div>
								<div>
									<br></br>
									<div>
										{specialty && (
											<div>
												<strong>{specialty}</strong>
											</div>
										)}
										{clinicalInterest && (
											<div>
												<strong>{clinicalInterest}</strong>
											</div>
										)}

										<div style={{ fontSize: 'revert', paddingTop: '5px', paddingBottom: '5px' }}>
											{provider.description}
										</div>
										<Rating name="read-only" precision={0.1} value={provider.rating} readOnly />
									</div>
								</div>
							</div>
						</Paper>
						<Paper className="  overflow-auto">
							<div className="flex flex-row">
								<div style={{ textAlign: '-webkit-center', overflow: 'auto' }}>
									{
										<TableCalendar
											provider={provider}
											clinic={clinic}
											events={events}
										></TableCalendar>
									}
								</div>
							</div>
						</Paper>
					</div>
				))}
		</div>
	);
}

export default React.memo(Widget5);
