import React, { useEffect, useState } from 'react';
import ProfileTable from './ProfileTable';
import AuthService from '../../authApi/Auth';
import { useNavigate } from 'react-router';
import './Profile.css';
import ApiRequests from "../../api/ApiRequests";
import SpeedDialog from "../../components/speed-dialog/SpeedDial";

const api = new ApiRequests();

const Profile = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                if (!AuthService.getIsAuthenticated()) {
                    navigate('/login');
                } else {
                    const fetchedBooks = await api.fetchBooks(AuthService.user._id);
                    setBooks(fetchedBooks);

                    const intervalId = setInterval(async () => {
                        const updatedBooks = await api.fetchBooks(AuthService.user._id);
                        setBooks(updatedBooks);
                    }, 60000);

                    return () => {
                        clearInterval(intervalId);
                    };
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchBooks();
    }, [navigate]);

    const handleReturnBook = async (bookId) => {
        try {
            const returnedBooks = await api.returnBook(AuthService.user._id, bookId);
            setBooks(returnedBooks);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='profile_wrapper'>
            <div className='profile_table_container'>
                <ProfileTable handleReturnBook={handleReturnBook} books={books} />
            </div>
            <div style={{position: 'fixed', bottom: '225px', right: '25px'}}>
                <SpeedDialog/>
            </div>
        </div>
    );
};

export default Profile;
