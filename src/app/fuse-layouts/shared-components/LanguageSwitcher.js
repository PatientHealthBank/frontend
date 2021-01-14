import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeLanguage } from 'app/store/i18nSlice';
import Moment from 'react-moment';
var moment = require('moment-timezone');

const languages = [
	{
		id: 'en',
		title: 'English',
		flag: 'us'
	},
	{
		id: 'br',
		title: 'Brazil',
		flag: 'br'
	}
];

function LanguageSwitcher({ primary }) {
	Moment.globalMoment = moment;
	const dispatch = useDispatch();
	const currentLanguageId = useSelector(({ i18n }) => i18n.language);
	const currentLanguage = languages.find(lng => lng.id === currentLanguageId);

	const languageSettings = {
		br: {
			locale: 'br',
			globalFormat: 'DD/MM/YYYY HH:mm',
			globalTimezone: "America/Sao_Paulo"
		},
		en: {
			locale: 'us',
			globalFormat: 'MM/DD/YYYY HH:mm',
			globalTimezone: "America/Los_Angeles"
		}
	}

	console.log('current language', currentLanguage)
	Moment.globalLocale = languageSettings[currentLanguage.id].locale;
	Moment.globalFormat = languageSettings[currentLanguage.id].globalFormat;
	Moment.globalTimezone = languageSettings[currentLanguage.id].globalTimezone;
	Moment.globalLocal = true;
	Moment.globalElement = 'span';
	Moment.globalFilter = (d) => {
		return d.toUpperCase();
	};
	const [menu, setMenu] = useState(null);

	const langMenuClick = event => {
		setMenu(event.currentTarget);
	};

	const langMenuClose = () => {
		setMenu(null);
	};

	function handleLanguageChange(lng) {
		dispatch(changeLanguage(lng.id));

		langMenuClose();
	}

	return (
		<>
			<Button className="h-40 w-64" onClick={langMenuClick}>
				<img
					className="mx-4 min-w-20"
					src={`assets/images/flags/${currentLanguage.flag}.png`}
					alt={currentLanguage.title}
				/>

				<Typography className="mx-4 font-bold" color={primary ?? "textSecondary"}>
					{currentLanguage.id}
				</Typography>
			</Button>

			<Popover
				open={Boolean(menu)}
				anchorEl={menu}
				onClose={langMenuClose}
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
				{languages.map(lng => (
					<MenuItem key={lng.id} onClick={() => handleLanguageChange(lng)}>
						<ListItemIcon className="min-w-40">
							<img className="min-w-20" src={`assets/images/flags/${lng.flag}.png`} alt={lng.title} />
						</ListItemIcon>
						<ListItemText primary={lng.title} />
					</MenuItem>
				))}
			</Popover>
		</>
	);
}

export default LanguageSwitcher;
