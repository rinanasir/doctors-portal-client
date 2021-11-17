import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Alert, Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const { token } = useAuth();

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }

    const handleAdminSubmit = e => {
        const user = { email };
        fetch('https://obscure-retreat-51639.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    // console.log(data);
                    setSuccess(true);
                }
            })

        e.preventDefault();
    }
    return (
        <div>
            <h2>Make an Admin</h2>
            <form onSubmit={handleAdminSubmit}>
                <TextField onBlur={handleOnBlur} sx={{ width: '50%' }} label="Email" type="email" variant="standard" />
                <Button
                    type="submit"
                    style={{ backgroundColor: '#5CE7ED', color: 'black' }} variant="contained"
                >Add as Admin</Button>
            </form>
            {success && <Alert severity="success">Made Admin Successfully</Alert>}
        </div>
    );
};

export default MakeAdmin;