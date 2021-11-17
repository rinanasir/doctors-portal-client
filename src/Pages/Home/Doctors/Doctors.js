import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import Doctor from '../Doctor/Doctor';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch('https://obscure-retreat-51639.herokuapp.com/doctors')
            .then(res => res.json())
            .then(data => setDoctors(data));
    }, [])

    return (
        <Container>
            <h2>Our Doctors</h2>
            <Grid container spacing={2}>
                {
                    doctors.map(doctor => <Doctor
                        key={doctor._id}
                        doctor={doctor}
                    ></Doctor>)
                }
            </Grid>
        </Container>
    );
};

export default Doctors;