import _ from '@lodash';
import TextField from '@material-ui/core/TextField';
import { withFormsy } from 'formsy-react';
import React from 'react';

function TextFieldFormsy(props) {
	const importedProps = _.pick(props, [
		'autoComplete',
		'autoFocus',
		'children',
		'className',
		'defaultValue',
		'disabled',
		'FormHelperTextProps',
		'fullWidth',
		'id',
		'InputLabelProps',
		'inputProps',
		'InputProps',
		'inputRef',
		'label',
		'multiline',
		'name',
		'onBlur',
		'onChange',
		'onFocus',
		'onInput',
		'placeholder',
		'required',
		'rows',
		'rowsMax',
		'select',
		'maxLength',
		'SelectProps',
		'type',
		'variant',
		'color'
	]);

	const { errorMessage } = props;
	const value = props.value || '';

	function changeValue(event) {
		props.setValue(event.currentTarget.value);
		if (props.onChange) {
			props.onChange(event);
		}
	}

	return (
		<TextField
			{...importedProps}
			onInput = {(e) =>{
				if(props.maxLength)
					e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,props.maxLength)
			}}
			onChange={changeValue}
			value={value}
			error={Boolean((!props.isPristine && props.showRequired) || errorMessage)}
			helperText={errorMessage}
		/>
	);
}

export default React.memo(withFormsy(TextFieldFormsy));
