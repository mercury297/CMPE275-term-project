import React, {useEffect, useState} from "react";
import Layout from "../shared/Layout";
import {Tabs, Table, message, Progress} from "antd";
import "../../assets/scss/admin-dashboard.scss"
import AdminService from "../../services/admin.service";

const PatientDashboard = () => {
    // const [futureAppointments, setFutureAppointments] = useState([]);
    // const 
    const [message, setMessage] = useState('');

    useEffect(() => {
        AdminService.getDueVaccinations().then(res => {
            if (res.success) {
                setMessage(res.res.data);
            } else {
                message.error(res.message);
            }
        });
    }, []);

    return (
        <Layout current={'/patient/report'}>
            <div className='admin-dashboard-container'>
                <div className='header'>
                    Patient Report
                </div>
                <div className='content'>

                </div>
            </div>
        </Layout>
    )
}

export default PatientDashboard;