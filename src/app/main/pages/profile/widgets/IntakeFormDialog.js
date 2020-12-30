import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export default function AlertDialog({ open, setOpen, intakeForms, newIntakeForm }) {
    const [form, setForm] = React.useState("")
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                    
                <DialogTitle id="alert-dialog-title">{"Select a new intakeform to Answer"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <FormControl fullWidth variant="outlined" className="mt-8 mb-16">
                        <InputLabel htmlFor="outlined-age-native-simple">IntakeForms</InputLabel>
                            <Select
                                native
                                value={form}
                                id={"intakeform"}
                                name={"intakeform"}
                                onChange={event => setForm(event.target.value)}
                                label={"IntakeForms"}
                                inputProps={{
                                    id: 'intakeform',
                                }}
                            >
                                <option value=""></option>
                                {intakeForms.map(option =>
                                    <option value={option.id}>{option.description}</option>
                                )}
                            </Select>
                        </FormControl>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
          </Button>
                    <Button disabled={!form} onClick={()=> {newIntakeForm(form); setForm("")}} color="primary" autoFocus>
                        Add
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}