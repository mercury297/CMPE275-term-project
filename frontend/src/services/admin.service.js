import API from "../utils/api-util";

export default class AdminService {
    static async verifyEmail(payload) {
        const url = 'user/verify';
        try {
            const res = await API.get(url, { params: payload });
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
        const url = '/appointment/cancelAppointment';
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
            const res = await API.get(`${url}/`, { params: { appointmentID: appointmentId, currentTime: localStorage.getItem("currentTime") } });
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
        const url = '/appointment/checkInAppointment';
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
            const res = await API.get(`${url}/`, { params: { appointmentID: appointmentId, currentTime: localStorage.getItem("currentTime") } });
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
        const url = '/appointment/createAppointment';
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
            console.log(payload.vaccines)
            let vaccines = "";
            for (let i = 0; i < payload.vaccines.length; i++) {
                vaccines = vaccines + payload.vaccines[i] + ",";
            }
            vaccines = vaccines.slice(0, -1);
            console.log(vaccines);
            const res = await API.get(`${url}/`, { params: { MRN: user.mrn, vaccinationIds: vaccines, clinicId: payload.clinicName, date: payload.date, currentTime: localStorage.getItem("currentTime") } });
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
        console.log(payload)
        const url = '/disease/createDisease';
        try {
            const res = await API.get(url, { params: { name: payload.name, description: payload.description } });
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
        console.log(payload)
        const user = JSON.parse(localStorage.getItem('user'));

        const url = '/clinic/createClinic';
        try {
            const res = await API.get(url, { params: { MRN: user.mrn, name: payload.name, street: payload.street, number: payload.number, city: payload.city, state: payload.state, zipCode: payload.zipCode, startTime: Number(payload.businessStartTime), numberOfPhysicians: payload.numberOfPhysicians, endTime: Number(payload.businessEndTime) } });
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
    static async addVaccine(payload) {
        console.log(payload)
        const user = JSON.parse(localStorage.getItem('user'));

        const url = '/vaccination/createVaccination';
        try {
            const res = await API.get(url, {params : {MRN : user.mrn , name : payload.name, diseases: payload.diseases,manufacturer: payload.manufacturer, numberOfShots: payload.numberOfShots, shotInternalVal: payload.shotInternalVal,duration: payload.duration}});
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
        const url = '/disease/getDiseases';
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await API.get(url, { params: { MRN: user.mrn } });
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
        const url = '/vaccination/getAllVaccines';
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await API.get(url, { params: { MRN: user.mrn } });
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
        const url = '/clinic/getClinic';
        let user;


        user = JSON.parse(localStorage.getItem('user'));
        try {
            user = JSON.parse(localStorage.getItem('user'));
        } catch (e) {
            return {
                success: false,
                message: 'Please login first!',
            }
        }
        try {
            const res = await API.get(url, { params: { MRN: user.mrn } });
            console.log(res);
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
        const url = '/appointment/getPastAppointment';
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
            //current time to be changed
            const res = await API.get(url, { params: { MRN: user.mrn, currentTime: localStorage.getItem('currentTime') } });
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
        const url = '/appointment/getFutureAppointment';
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
            const res = await API.get(url, { params: { MRN: user.mrn, currentTime: localStorage.getItem('currentTime') } });
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

    static async getDueVaccinations() {
        const url = '/dashboard/due-vaccinations';
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
            const res = await API.get(url, { params: { MRN: user.mrn, currentTime: localStorage.getItem('currentTime') } });
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

    static async getPatientReports() {
        const url = '/report/patient-report';
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
            const res = await API.get(url, { params: { MRN: user.mrn, currentTime: localStorage.getItem('currentTime') } });
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

    static async getVaccinationHistory() {
        const url = '/dashboard/vaccination-history';
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
            const res = await API.get(url, { params: { MRN: user.mrn, currentTime: "2016-12-13-04-00" } });
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

    static async getPatientReport(payload) {
        const url = '/report/patientReport';
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
            console.log(payload);
            const res = await API.get(url, { params: { MRN: user.mrn, startDate: payload.startDate, endDate: payload.endDate, currentTime: localStorage.getItem("currentTime") } });
            console.log(res)
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
    static async getAdminReport(payload) {
        const url = '/report/adminReport';
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
            console.log(payload);
            const res = await API.get(url, { params: { clinicId: payload.clinicId, startDate: payload.startDate, endDate: payload.endDate, currentTime: localStorage.getItem("currentTime") } });
            console.log(res)
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