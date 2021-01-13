import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import React from 'react';


const useStyles = makeStyles(theme => ({
    ratingSize: {
        display: 'flex',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
        '& .MuiSvgIcon-root': {
            width: '2em',
            height: '2em'
        }
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '25ch',
    },
    productImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: orange[400],
        opacity: 0
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

const list = {
    featuredImageId: 'assets/images/avatars/doctor2.png',
    images: [
        {
            id: 0,
            url: 'assets/images/etc/intakeForms.png',
            type: 'image'
        },
        {
            id: 1,
            url: 'assets/images/etc/sampleFilePreview.jpg',
            type: 'image'
        }
    ]
};

const allergies = [
    {
        id: '1',
        description: 'Amoxicillin',
        age: '20'
    },
    {
        id: '2',
        description: 'Penicillin',
        age: '20'
    },
    {
        id: '3',
        description: 'Milk',
        age: '21'
    },
    {
        id: '4',
        description: 'Peanuts',
        age: '8'
    }
];

const vaccines = [
    {
        id: '1',
        description: 'Hepatitis B',
        date: '10/02/2016',
        location: 'Brazil'
    },
    {
        id: '2',
        description: 'Yellow Fever',
        date: '10/05/2012',
        location: 'Brazil'
    },
    {
        id: '3',
        description: 'Diphtheria',
        date: '24/08/2017',
        location: 'Brazil'
    },
    {
        id: '4',
        description: 'Tetanus',
        date: '13/06/2010',
        location: 'Brazil'
    }
];
function PatientMedicalHistory(props) {

    const classes = useStyles(props);

    return (
        <div className="md:flex max-w-full">
            <div className="flex flex-col md:w-400  md:ltr:pr-32 md:rtl:pl-32">
                <Card className="mb-16 rounded-8">
                    <AppBar position="static" elevation={0}>
                        <Toolbar className="px-8" variant="dense">
                            <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
                                Allergies
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <CardContent>
                        <table className="simple clickable">
                            <thead>
                                <tr>
                                    <th className="text-left">
                                        <Typography className="font-bold text-15">Allergic To</Typography>
                                    </th>
                                    <th className="text-left">
                                        <Typography className="font-bold text-15">Age of Onset</Typography>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {allergies.map(row => (
                                    <tr key={row.id}>
                                        <td className="text-left">{row.description}</td>
                                        <td className="text-left">{row.age}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Divider className="card-divider w-full" />
                    </CardContent>
                </Card>
                <Card className="mb-16 rounded-8">
                    <AppBar position="static" elevation={0}>
                        <Toolbar className="px-8" variant="dense">
                            <Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
                                Immunization History
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <CardContent>
                        <table className="simple clickable">
                            <thead>
                                <tr>
                                    <th className="text-left">
                                        <Typography className="font-bold text-15">Description</Typography>
                                    </th>
                                    <th className="text-left">
                                        <Typography className="font-bold text-15">Location</Typography>
                                    </th>
                                    <th className="text-left">
                                        <Typography className="font-bold text-15">Date</Typography>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {vaccines.map(row => (
                                    <tr key={row.id}>
                                        <td className="text-left">{row.description}</td>
                                        <td className="text-left">{row.location}</td>
                                        <td className="text-left">{row.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Divider className="card-divider w-full" />
                    </CardContent>
                </Card>
            </div>
            <div className="flex justify-center sm:justify-start flex-wrap -mx-8">
                {list.images && list.images.map((media, i) => (
                    <div
                        style={{ backgroundColor: i % 2 === 0 ? "#f0020257" : "#DEFFBD" }}
                        role="button"
                        tabIndex={0}
                        className={clsx(
                            classes.productImageItem,
                            'flex items-center justify-center relative flex-col w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow-1 hover:shadow-5',
                            media.id === list.featuredImageId && 'featured'
                        )}
                        key={media.id}
                    >
                        <div style={{ fontWeight: '700' }} >	Medical History</div>
                        <img className="max-w-none" style={{ height: '84%', width: '84%' }} src={media.url} alt="product" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PatientMedicalHistory;