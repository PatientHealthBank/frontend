import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

function MedicationDialog({open, setOpen, setMedicines}) {

    const [form, setForm] = useState("Pill")
    const [compound, setCompound] = useState("")
    const [dosage, setDosage] = useState(0)
    const [frequency, setFrequency] = useState("")


      const handleCompound = (event) => {
        setCompound(event.target.value);
      };
      const handleDosage = (event) => {
        setDosage(event.target.value);
      };
     const handleFrequency = (event) => {
        setFrequency(event.target.value);
      };

  const handleChange = (event) => {
    setForm(event.target.value);
  };

  const handleClose = () => {
      const date = new Date()
      const medicine = {
        form: form+ " mg",
        compound,
        dosage,
        frequency,
        dates:`${date.getFullYear()}-${date.getMonth()}=${date.getDate()}`
      }
      setMedicines(medicine)
    setOpen(false);
   
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add drug"}</DialogTitle>
        <DialogContent>
            <div className="flex flex-col">
            <TextField
                id="Dosage"
                label="Dosage"
                type="number"
                value={dosage}
                onChange={handleDosage}
            />
            <TextField
                id="Compound"
                label="Compound"
                value={compound}
                onChange={handleCompound}
                />
             <Select
             style={{marginTop: '13px'}}
                labelId="Form"
                id="Form"
                value={form}
                onChange={handleChange}
                >
                    <MenuItem  value="Pill">Pill</MenuItem >
                    <MenuItem  value="Capsule">Capsule</MenuItem >

            </Select>
            <TextField
                id="Frequency"
                label="Frequency"
                value={frequency}
                onChange={handleFrequency}
                />
            </div>
        </DialogContent>
        <DialogActions>
        <Button onClick={()=>{setOpen(false)}} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default MedicationDialog