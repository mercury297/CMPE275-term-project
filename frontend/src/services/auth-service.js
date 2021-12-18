import API from "../utils/api-util";

class AuthService {
    static async login(payload) {
        const url = '/user/login';
        try {
            const res = await API.get(url, {params: payload});
            return {
                success: true,
                res,
            };
        } catch (e) {
            console.log(JSON.stringify(e));
            return {
                success: false,
                message: e.message || 'Something went wrong',
            }
        }
    }

    static async signup(payload) {
        const url = '/user/register';
        try {
            console.log(payload);
            const res = await API.get(url, {params:payload});
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