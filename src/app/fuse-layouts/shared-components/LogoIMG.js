import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		'&.user': {
			'& .username, & .email': {
				transition: theme.transitions.create('opacity', {
					duration: theme.transitions.duration.shortest,
					easing: theme.transitions.easing.easeInOut
				})
			}
		},
		'& .logo-icon': {
			width: 100,
			height: 50,			
		},
    },
    logo:{
        width:'50%'
    }
}));


const LogoImg = ({header}) => {
    const classes = useStyles();
    return (
        <img className={classes.logo} src="assets/images/logos/LogoReduzida.png" alt="Logo"/>
    )
}

export default LogoImg;
