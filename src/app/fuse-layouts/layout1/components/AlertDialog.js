import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import React from 'react';
import { withRouter } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useTranslation } from "react-i18next";
import { KeyboardDatePicker } from '@material-ui/pickers';

function AlertDialog({ open, setOpen, history }) {
  const [state, setState] = React.useState({
    Ferver: false,
    Cough: false,
    DifficultyBreathing: false,
    SoreThroat: false,
    Diarrhea: false,
    Fatigue: false,
    BodyAches: false,
    Headache: false,
    LossofTaste: false,
    Nausea: false,
    Congestion: false,
  });

  const renderSwitch = () => {
    switch (step) {
      case 1:
        return (
          <>
            <DialogContent>
              <DialogContentText>
                {t('CovidJorneyDesc')}
                <br />
                 Do you want to talk about your experiences related to COVID19?
                 </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setStep(2)} color="primary">
                {t('Yes')}
              </Button>
              <Button onClick={handleClose} color="primary">
                {t('No')}
              </Button>
            </DialogActions>
          </>)
      case 2:
        return (
          <>
            <DialogContent>
              <DialogContentText>
                You had COVID19 so now what?<br/>
                {t('CovidHelpIntroduction')}
                 </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setStep(3)} color="primary">
                {t('Next')}
              </Button>
            </DialogActions>
          </>)
      case 3:
        return (
          <>
            <DialogContent>
              <DialogContentText>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/DD/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date of 1st symptoms"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/DD/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date of diagnosis"
                  value={selectedDateDiagnosis}
                  onChange={handleDiagnosisDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setStep(4)} color="primary">
                {t('Next')}
              </Button>
            </DialogActions>
          </>)
      case 4:
        return (
          <>
            <DialogContent>
              <DialogContentText>
                <div style={{ display: "inline-flex" }}>
                  <div style={{ display: "grid" }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.Ferver}
                          onChange={handleChange}
                          name="Ferver"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}

                        />
                      }
                      label="Fever or Chills"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.Cough}
                          onChange={handleChange}
                          name="Cough"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                      }
                      label="New or Worsening Cough"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.DifficultyBreathing}
                          onChange={handleChange}
                          name="DifficultyBreathing"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}

                        />
                      }
                      label="Shortness of Breath/Difficulty Breathing"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.SoreThroat}
                          onChange={handleChange}
                          name="SoreThroat"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}

                        />
                      }
                      label="Sore Throat"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.Diarrhea}
                          onChange={handleChange}
                          name="Diarrhea"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}

                        />
                      }
                      label="Diarrhea"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.Fatigue}
                          onChange={handleChange}
                          name="Fatigue"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}

                        />
                      }
                      label="Fatigue"
                    />
                  </div><div style={{ display: "grid" }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.BodyAches}
                          onChange={handleChange}
                          name="BodyAches"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}

                        />
                      }
                      label="Muscle/Body Aches"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.Headache}
                          onChange={handleChange}
                          name="Headache"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}

                        />
                      }
                      label="Headache"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.LossofTaste}
                          onChange={handleChange}
                          name="LossofTaste"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}

                        />
                      }
                      label="New Loss of Taste or Smell"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.Nausea}
                          onChange={handleChange}
                          name="Nausea"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}

                        />
                      }
                      label="Nausea or Vomiting"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={state.Congestion}
                          onChange={handleChange}
                          name="Congestion"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}

                        />
                      }
                      label="Congestion or Runny Nose"
                    />
                  </div>
                </div>
              </DialogContentText>

            </DialogContent>

            <DialogActions>
              <Button onClick={() => setStep(5)} color="primary">
                {t('Next')}
              </Button>
            </DialogActions>
          </>)
      case 5:
        return (
          <>
            <DialogContent>
              <DialogContentText>
                Thanks for answering the questions
                     </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => handleClose()} color="primary">
                {t('Close')}
              </Button>
            </DialogActions>
          </>)
      default:

    }
  }
  const [step, setStep] = React.useState(1)
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [selectedDate, setSelectedDate] = React.useState();
   // eslint-disable-next-line 
  const [selectedDateDiagnosis, setSelectedDateDiagnosis] = React.useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDiagnosisDateChange = (date) => {
    selectedDateDiagnosis(date);
  };

  const handleClose = () => {
    localStorage.setItem("covid", true)
    setOpen(false);
  };
  const { t } = useTranslation();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick
      >
        <DialogTitle id="alert-dialog-title">My Journey with COVID19</DialogTitle>
        {renderSwitch()}
      </Dialog>
    </div>
  );
}
export default withRouter(AlertDialog)