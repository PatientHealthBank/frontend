import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import clsx from 'clsx';
import _ from '@lodash';
import { useCallback, useState } from 'react';
function AppointmentCheckList({ appointmentCheckList, setForm, handleChange, classes }) {
    console.log(appointmentCheckList)

    function handleChangeCheckBox(event, id) {
        let newCheckList = appointmentCheckList.map(item=>{
            return {
                id:item.id,
                description:item.description,
                isChecked: item.id==id ? event.target.checked:item.isChecked
            }
        });
            setForm(_form =>
                _.setIn(
                    { ..._form },
                    'appointmentCheckList',
                    newCheckList
                )
            );
    }

    if (!appointmentCheckList || appointmentCheckList === 0) {
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
                {appointmentCheckList.map((checkList, i) => (
                    <ListItem
                        className={clsx(
                            classes.checkListItem,
                            { completed: checkList.isChecked },
                            'border-solid border-b-1 py-16 px-0 sm:px-8'
                        )}
                        dense
                        button
                    >
                        <Checkbox
                            tabIndex={-1}
                            disableRipple
                            onClick={event => handleChangeCheckBox(event, checkList.id)}
                            checked={checkList.isChecked}
                        />

                        <div className="flex flex-1 flex-col relative overflow-hidden px-8">
                            <Typography
                                variant="subtitle1"
                                className="todo-title truncate"
                                color={checkList.isChecked ? 'textSecondary' : 'inherit'}
                            >
                                {checkList.description}
                            </Typography>
                        </div>
                    </ListItem>
                ))}
            </FuseAnimateGroup>
        </List>
    );
}

export default AppointmentCheckList;
