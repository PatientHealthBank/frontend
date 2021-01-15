import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useDispatch } from 'react-redux';
import { openLoading, closeLoading } from 'app/fuse-layouts/shared-components/loadingModal/store/loadingSlice';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import phbApi from 'app/services/phbApi'
import ConfirmDialog from '@global/components/ConfirmDialog'
import { makeStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '50%',
    },
    productImageUpload: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut
    },
    productImageItem: {
        transitionProperty: 'box-shadow',
        transitionDuration: theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover': {
            '& $productImageFeaturedStar': {
                opacity: 0.8
            }
        },
        '&.featured': {
            pointerEvents: 'none',
            boxShadow: theme.shadows[3],
            '& $productImageFeaturedStar': {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));
export default function IntakeFormDetailsDialog({ open, setOpen, callBack, intakeForm, getQuestionType }) {
    const dispatch = useDispatch();


    const classes = useStyles();

    const handleAction = async () => {
        dispatch(openLoading())
        await callBack();
        setOpen(false);
        dispatch(closeLoading())
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >

            <AppBar position="static">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
                    <DialogTitle id="alert-dialog-slide-title">{'IntakeForm'}</DialogTitle>
					</Typography>
				</Toolbar>
			</AppBar>

                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Grid container className={classes.root} spacing={2}>
                            <Grid item xs={12}>

                                <h3><strong>Basic IntakeForm Info</strong></h3>
                                <Divider></Divider>


                            </Grid>
                            <Grid item xs={6}>
                                <FormControl className={classes.formControl}>
                                    Title:<strong> {intakeForm.description}</strong>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <h3><strong>IntakeForm Questions</strong></h3>
                                <Divider></Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container className={classes.root} spacing={2}>
                                    <Grid item xs={12}>

                                        {intakeForm.questions && intakeForm.questions.length > 0 &&
                                            <FormControl className={classes.formControl} style={{ margin: '0 15px', border: '1px solid #e0e0e0' }}>
                                                <TableContainer>
                                                    <Table
                                                        className={classes.table}
                                                        aria-labelledby="tableTitle"
                                                        aria-label="enhanced table"
                                                    >

                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>
                                                                    Title
												                        </TableCell>
                                                                <TableCell>
                                                                    Type
													                	</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {intakeForm.questions.map((item, i) => (
                                                                <TableRow key={i}>
                                                                    <TableCell>
                                                                        {item.description}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {getQuestionType(item.questionType)}
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </FormControl>}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>


                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {'close'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}