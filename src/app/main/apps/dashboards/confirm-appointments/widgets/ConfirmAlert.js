
import './Calendar.css';
import React from 'react';

function ConfirmAlert(props) {


	return (
		<div className="w-full p-8 min-h-420 h-420">
			<div style={{marginLeft:'1em', fontSize: '26px', color:'#CA3131'}}><strong>Alerts</strong></div>
            <div style={{border: '1px solid black', padding: '1em 2em 1em 2em',backgroundColor:"#F8F8F8", fontWeight:'1000'}}>
           		<div><p>Dear Client,</p></div><br/>
				<p>When coming to you appointment please note the following options:</p>
				<br/>
					
				<p>• If you are driving please bring you car to the valer parking area ($5/hour fee) or park across the street (check their available rates) and follow the signs to our main entrance.</p>
				<br/>
					
				<p>• If you will be dropped-off, please follow the signs to the temporary parking area and then walk to our main entrance. If you have any disabilities, we have a special area assigned for your convenience and support. Please follow the signs near our temporary parking area;</p>
				<br/>
					
				<p>• If you are taking public transportation, please check the options that will bring you closer to our office and proceed to our main entrance.</p>
				<br/>
					
				<p>Don't forget to bring you ID and insurance card.</p>
				<br/>
				
				<p>If you have any questions, please call (888)555.33.22</p>
				<br/>
            </div>
		</div>  
	);
}

export default React.memo(ConfirmAlert);