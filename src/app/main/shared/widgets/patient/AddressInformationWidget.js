import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import AddressFormDialog from './AddressFormDialog'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

function AddressInformationWidget(props) {

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState();

    const [id, setId] = useState(null);
    const [addressLine1, setAddress] = useState("");
    const [addressTypeId, setAddressTypeId] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");

    const handleOpenModal = (titleModal) => {
        setTitle(titleModal)
        setOpen(true);
    }

    const handleOpenModalEdit = (titleModal, row) => {
        setTitle(titleModal);
        setId(row.id);
        setAddress(row.addressLine1);
        setAddressTypeId(row.addressTypeId);
        setCountry(row.country);
        setCity(row.city);
        setState(row.state);
        setZipCode(row.zipCode);
        setOpen(true);
    }

    const handleDelete = (id) => {
        props.deleteAddresstInformation(id);
    }

    return (
        (
            <div>
                <div style={{ textAlign: 'center' }}>
                    <Typography className="mt-8 mb-16" variant="h6">
                        Address Info
						</Typography>
                </div>

                <Grid container spacing={3} direction="row">
                    {props.addresstInformation && props.addresstInformation.map(row => (
                        <Grid item xs={4}>
                            <Card className="w-full mb-16 rounded-8" key={row.id}>
                                <AppBar position="static" elevation={0}>
                                    <Toolbar className="px-8" variant="dense">
                                        <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
                                            Address - {row.addressTypeId === 1 ? 'Home' : (row.addressTypeId === 2 ? 'Business' : 'Other') }
                                        </Typography>
                                        <Tooltip title="Edit">
                                            <IconButton size="small" onClick={() => handleOpenModalEdit("Edit Address", row)} aria-label="delete">
                                                <Icon size="small">edit</Icon>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton size="small" onClick={() => handleDelete(row.id)} aria-label="delete">
                                                <DeleteIcon size="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Toolbar>
                                </AppBar>

                                <CardContent>
                                    <div className="mb-12">
                                        <Typography className="font-bold mb-4 text-15">Address</Typography>

                                        <div className="flex items-center">
                                            <Typography>{row.addressLine1}</Typography>
                                            <Icon className="text-16 mx-4" color="action">
                                                location_on
													</Icon>
                                        </div>
                                    </div>

                                    <div className="mb-12">
                                        <Typography className="font-bold mb-4 text-15">Country</Typography>
                                        <Typography>{row.country}</Typography>
                                    </div>

                                    <div className="mb-12">
                                        <Typography className="font-bold mb-4 text-15">City</Typography>
                                        <Typography>{row.city}</Typography>
                                    </div>

                                    <div className="mb-12">
                                        <Typography className="font-bold mb-4 text-15">State</Typography>
                                        <Typography>{row.state}</Typography>
                                    </div>

                                    <div className="mb-12">
                                        <Typography className="font-bold mb-4 text-15">ZIP Code</Typography>
                                        <Typography>{row.zipCode}</Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}

                    <Grid item xs={4}>
                        <Card variant="outlined" className="w-full mb-16 rounded-8">
                            <CardContent>
                                <Grid container direction="column" alignItems="center">
                                    <button onClick={() => handleOpenModal("Add a New Address") }>
                                        <Grid item xs={2}>
                                            <Icon className="text-56" color="action">
                                                add
											</Icon>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography className="mb-4 text-32">Add Address</Typography>
                                        </Grid>
                                    </button>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <AddressFormDialog 
                    open={open} 
                    setOpen={setOpen} 
                    newAddressForm={props.registerNewAddresstInformation} 
                    editAddressForm={props.editAddresstInformation} 
                    title={title} 
                    addressInformation={{ id, setId, addressTypeId, setAddressTypeId, addressLine1, setAddress, country, setCountry, city, setCity, state, setState, zipCode, setZipCode}}></AddressFormDialog>
            </div>
        )
    );
}

export default React.memo(AddressInformationWidget);