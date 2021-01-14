import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { green } from '@material-ui/core/colors';
import { logoutUser, setCurrentUser } from 'app/auth/store/userSlice';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	avatar: {
		backgroundColor: '#FFF',
		width: theme.spacing(4),
		height: theme.spacing(4),
		marginRight: '5px'
	},	
	avatarMain: {
		backgroundColor: '#FFF',
		width: theme.spacing(5),
		height: theme.spacing(5),
		marginLeft: '5px'
	},
}));

function UserMenu(props) {
	const dispatch = useDispatch();

	const classes = useStyles();
	const user = useSelector(({ auth }) => auth.user); 
	const photoUrl = "https://phbbucket.s3.us-east-2.amazonaws.com/profileImages/"+ user.currentUser.photoUrl ;

	const [userMenu, setUserMenu] = useState(null);

	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};	
	const setNewCurrentUser = (dependent) => {
		dispatch(setCurrentUser(dependent))
		setUserMenu(null);
	};

	return (
		<>
			<Button className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6" onClick={userMenuClick}>
				<div className="hidden md:flex flex-col mx-4">
					<Typography component="span" className="normal-case font-bold flex">
						{user.currentUser.displayName}
					</Typography>
					<Typography className="text-11 capitalize text-left" color="textSecondary">
						{user.role.toString()}
						{(!user.role || (Array.isArray(user.role) && user.role.length === 0)) && 'Patient'}
					</Typography>
				</div>

				{user.currentUser.photoUrl ? (

					<Avatar className="md:mx-4" alt="user photo" src={photoUrl} />
				) : (
						<Avatar className={classes.avatarMain} >{user.currentUser.displayName[0]}</Avatar>
					)}
			</Button>

			<Popover
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				classes={{
					paper: 'py-8'
				}}
			>
				{!user.role || user.role.length === 0 ? (
					<>
						<MenuItem component={Link} to="/login" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>lock</Icon>
							</ListItemIcon>
							<ListItemText primary="Login" />
						</MenuItem>
						<MenuItem component={Link} to="/register" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>person_add</Icon>
							</ListItemIcon>
							<ListItemText primary="Register" />
						</MenuItem>
					</>
				) : (
						<>
							{user.dependents && user.dependents.length > 1 &&
								<>
									{user.dependents.map((depedent) =>
										<MenuItem onClick={()=> setNewCurrentUser(depedent)} role="button">
											<ListItemIcon className="min-w-40">
												<Avatar className={classes.avatar} sizes="small" >{depedent.displayName[0].toUpperCase()}</Avatar>
											</ListItemIcon>
											<ListItemText primary={depedent.displayName} />
										</MenuItem>)}

									<Divider />
								</>
							}
							{user.role != 'caregiver' && 
									    <> 
								<MenuItem component={Link} to="/pages/profile" onClick={userMenuClose} role="button">
									
											<ListItemIcon className="min-w-40">
												<Icon>account_circle</Icon>
											</ListItemIcon>
											<ListItemText primary="My Profile" />
									
								</MenuItem>
								</>
							}
								<MenuItem
									onClick={() => {
										dispatch(logoutUser());
										userMenuClose();
									}}
								>
									<ListItemIcon className="min-w-40">
										<Icon>exit_to_app</Icon>
									</ListItemIcon>
									<ListItemText primary="Logout" />
								</MenuItem>
							
						</>
					)}
			</Popover>
		</>
	);
}

export default UserMenu;
