import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import {CardActions} from "@mui/material";
import Box from "@mui/material/Box";
import BookDialog from "../../../components/book-dialog/BookDialog";
import AuthService from "../../../authApi/Auth";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import ApiRequests from "../../../api/ApiRequests";

const api = new ApiRequests();

const BookCard = ({ book, removeFromList }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [availabilityToast, setAvailabilityToast] = useState(false);
    const [unavailabilityToast, setUnavailabilityToast] = useState(false);
    const [openLoanDialog, setOpenLoanDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
    const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const toastsToggle = (type) => {
        if(type === 'ok'){
            setAvailabilityToast(true);
            setTimeout(() => {
                setAvailabilityToast(false);
            }, 1500);
        }else if(type === 'err'){
            setUnavailabilityToast(true);
            setTimeout(() => {
                setUnavailabilityToast(false);
            }, 1500);
        }
    }
    const handleCheckAvailability = async () => {
        try {
            const isAvailable = await api.checkBookAvailability(book._id, AuthService.user._id);
            if (isAvailable) {
                toastsToggle('ok');
                setOpenLoanDialog(true);
            } else {
                toastsToggle('err');
            }
        } catch (error) {
            console.error(error);
            toastsToggle('err');
        }
    };



    const handleCloseLoanDialog = () => {
        setOpenLoanDialog(false);
    };

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAvailabilityToast(false);
        setUnavailabilityToast(false);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setOpenErrorSnackbar(false)
    };

    const handleBookDelete = async () => {
        try {
            const isDeleted = await api.deleteBook(book._id, AuthService.user._id);
            if (isDeleted) {
                removeFromList(book._id);
                setOpenConfirmDeleteDialog(false);
                setOpenDeleteSnackbar(true);
                setTimeout(() => {
                    setOpenDeleteSnackbar(true);
                }, 1500);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card variant="outlined"
              sx={{display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: 300,
                  minHeight: '300px',
                  margin: 2,
                  borderRadius: '8px' }}>
            <CardContent>
                <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} color="text.primary" gutterBottom>
                    {book.title}
                </Typography>
                <Typography variant="subtitle1" component="div" color="text.secondary" gutterBottom>
                    {book.authors && !book.authors.length ? 'Author Name is Empty' : book.authors.join(', ')}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    ISBN: {book.isbn}
                </Typography>
                {showDetails && (
                    <>
                        <Typography variant="body2">
                            <strong>Published Year:</strong> {book.published_year || 'Not available'}
                            <br />
                            <strong>Category:</strong> {book.category && book.category.join(', ')}
                            <br />
                            <strong>Location:</strong> {book.location && `Shelf: ${book.location.shelf}, Row: ${book.location.row}`}
                            <br />
                        </Typography>
                    </>
                )}
            </CardContent>
            <CardActions>
                <Button onClick={toggleDetails} size="small">{!showDetails ? 'Show More' : 'Show Less'}</Button>
                <Button onClick={handleCheckAvailability} size="small" variant="contained" color="primary">Loan</Button>
                {AuthService.user.role === 'admin' && <Button onClick={() => setOpenConfirmDeleteDialog(true)} variant="contained" color="error">Delete</Button>}
            </CardActions>
            <Snackbar
                open={availabilityToast}
                autoHideDuration={1500}
                onClose={handleCloseToast}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseToast}
                    severity="success"
                >
                    Book is available!
                </MuiAlert>
            </Snackbar>
            <Snackbar
                open={unavailabilityToast}
                autoHideDuration={1500}
                onClose={handleCloseToast}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleCloseToast}
                    severity="error"
                >
                    Book is not available!
                </MuiAlert>
            </Snackbar>


            <Snackbar sx={{zIndex: 9999}} anchorOrigin={{vertical:'bottom', horizontal:'right'}} open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Book {book.title} has been loaned successfully!
                </MuiAlert>
            </Snackbar>

            <Snackbar anchorOrigin={{vertical:'bottom', horizontal:'right'}} open={openErrorSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <MuiAlert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    Error occurred while loaning book!
                </MuiAlert>
            </Snackbar>
            <Snackbar anchorOrigin={{vertical:'bottom', horizontal:'right'}} open={openDeleteSnackbar} autoHideDuration={3000} onClose={() => setOpenDeleteSnackbar(false)}>
                <MuiAlert onClose={() => setOpenDeleteSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    Book has been successfully deleted!
                </MuiAlert>
            </Snackbar>
            <Dialog
                open={openLoanDialog}
                onClose={handleCloseLoanDialog}
                fullWidth
                maxWidth="lg"
                PaperProps={{
                    style: {
                        backgroundColor: 'white',
                        color: 'black',
                        minHeight: '60vh',
                        width: '60vw',
                        maxHeight: 'none',
                        borderRadius: '8px',
                    },
                }}
            >
                <BookDialog setOpenErrorSnackbar={setOpenErrorSnackbar} setOpenSnackbar={setOpenSnackbar} onClose={handleCloseLoanDialog} book={book}/>
            </Dialog>
            <Dialog
                open={openConfirmDeleteDialog}
                onClose={() => setOpenErrorSnackbar(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" gutterBottom>
                        Are you sure you want to delete this book?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirmDeleteDialog(false)} variant={'contained'} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleBookDelete} color="error" variant={'contained'} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

const BookList = ({ books, removeFromList }) => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {!!books.length ? books.map((book, index) => (
                <BookCard removeFromList={removeFromList} key={index} book={book} />
            )) :
                <div style={{fontSize: '30px'}}>
                    No Books
                </div>
            }
        </Box>
    );
};

export default BookList;
