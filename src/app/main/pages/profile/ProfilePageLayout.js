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
import clsx from 'clsx';

function ProfilePage({ content, route }) {
	// const classes = useStyles();
	const pageLayout = useRef(null);
	return (
		<FusePageSimple
			layout={1}
			classes={{
				root: 'h-full',
				contentWrapper: 'p-16 md:p-24',
				content: 'flex flex-col h-full',
				leftSidebar: 'w-288 pt-8',
				header: 'h-64 min-h-64',
				wrapper: 'min-h-0'
			}}
			content={
				<div className="max-w-2xl flex flex-auto flex-col">
					<div className="flex flex-col flex-1 relative py-32">
						<Card className="h-full">
							<CardContent>
								{console.log(route)}
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
								John Doe
							</Typography>
							<Typography variant="subtitle1">Patient</Typography>
						</Grid>
						<Grid item xs={4}>
							<Avatar className="w-64 h-64" src="assets/images/avatars/Velazquez.jpg" />
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

export default ProfilePage;
