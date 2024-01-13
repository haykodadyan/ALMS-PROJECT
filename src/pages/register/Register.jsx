import React, { useEffect, useState } from 'react';
import AuthService from '../../authApi/Auth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Link,
    Grid,
    Typography,
    IconButton,
    InputAdornment,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import viewIcon from "../../assets/view.png";
import hideIcon from "../../assets/hide.png";
import {emailPattern, passwordPattern} from "../../utils/validation";

const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
        setError(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError(false);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setError(false);
        const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!pattern.test(e.target.value)) {
            setPasswordError('Password should be at least 6 characters with at least one letter.');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name.length < 3 || name.length > 18) {
            setError(true);
            return;
        }

        if (!emailPattern.test(email)) {
            setError(true);
            return;
        }

        if (!passwordPattern.test(password)) {
            setError(true);
            return;
        }
        const role = isAdmin ? 'admin' : 'user'
        AuthService.registration({name, email, password, role}).then((value) => {
            if (value === 'Error in registration endpoint.') {
                setError(true);
            } else {
                setError(false);
                navigate('/login');
            }
        });
    };

    const handleAdminChange = (e) => {
        setIsAdmin(e.target.checked);
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (AuthService.getIsAuthenticated()) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95vh' }}>
            <Grid item xs={12} sm={6} md={3}>
                <form onSubmit={handleSubmit}>
                    {error && (
                        <Typography variant="subtitle1" align="center" color="error" gutterBottom>
                            Registration failed. Please check your inputs.
                        </Typography>
                    )}
                    <Typography variant="h4" align="center" gutterBottom>
                        Register
                    </Typography>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={handleNameChange}
                        error={error}
                        helperText={
                            error && (name.length < 3 || name.length > 18) ? 'Name should be 3 to 18 characters long.' : ''
                        }
                    />
                    <TextField
                        label="Email address"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={handleEmailChange}
                        error={error}
                        helperText={error && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email) ? 'Invalid email.' : ''}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handlePasswordChange}
                        error={error || passwordError}
                        helperText={error ? '' : passwordError}
                        InputProps={{
                            endAdornment: (
                                !!password.length &&
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleTogglePassword}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge="end"
                                    >
                                        <img width={24} src={showPassword ? hideIcon : viewIcon} alt="Toggle Password" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isAdmin}
                                onChange={handleAdminChange}
                                color="primary"
                            />
                        }
                        label="Admin"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                    <Grid container justifyContent="center" marginTop={2}>
                        <Link component={RouterLink} to="/login" variant="body2">
                            Go to login
                        </Link>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
};

export default RegistrationForm;
