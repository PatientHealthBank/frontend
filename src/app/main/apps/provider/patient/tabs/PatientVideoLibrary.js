import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import PrimaryIconButton from '../../../../Components/PrimaryIconButton';
import React, { useState } from 'react';
import AddVideoDialog from './AddVideoDialog';

function PatientVideoLibrary({ videos }) {
	const [openVideoLibrary, setOpenVideoLibrary] = useState(false);

	const handleAddTreatment = () => {
		setOpenVideoLibrary(true);
	}

	const setVideoLibrary = (video) => {


	}


	return (
		<>
			<AddVideoDialog open={openVideoLibrary} setVideoLibrary={setVideoLibrary} videos={videos} setOpen={setOpenVideoLibrary} />
			<div className="flex items-center">
				<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h5">
					Recomend new Video
		            </Typography>
				<Tooltip title="Add" aria-label="add">

					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h5">
						<PrimaryIconButton size="medium" color="secondary" onClick={handleAddTreatment}>
							<Icon>add</Icon>
						</PrimaryIconButton>
					</Typography>
				</Tooltip>
				<Tooltip title="Upload Patient Video" aria-label="Upload Patient Video">
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h5">
						<label htmlFor="upload-photo">
							<input
								style={{ display: 'none' }}
								id="upload-photo"
								name="upload-photo"
								type="file"
							/>
							<Fab type="file" color="primary" size="medium" component="span" aria-label="add">
								<Icon>backup</Icon>
							</Fab>
						</label>
					</Typography>
				</Tooltip>
			</div>
			<div className="mt-16 md:flex max-w-2xl">
				<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
					<FuseAnimateGroup
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						{videos.map(period => (
							<div key={period.id} className="mb-48">
								<ListSubheader component="div" className="flex items-center px-0 mb-24">
									<Typography variant="h6">{period.name}</Typography>
									<Typography className="mx-16" variant="subtitle1" color="textSecondary">
										{period.info}
									</Typography>
								</ListSubheader>

								<GridList className="" spacing={8} cols={0}>
									{period.media.map(media => (
										<GridListTile
											classes={{
												root: 'w-full sm:w-1/2 md:w-1/4',
												tile: 'rounded-8'
											}}
											key={media.preview}
										>
											<img src={media.preview} alt={media.title} />
											<GridListTileBar
												title={media.title}
												actionIcon={
													<IconButton>
														<Icon className="text-white opacity-75">info</Icon>
													</IconButton>
												}
											/>
										</GridListTile>
									))}
								</GridList>
							</div>
						))}
					</FuseAnimateGroup>
				</div>
			</div>
		</>
	);
}

export default PatientVideoLibrary;
