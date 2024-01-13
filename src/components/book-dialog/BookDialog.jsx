import React, {useState} from 'react';
import './BookDialog.css'
import Button from "@mui/material/Button";
import {useNavigate} from "react-router";
import AuthService from "../../authApi/Auth";
import ApiRequests from "../../api/ApiRequests";

const loanPeriods = [
    {
        name: '30 minutes',
        value: 30
    },
    {
        name: '1 hour',
        value: 60
    },
    {
        name: '2 hours',
        value: 120
    },
    {
        name: '4 hours',
        value: 240
    },
    {
        name: '1 min (For Testing)',
        value: 1,
    },
]

const api = new ApiRequests();

const BookDialog = ({book, onClose, setOpenErrorSnackbar, setOpenSnackbar}) => {
    const [confirmState, setConfirmState] = useState(false)
    const [buttonsState, setButtonsState] = useState([
        false,
        false,
        false,
        false,
        false
    ])
    const navigate = useNavigate()
    const handleButtonState = (index) => {
        setButtonsState(prevState => prevState.map((elem, idx) => {
            if(index === idx){
                elem = !elem
                return elem
            }
            elem = false
            return elem
        }))
    }
    const handleConfirmLoan = async () => {
        let loanTime = 0;
        for (let i = 0; i < buttonsState.length; i++) {
            if (buttonsState[i]) {
                loanTime = loanPeriods[i].value;
                break;
            }
        }

        try {
            const isLoanConfirmed = await api.confirmLoan(loanTime, book._id, AuthService.user._id);
            if (isLoanConfirmed) {
                setOpenSnackbar(true);
                onClose();
            }
        } catch (error) {
            console.error(error);
            setOpenErrorSnackbar(true);
            onClose();
        }
    };

    return (
        <div className='book_dial_wrapper'>
            <h1>Loaning process</h1>
            <h2>Book name: {book.title} </h2>
            <div className='loan_buttons_wrapper'>
                {loanPeriods.map((elem, index) => {
                    return <Button onClick={() => handleButtonState(index)} key={index} variant={ buttonsState[index] ? "contained" : "outlined"}>{elem.name}</Button>
                })}
            </div>
            <div className='terms_checkbox_wrapper'>
                <input checked={confirmState} onChange={() => setConfirmState(!confirmState)} className='terms_checkbox' type="checkbox"/>
                <p>I agree with <span onClick={() => navigate('/terms')} className='colorful_span'>Terms and Conditions</span></p>
            </div>
            <div className='confirm_buttons'>
                <Button onClick={onClose} variant={"outlined"}>Cancel</Button>
                <Button onClick={handleConfirmLoan} disabled={!(confirmState && (buttonsState.some(elem => elem)))} variant={"contained"}>Confirm</Button>
            </div>

        </div>
    );
};

export default BookDialog;

