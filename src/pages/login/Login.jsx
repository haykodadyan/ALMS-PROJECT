import React, { useEffect, useState } from 'react';
import AuthService from '../../authApi/Auth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { TextField, Button, Link, Grid, Typography, IconButton, InputAdornment } from '@mui/material';
import viewIcon from "../../assets/view.png";
import hideIcon from "../../assets/hide.png";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const [togglePassword, setTogglePassword] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError(false);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Fill All Inputs');
            return;
        }
        AuthService.login(email, password).then((value) => {
            if (value === 'Error in login endpoint.') {
                setError(true);
                setPassword('')
                setEmail('')
            } else {
                setError(false);
                navigate('/');
            }
        });
    };

    const handleTogglePass = () => {
        setTogglePassword(!togglePassword);
    };

    useEffect(() => {
        if (AuthService.getIsAuthenticated()) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <Grid container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95vh'}}>
            <Grid item xs={12} sm={6} md={3}>
                <form onSubmit={handleSubmit}>
                    {error && (
                        <Typography variant="subtitle1" align="center" color="error" gutterBottom>
                            Login or password is incorrect.
                        </Typography>
                    )}
                    <Typography variant="h4" align="center" gutterBottom>
                        Login
                    </Typography>
                    <TextField
                        label="Email address"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={handleEmailChange}
                        error={error}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type={togglePassword ? 'text' : 'password'}
                        value={password}
                        onChange={handlePasswordChange}
                        error={error}
                        InputProps={{
                            endAdornment: (
                                !!password.length &&
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleTogglePass}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge="end"
                                    >
                                        <img width={24} src={togglePassword ? hideIcon : viewIcon} alt="Toggle Password" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                    <Grid container justifyContent="center" marginTop={2}>
                        <Link component={RouterLink} to="/register" variant="body2">
                            Go to registration
                        </Link>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};

export default LoginForm;
