import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import AuthService from '../../authApi/Auth';
import Book from './book/Book';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import './Catalog.css';
import Sidebar from "../../components/sidebar/Sidebar";
import ApiRequests from "../../api/ApiRequests";

const api = new ApiRequests();

const Catalog = () => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [temp, setTemp] = useState(0);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                if (!AuthService.getIsAuthenticated()) {
                    navigate('/login');
                } else {
                    const { booksData, totalPagesData } = await api.fetchCatalogBooks(currentPage, keyword);
                    setBooks(booksData);
                    setTotalPages(totalPagesData);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [currentPage, navigate, keyword, temp]);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleFiltering = (keyword) => {
        setCurrentPage(1);
        if (keyword === 'all') {
            setKeyword('');
            return;
        }
        setKeyword(keyword);
    };

    const removeFromList = (bookId) => {
        setTemp(temp + 1);
    };

    return (
        <div className="catalog_wrapper">
            <div className='sidebar'>
                <Sidebar handleFiltering={handleFiltering}/>
            </div>

            <div className='catalog_content'>
                <p className="title">Catalog of Books</p>
                {loading ? (
                    <div className='catalog_loading_wrapper'>
                        <CircularProgress />
                    </div>
                ) : (
                    <>
                        <Book removeFromList={removeFromList} books={books} />
                    </>
                )}
                <div className="pagination-wrapper">
                    <Stack sx={{ margin: '20px 0', width: '100%' }} spacing={2}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            size="large"
                            sx={{
                                '&.MuiPagination-outlined .MuiPaginationItem-root': {
                                    color: 'black',
                                },
                                '&.MuiPagination-outlined .Mui-selected': {
                                    backgroundColor: '#090909FF',
                                    color: 'white',
                                },
                                position: 'relative',
                                marginTop: '20px',
                                width: '100%',
                                textAlign: 'center',
                            }}
                            variant="outlined"
                        />
                    </Stack>
                </div>
            </div>
        </div>
    );
};

export default Catalog;
