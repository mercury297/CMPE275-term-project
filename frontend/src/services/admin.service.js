import API from "../utils/api-util";

export default class AdminService {

    // Update NEW entities
    static async updateAppointment(payload) {
        const url = '/appointment';
        let user;
        try {
            user = JSON.parse(localStorage.getItem('user'));
        } catch (e) {
            return {
                success: false,
                message: 'Please login first!',
            }
        }
        try {
            const res = await API.put(`${url}/${user.MRN}`, payload);
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

    static async cancelAppointment(appointmentId) {
        const url = '/appointment';
        let user;
        try {
            user = JSON.parse(localStorage.getItem('user'));
        } catch (e) {
            return {
                success: false,
                message: 'Please login first!',
            }
        }
        try {
            const res = await API.delete(`${url}/${user.MRN}/${appointmentId}`);
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

    static async checkInAppointment(appointmentId) {
        const url = '/appointment';
        let user;
        try {
            user = JSON.parse(localStorage.getItem('user'));
        } catch (e) {
            return {
                success: false,
                message: 'Please login first!',
            }
        }
        try {
            const res = await API.put(`${url}/${user.MRN}/${appointmentId}`, {checkIn: true});
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


    // Add NEW entitties

    static async addAppointment(payload) {
        const url = '/appointment';
        let user;
        try {
            user = JSON.parse(localStorage.getItem('user'));
        } catch (e) {
            return {
                success: false,
                message: 'Please login first!',
            }
        }
        try {
            const res = await API.post(`${url}/${user.MRN}`, payload);
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

    static async addDisease(payload) {
        const url = '/disease';
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

    static async addClinic(payload) {
        const url = '/clinic';
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
        let user;
        try {
            user = JSON.parse(localStorage.getItem('user'));
        } catch (e) {
            return {
                success: false,
                message: 'Please login first!',
            }
        }

        try {
            const res = await API.post(url, {email: user.email, currentTime: user.currentTime});
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
        const url = '/dashboard/patientFuture';
        let user;
        try {
            user = JSON.parse(localStorage.getItem('user'));
        } catch (e) {
            return {
                success: false,
                message: 'Please login first!',
            }
        }

        try {
            const res = await API.post(url, {email: user.email, currentTime: user.currentTime});
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