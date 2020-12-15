import React from 'react';


function Widget5(props) {
	return (
    <div style={{fontSize:'20px', paddingTop:"5px", paddingBottom:'5px'}}><strong>{props.children}</strong></div>	
	);
}

export default React.memo(Widget5);