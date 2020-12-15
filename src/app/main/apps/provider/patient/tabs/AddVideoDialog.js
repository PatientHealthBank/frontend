import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';

function AddVideoDialog({ open, setOpen, setVideoLibrary, videos }) {
  
// eslint-disable-next-line 
  const [form, setForm] = useState("Pill")
  // eslint-disable-next-line 
  const [compound, setCompound] = useState("")
  // eslint-disable-next-line 
  const [dosage, setDosage] = useState(0)
  // eslint-disable-next-line 
  const [frequency, setFrequency] = useState("")


  const handleClose = () => {
    const date = new Date()
    const medicine = {
      form: form + " mg",
      compound,
      dosage,
      frequency,
      dates: `${date.getFullYear()}-${date.getMonth()}=${date.getDate()}`
    }
    setVideoLibrary(medicine)
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
        <DialogTitle id="alert-dialog-title">{"Select Video"}</DialogTitle>
        <DialogContent>
          <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
            <FuseAnimateGroup
              enter={{
                animation: 'transition.slideUpBigIn'
              }}
            >
              {videos.map(period => (
                <div key={period.id} className="mb-48">
                  <ListSubheader component="div" className="flex items-center px-0 mb-24">
                    <Typography variant="h6">{period.otherName}</Typography>
                  </ListSubheader>
                  <GridList className="" spacing={8} cols={0}>
                    {period.media.map(media => (
                      <GridListTile
                        style={{ width: "110px", height: "90px" }}
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
                    {period.media.map(media => (
                      <GridListTile
                        style={{ width: "110px", height: "90px" }}
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
                    {period.media.map(media => (
                      <GridListTile
                        style={{ width: "110px", height: "90px" }}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false) }} color="primary" autoFocus>
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
export default AddVideoDialog;