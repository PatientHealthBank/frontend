import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import React, { useRef } from 'react';
import FuseNavigation from '@fuse/core/FuseNavigation/FuseNavigation';
import FusePageSimple from '@fuse/core/FusePageSimple/FusePageSimple';
import FuseSuspense from '@fuse/core/FuseSuspense';
import { renderRoutes } from 'react-router-config';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import ProfileNavigation from './ProfileNavigation';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import withReducer from 'app/store/withReducer';
import reducer from './store';
import phbApi from 'app/services/phbApi';
import { patientInfo } from './store/patientInformationSlice';



function ProfilePage({ content, route }) {
	const user = useSelector(({ auth }) => auth.user);
	const dispatch = useDispatch();
	const patientInformation = useSelector(({ ProfilesApp }) => ProfilesApp.patientInformation);
   
	React.useEffect(() => {
        dispatch(patientInfo())
    }, [dispatch]);

	var currentPhoto = '';

	if (patientInformation) {
		currentPhoto = patientInformation.photoURL;
		currentPhoto = "https://phbbucket.s3.us-east-2.amazonaws.com/profileImages/"+ currentPhoto;
    }

	const pageLayout = useRef(null);

	if(user.role == 'caregiver') {
		return false;
	}
		

	return (
		<FusePageSimple
			layout={1}
			classes={{
				root: 'h-full',
				contentWrapper: 'pl-16 md:p-24',
				content: 'flex flex-col h-full',
				leftSidebar: 'w-288 pt-8',
				wrapper: 'min-h-0'
			}}
			content={
				<div className="max-w-2xl flex flex-auto flex-col">
					<div className="flex flex-col flex-1 relative">
						<Card className="h-full">
							<CardContent>
								<FuseSuspense>{renderRoutes(route.routes)}</FuseSuspense>
							</CardContent>
						</Card>
					</div>
				</div>

			}

			rightSidebarHeader={
				<div className="p-12">
					<Grid container>
						<Grid item xs={8}>
							<Typography
								variant="h6"
								color="inherit"
							>
								{user.currentUser.displayName}
							</Typography>
							<Typography variant="subtitle1">{user.role}</Typography>
						</Grid>
						<Grid item xs={4}>
							<Avatar className="w-64 h-64" src={currentPhoto} />
						</Grid>
					</Grid>
				</div>
			}

			rightSidebarContent={
				<FuseNavigation className={clsx('navigation')} navigation={ProfileNavigation.children} />
			}
			ref={pageLayout}
		/>
	);
}

export default withReducer('ProfilesApp', reducer)(ProfilePage);

