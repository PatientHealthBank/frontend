import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles({
	todoItem: {
		'&.completed': {
			background: 'rgba(0,0,0,0.03)',
			'& .todo-title, & .todo-notes': {
				textDecoration: 'line-through'
			}
		}
	}
});

function InstructionsListItem(props) {
	const classes = useStyles(props);

	return (
		<ListItem
			className={clsx(
				classes.todoItem,
				{ completed: props.todo.completed },
				'border-solid border-b-1 py-16 px-0 sm:px-8'
			)}
			onClick={ev => {
				ev.preventDefault();
			
			}}
			dense
			button
		>
			<Checkbox
				tabIndex={-1}
				disableRipple
				checked={props.todo.completed}
				onClick={ev => ev.stopPropagation()}
			/>

			<div className="flex flex-1 flex-col relative overflow-hidden px-8">
				<Typography
					variant="subtitle1"
					className="todo-title truncate"
					color={props.todo.completed ? 'textSecondary' : 'inherit'}
				>
					{props.todo.description}
				</Typography>
			</div>
		</ListItem>
	);
}

export default InstructionsListItem;
