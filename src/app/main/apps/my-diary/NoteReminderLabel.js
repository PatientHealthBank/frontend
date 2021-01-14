import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import moment from 'moment';
import React from 'react';
import Moment from 'react-moment'
import { useTranslation } from "react-i18next";

function NoteLabel(props) {
	const { t } = useTranslation();

	if (!props.date) {
		return null;
	}

	return (
		<Chip
			icon={<Icon className="text-16">access_time</Icon>}
			label={(<Moment date={props.date}/>)}
			classes={{
				root: clsx('h-24', props.className),
				label: 'px-12 py-4 text-11',
				deleteIcon: 'w-16',
				...props.classes
			}}
			variant="outlined"
			onDelete={props.onDelete}
		/>
	);
}

export default NoteLabel;
