import API from "../utils/api-util";

export default class AdminService {
    static async getAllDiseases() {
        const url = '/diseases';
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

    static async getAllVaccines() {
        const url = '/vaccines';
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

    static async getAllClinics() {
        const url = '/clinics';
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

    static async getPastAppointments() {
        const url = '/past-appointments';
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

    static async getFutureAppointments() {
        const url = '/future-appointments';
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
}