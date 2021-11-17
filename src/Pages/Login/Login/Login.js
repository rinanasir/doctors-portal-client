import React, { useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import login from '../../../images/login.png';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, loginUser, isLoading, signInWithGoogle, authError } = useAuth();

    const location = useLocation();
    const history = useHistory();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        // console.log(field, value);
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history);
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{ mt: 25 }} xs={12} md={6}>
                    <Typography
                        style={{ color: '#5CE7ED', fontWeight: '600' }}
                        variant="h6"
                        gutterBottom component="div">
                        Login
                    </Typography>
                    <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Name"
                            name="email"
                            onChange={handleOnChange}
                            variant="standard" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Password"
                            type="password"
                            name="password"
                            onChange={handleOnChange}
                            variant="standard" />
                        <Button
                            type="submit"
                            sx={{ width: '75%', m: 1 }}
                            style={{ backgroundColor: '#5CE7ED', color: 'black' }} variant="contained"
                        >Login</Button>
                        <NavLink
                            style={{ textDecoration: 'none' }}
                            to="/register">
                            <Button variant="text">New User? Please Register</Button>
                        </NavLink>
                        {isLoading && <CircularProgress />}
                        {user?.email && <Alert severity="success">Login Successfully</Alert>}
                        {
                            authError && <Alert severity="error">{authError}</Alert>
                        }

                    </form>
                    <p>-------------------------------OR--------------------------------</p>
                    <Button
                        onClick={handleGoogleSignIn}
                        type="submit"
                        sx={{ width: '75%', m: 1 }}
                        style={{ backgroundColor: '#5CE7ED', color: 'black' }} variant="contained"
                    >Login With Google</Button>
                </Grid>
                <Grid item sx={{ mt: 6 }} xs={12} md={6}>
                    <img style={{ width: '100%' }} src={login} alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;