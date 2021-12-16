import API from "../utils/api-util";

export default class AdminService {
    static async verifyEmail(payload) {
        const url = '/verify-email';
        try {
            const res = await API.put(url, payload);
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
        const url = '/createAppointment';
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
            const res = await API.get(`${url}/`, {params: {...payload, MRN: user.MRN}});
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
        const url = '/getPastAppointment';
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
            const res = await API.get(url, {email: user.email, currentTime: user.currentTime});
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
        const url = '/getFutureAppointment';
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
            console.log(user);
            const res = await API.get(url, {params: {MRN: user.mrn, currentTime: "2016-12-13-04-00"}});
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