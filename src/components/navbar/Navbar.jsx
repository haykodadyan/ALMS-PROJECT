import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from '../../assets/logo512.png';
import { useNavigate } from 'react-router';
import AuthService from '../../authApi/Auth';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import IconButton from '@mui/material/IconButton';
import CustomTabs from './Tabs';
import { useLocation } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

const pages = ['Home', 'Catalog', 'Profile'];

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [logoutDial, setLogoutDial] = useState(false)
    const [showAdminToast, setShowAdminToast] = useState(false);

    useEffect(() => {
        if (!AuthService.getIsAuthenticated() && location.pathname !== '/register') {
            navigate('/login');
        }
    }, [navigate, location.pathname]);

    const handleLogout = () => {
        setLogoutDial(true)

    };
    const handleConfirmLogout = () => {
        AuthService.logout();
        navigate('/login');
    }
    const handleButtonClicks = (page) => {
        navigate(`/${page === 'Home' ? '' : page.toLowerCase()}`);
    };

    const handleCloseAdminToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAdminToast(false);
    };

    return (
        <>
            <AppBar sx={{ background: 'rgba(9, 9, 9, 1)' }} position="fixed">
                <Container sx={{ marginLeft: 0 }} maxWidth="xl">
                    <Toolbar disableGutters>
                        <img width={24} style={{ margin: '5px', cursor: 'pointer' }} src={logo} alt="logo" />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                cursor: 'pointer',
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            ALMS
                        </Typography>
                        <CustomTabs handleButtonClicks={handleButtonClicks} pages={pages} />
                    </Toolbar>
                </Container>
                <IconButton sx={{ position: 'absolute', top: 15, right: 50 }} onClick={() => setShowAdminToast(true)} color="inherit">
                    {AuthService.user.role === 'admin' && <AdminPanelSettingsIcon sx={{ marginRight: '10px' }} />}
                </IconButton>
                <IconButton sx={{ position: 'absolute', top: 15, right: 20 }} onClick={handleLogout} color="inherit">
                    <LogoutIcon />
                </IconButton>

            </AppBar>
            <Snackbar
                open={showAdminToast}
                autoHideDuration={6000}
                onClose={handleCloseAdminToast}
                sx={{marginTop: '40px' }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
            >
                <MuiAlert onClose={handleCloseAdminToast} severity="success" sx={{ width: '100%' }}>
                    Admin User
                </MuiAlert>
            </Snackbar>
            <Dialog
                open={logoutDial}
                onClose={() => setLogoutDial(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setLogoutDial(false)} variant={'contained'} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmLogout} variant={'contained'} color="error" autoFocus>
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Navbar;
