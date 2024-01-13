import axios from 'axios';

class ApiRequests {
    constructor() {
        this.baseUrl = process.env.REACT_APP_BASE_URL;
    }

    async fetchBooks(userId) {
        try {
            const response = await axios.get(`${this.baseUrl}book/loans/${userId}`, {
                headers:{
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                }
            });
            return response.data.bookData;
        } catch (error) {
            throw new Error('Failed to fetch books');
        }
    }

    async returnBook(userId, bookId) {
        try {
            const response = await axios.post(`${this.baseUrl}book/return`, {
                userId,
                bookId,
            }, {
                headers:{
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                }
            });
            return response.data.bookData;
        } catch (error) {
            throw new Error('Failed to return book');
        }
    }

    async fetchCatalogBooks(currentPage, keyword) {
        try {
            const response = await axios.get(`${this.baseUrl}book?page=${currentPage}&keyword=${encodeURIComponent(keyword)}`, {
                headers:{
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                },
            });
            return {
                booksData: response.data.data.books,
                totalPagesData: response.data.data.totalPages,
            };
        } catch (error) {
            throw new Error('Failed to fetch catalog books');
        }
    }

    async checkBookAvailability(bookId, userId) {
        try {
            const response = await axios.get(`${this.baseUrl}book/check/${bookId}?user_id=${userId}`, {
                headers:{
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                }
            });
            return response.data.bookAvailability;
        } catch (error) {
            throw new Error('Failed to check book availability');
        }
    }

    async deleteBook(bookId, userId) {
        try {
            const response = await axios.delete(`${this.baseUrl}book/${bookId}?user_id=${userId}`, {
                headers:{
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                }
            });
            return response.data.message === 'deleted';
        } catch (error) {
            throw new Error('Failed to delete book');
        }
    }

    async confirmLoan(loanTime, bookId, userId) {
        try {
            const response = await axios.post(`${this.baseUrl}book/loan`, {
                time: loanTime,
                bookId,
                userId,
            }, {
                headers:{
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'),
                }
            });
            return response.status === 200;
        } catch (error) {
            throw new Error('Failed to confirm loan');
        }
    }
}

export default ApiRequests;
