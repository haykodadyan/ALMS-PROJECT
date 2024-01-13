import axios from 'axios';

class AuthService {
    static isAuthenticated = JSON.parse(localStorage.getItem('auth_state')) || false;
    static user = JSON.parse(localStorage.getItem('user_info'));

    static async _authFunction(url, data) {
        try {
            const resp = await axios.post(`${process.env.REACT_APP_BASE_URL}auth/${url}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!resp.data) {
                throw new Error(`Error in ${url} endpoint.`);
            }

            const userData = resp.data;
            this.user = userData.user;
            localStorage.setItem('token', userData.token);
            localStorage.setItem('auth_state', JSON.stringify(true));
            localStorage.setItem('user_info', JSON.stringify(userData.user));
            this.isAuthenticated = true;

            return userData;
        } catch (e) {
            return e.message;
        }
    }

    static async registration({ email, password, role, name }) {
        return this._authFunction('registration', { email, password, role, name });
    }

    static async login(email, password) {
        return this._authFunction('login', { email, password });
    }

    static logout() {
        localStorage.removeItem('auth_state');
        localStorage.removeItem('token');
        localStorage.removeItem('user_info');
        this.isAuthenticated = false;
    }

    static getIsAuthenticated() {
        return this.isAuthenticated;
    }
}

export default AuthService;
