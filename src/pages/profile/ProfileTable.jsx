import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Row(props) {
    const { row, handleReturnBook } = props;
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleTimeConvert = (timeInMs) => {
        if (timeInMs - Date.now() <= 0) {
            return 0;
        }
        const resMinutes = Math.abs(Math.ceil((row.loan_time - Date.now()) / 60000));
        if(resMinutes > 60){
            return `${Math.floor(resMinutes / 60)} h ${resMinutes % 60} min`
        }
        return `${resMinutes} min`
    };

    const handleReturnDialog = () => {
        setOpen(false);
        setConfirmOpen(true);
    };

    const handleReturn = () => {
        handleReturnBook(row._id);
        setConfirmOpen(false);
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell align="right">{handleTimeConvert(row.loan_time)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button onClick={handleReturnDialog} variant="contained">Return Book</Button>
                            </Box>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Confirm Return</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to return "{row.title}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
                    <Button onClick={handleReturn} variant="contained" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

const ProfileTable = ({ books, handleReturnBook }) => {
    return (
        <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table aria-label="collapsible table">
                <TableHead sx={{ position: 'sticky', top: 0, background: 'white' }}>
                    <TableRow>
                        <TableCell />
                        <TableCell>Book Title</TableCell>
                        <TableCell align="right">Loan Time Remaining</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(books && !!books.length) && books.map((book) => (
                        <Row handleReturnBook={handleReturnBook} key={book._id} row={book} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProfileTable;
