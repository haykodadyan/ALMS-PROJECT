import './Home.css';
import React, { useEffect } from 'react';
import AuthService from '../../authApi/Auth';
import { useNavigate } from 'react-router';
import { Typography } from '@mui/material';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!AuthService.getIsAuthenticated()) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className='home_wrapper'>
            <div className='home_titles_wrapper'>
                <Typography variant="h1" className='home_title'>
                    Academy Library
                </Typography>
                <Typography variant="h2">
                    Improve Your skills by reading books about programming
                </Typography>
            </div>
        </div>
    );
};

export default Home;
