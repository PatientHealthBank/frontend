import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import InstructionsListItem from './InstructionsListItem';

function InstructionsList(props) {


	if ( !props.instructions || props.instructions === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There are no Check List!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<List className="p-0">
			<FuseAnimateGroup
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
			>
				{props.instructions.map(todo => (
					<InstructionsListItem todo={todo} key={todo.id} />
				))}
			</FuseAnimateGroup>
		</List>
	);
}

export default InstructionsList;
