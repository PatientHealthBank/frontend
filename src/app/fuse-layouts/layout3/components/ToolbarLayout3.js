import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import LogoImg from 'app/fuse-layouts/shared-components/LogoIMG';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import { selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import Button from '@material-ui/core/Button';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';
import { withRouter } from 'react-router-dom';
  
  const ColorButton = withStyles((theme) => ({
	root: {
	  color: "#FFF",
	  backgroundColor: "#8CC63F",
	  '&:hover': {
		backgroundColor: "#8aa63F",
	  },
	},
  }))(Button);

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(1),
	  },
	  extendedIcon: {
		marginRight: theme.spacing(1),
	  },
}));


function ToolbarLayout3(props) {
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const toolbarTheme = useSelector(selectToolbarTheme);

	const classes = useStyles(props);
	function handleLogin(){
		props.history.push(`/login`);
	}
	function handleRegister(){
		props.history.push(`/register`);
	}
 	const token = localStorage.getItem('jwt_access_token');

	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="fuse-toolbar"
				className={clsx(classes.root, 'flex relative z-10')}
				color="default"
				style={{ backgroundColor: token ? "#24aae0" : toolbarTheme.palette.findAClininc.paper }}
				elevation={2}
			>
				<Toolbar className="container p-0 lg:px-24 min-h-48 md:min-h-64">
					{config.navbar.display && (
						<Hidden lgUp>
							<NavbarMobileToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
						</Hidden>
					)}

					<Hidden mdDown>
						<div className={clsx('flex flex-shrink-0 items-center')}>
							<LogoImg header={true}/>
						</div>
					</Hidden>

					<div className="flex flex-1">
					<Hidden mdDown>
							<Button size="small" color="primary" style={{color: token ? '#FFF' : '#000' }} className={classes.margin}>
							About
							</Button>
							<Button size="small" color="primary" style={{color: token ? '#FFF' : '#000' }}  className={classes.margin}>
							Patients
							</Button>
							<Button size="small" color="primary" style={{color: token ? '#FFF' : '#000' }}  className={classes.margin}>
							Healthcare Providers
							</Button>
							<Button size="small" color="primary" style={{color: token ? '#FFF' : '#000' }}  className={classes.margin}>
							Contact Us
							</Button>
					</Hidden>
					</div>

					<div className="flex items-center px-8 md:px-0">
						<LanguageSwitcher primary={!token? "primary" : ""}/>

						{!token ?
							<><Button size="small" color="primary" onClick={handleLogin} className={classes.margin}>
							Sign in
							</Button>
							
							<ColorButton variant="contained" onClick={handleRegister} className={classes.margin}>
								Sign Up
							</ColorButton></>
							:
							<UserMenu />
						}
					</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default  withRouter(React.memo(ToolbarLayout3));
