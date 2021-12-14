import API from "../utils/api-util";

class AuthService {
    static async getCurrentUserInfo() {
        const url = '/auth/me';
        try {
            const res = await API.get(url);
            return {
                success: true,
                res,
            };
        } catch (e) {
            return {
                success: false,
                message: e.message || 'Something went wrong',
            }
        }
    }
    static async login(payload) {
        const url = '/auth/login';
        try {
            const res = await API.post(url, payload);
            return {
                success: true,
                res,
            };
        } catch (e) {
            return {
                success: false,
                message: e.message || 'Something went wrong',
            }
        }
    }

    static async signup(payload) {
        const url = '/user';
        try {
            const res = await API.post(url, payload);
            return {
                success: true,
                res,
            };
        } catch (e) {
            return {
                success: false,
                message: e.message || 'Something went wrong',
            }
        }
    }
}

export default AuthService;