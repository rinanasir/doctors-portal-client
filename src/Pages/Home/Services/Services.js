import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Service from '../Service/Service';
import fluoride from '../../../images/fluoride.png';
import cavity from '../../../images/cavity.png';
import whitening from '../../../images/whitening.png';

const services = [
    {
        name: 'Fluoride Treatment',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum iusto soluta adipisci repudiandae sint beatae tenetur, eligendi officia illum magni voluptate nulla sapiente, corporis ipsam dignissimos, magnam suscipit illo fugit.',
        img: fluoride
    },
    {
        name: 'Cavity Fillin',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum iusto soluta adipisci repudiandae sint beatae tenetur, eligendi officia illum magni voluptate nulla sapiente, corporis ipsam dignissimos, magnam suscipit illo fugit.',
        img: cavity
    },
    {
        name: 'Teeth Whitening',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum iusto soluta adipisci repudiandae sint beatae tenetur, eligendi officia illum magni voluptate nulla sapiente, corporis ipsam dignissimos, magnam suscipit illo fugit.',
        img: whitening
    }
];

const Services = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container>
                <Typography sx={{ fontWeight: 500, color: '#5CE7ED', m: 2 }} variant="h6" component="div">
                    OUR SERVICES
                </Typography>
                <Typography sx={{ fontWeight: 'bold', m: 2 }} variant="h4" component="div">
                    Services We Provide
                </Typography>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        services.map(service => <Service
                            key={service.name}
                            service={service}
                        ></Service>)
                    }
                    {/* {services.map((service, index) => (
                        <Grid item xs={4} sm={4} md={4} key={index}>
                            <Service
                            service={service}
                            ></Service>
                        </Grid>
                    ))} */}
                </Grid>
            </Container>
        </Box>
    );
};

export default Services;