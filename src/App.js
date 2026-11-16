import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Catalog from './pages/catalog/Catalog';
import Terms from './pages/terms/Terms';
import Navbar from './components/navbar/Navbar';
import Profile from './pages/profile/Profile';
import Footer from './components/footer/Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthService from './authApi/Auth';
import './App.css';

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

const PUBLIC_PATHS = ['/login', '/register'];

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isAuthenticated = AuthService.getIsAuthenticated();
    const isPublicPath = PUBLIC_PATHS.includes(location.pathname);
    const shouldHideNavbar = isPublicPath || !isAuthenticated;

    useEffect(() => {
        if (!isAuthenticated && !isPublicPath) {
            navigate('/login', { replace: true });
        }
    }, [isAuthenticated, isPublicPath, navigate]);

    return (
        <ThemeProvider theme={theme}>
            <div className='App'>
                {!shouldHideNavbar && <Navbar />}
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/catalog' element={<Catalog />} />
                    <Route path='/terms' element={<Terms />} />
                    <Route path='/profile' element={<Profile />} />
                </Routes>
                {!shouldHideNavbar && <Footer />}
            </div>
        </ThemeProvider>
    );
};

export default App;
