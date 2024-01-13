import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import AuthService from "../../authApi/Auth";
import { useNavigate } from "react-router";
import axios from "axios";
import { passwordPattern } from "../../utils/validation";

const actions = [
    { icon: <LockIcon />, name: 'Change Password' },
    { icon: <ExitToAppIcon />, name: 'Logout' },
];

export default function SpeedDialog() {
    const [openDialog, setOpenDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [actionName, setActionName] = useState('');
    const [oldValue, setOldValue] = useState('');
    const [newValue, setNewValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [inputColor, setInputColor] = useState('');
    const navigate = useNavigate();

    const handleClick = (action) => {
        setOpenDialog(true);
        setActionName(action);
    };

    const handleClose = () => {
        setOpenDialog(false);
        setErrorMessage('');
        setInputColor('');
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleActionClick = (action) => {
        if (action === 'Change Password') {
            handleClick(action);
        } else if (action === 'Logout') {
            setOpenDialog(true);
            setActionName(action);
        }
    };

    const handleConfirm = async (newPass) => {
        if (actionName === 'Logout') {
            AuthService.logout();
            navigate('/login');
        } else if (!passwordPattern.test(newPass)) {
            setErrorMessage('Password should be at least 6 characters with at least one letter.');
            setInputColor('red');
        } else if (actionName === 'Change Password' || actionName === 'Change Name' || actionName === 'Change Email') {
            try {
                const requestName = actionName.split(' ')[1];
                const response = await axios.patch(`${process.env.REACT_APP_LOCAL_URL}api/user/${requestName.toLowerCase()}`, {
                    userId: AuthService.user._id,
                    oldValue,
                    newValue,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: localStorage.getItem('token'),
                    }
                });
                console.log(response.data);
                setErrorMessage('');
                setInputColor('');
                setOpenSnackbar(true);
                setNewValue('')
                setOldValue('')
                handleClose()
            } catch (error) {
                setNewValue('')
                setOldValue('')
                setErrorMessage('Old Password is wrong!');
                setInputColor('red');
                console.error(error);
            }
        }
    };

    return (
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => handleActionClick(action.name)}
                    />
                ))}
            </SpeedDial>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>{actionName}</DialogTitle>
                <DialogContent>
                    {actionName === 'Change Password' || actionName === 'Change Name' || actionName === 'Change Email' ? (
                        <>
                            <TextField
                                margin="dense"
                                label="Old Password"
                                fullWidth
                                type={actionName === 'Change Password' ? 'password' : 'text'}
                                value={oldValue}
                                error={!!errorMessage}
                                onChange={(e) => {
                                    setOldValue(e.target.value)
                                    setErrorMessage('');
                                    setInputColor('');
                                }}
                                inputProps={{ style: { color: inputColor } }}
                            />
                            <TextField
                                margin="dense"
                                label="New Password"
                                fullWidth
                                type={actionName === 'Change Password' ? 'password' : 'text'}
                                value={newValue}
                                onChange={(e) => {
                                    setNewValue(e.target.value);
                                    setErrorMessage('');
                                    setInputColor('');
                                }}
                                error={!!errorMessage}
                                helperText={errorMessage}
                                inputProps={{ style: { color: inputColor } }}
                            />
                            <Button sx={{ margin: '15px 15px 0 0' }} variant="contained" color="error" onClick={handleClose}>Cancel</Button>
                            <Button sx={{ marginTop: '15px' }} variant="contained" onClick={() => handleConfirm(newValue)}>Confirm</Button>
                        </>
                    ) : (
                        <>
                            <DialogContent sx={{ width: '14vw' }}>
                                Are you sure you want to logout?
                            </DialogContent>
                            <Button sx={{ margin: '15px 15px 0 0' }} variant="contained" color="error" onClick={handleClose}>Cancel</Button>
                            <Button sx={{ marginTop: '15px' }} variant="contained" onClick={handleConfirm}>Logout</Button>
                        </>
                    )}
                </DialogContent>
            </Dialog>
            <Snackbar
                sx={{ zIndex: 9999 }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Password has been changed successfully!
                </MuiAlert>
            </Snackbar>
        </Box>
    );
}
