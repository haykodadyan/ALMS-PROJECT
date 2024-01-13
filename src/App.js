import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import './App.css'
const App = () => {
    const theme = createTheme({
        typography: {
            fontFamily: 'Roboto, sans-serif',
        },
    });

    const location = useLocation();
    const hideNavbarPaths = ['/login', '/register'];
    const shouldHideNavbar = hideNavbarPaths.includes(location.pathname) || !AuthService.getIsAuthenticated();

    useEffect(() => {
        const checkAuth = async () => {
            const isAuth = AuthService.getIsAuthenticated();
            if (!isAuth && location.pathname !== '/login' && location.pathname !== '/register') {
                return <Navigate to="/login" />;
            }
        };
        checkAuth();
    }, [location.pathname]);

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
