import React, { useState } from 'react';
import { Alert, Button, Input, TextField } from '@mui/material';

const AddDoctor = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        if (!image) {
            alert('please upload an image');
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('image', image);

        fetch('https://obscure-retreat-51639.herokuapp.com/doctors', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Doctor Added Successfully');
                    setSuccess(true);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div>
            <h2>Add a Doctor</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    onChange={e => setName(e.target.value)}
                    sx={{ width: '50%' }}
                    label="Name"
                    name="name"
                    type="text"
                    variant="standard"
                    required />
                <br />
                <TextField
                    onChange={e => setEmail(e.target.value)}
                    sx={{ width: '50%' }}
                    label="Email"
                    name="email"
                    type="email"
                    variant="standard"
                    required />
                <br />
                <Input
                    accept="image/*"
                    type="file"
                    onChange={e => setImage(e.target.files[0])}
                />
                <br />
                <Button
                    type="submit"
                    style={{ backgroundColor: '#5CE7ED', color: 'black' }} variant="contained">Add Doctor</Button>
            </form>
            {success && <Alert severity="success">Doctor added successfully</Alert>}
        </div>
    );
};

export default AddDoctor;