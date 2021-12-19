import React, {useEffect, useState} from "react";
import Layout from "../shared/Layout";
import {Tabs, Table, message} from "antd";
import "../../assets/scss/admin-dashboard.scss"
import AppointmentModal from "../shared/AppointmentModal";
import AdminService from "../../services/admin.service";

const { TabPane } = Tabs;

const PatientDashboard = () => {
    const [futureAppointments, setFutureAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);


    const columns = [{
        title: 'Date',
        dataIndex: 'dueDate',
        key: 'date',
    }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },{
        title: 'Number Of Shots Left',
        dataIndex: 'numberOfShotsDue',
        key: 'numberOfShots'
    }];

    const columnsHistory = [{
        title: 'Clinic',
        dataIndex: 'clinic',
        key: 'clinic',
    }, {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },{
        title: 'Number Of Shots Left',
        dataIndex: 'numberOfShotsDue',
        key: 'numberOfShots'
    }];

    const handleTabChange = (value) => {
        console.log(value);
    //    Make API call to get the latest data in here
        getTableData(value);
    }

    const getTableData = (type) => {
        if (type === 'future') {
            AdminService.getDueVaccinations().then(res => {
                if (res.success) {
                    setFutureAppointments(res.res.data);
                } else {
                    message.error(res.message);
                }
            });
        } else if (type === 'past') {
            AdminService.getVaccinationHistory().then(res => {
                if (res.success) {
                    setPastAppointments(res.res.data);
                } else {
                    message.error(res.message);
                }
            });
        }
    }

    useEffect(() => {
        getTableData("future");
    }, []);

    return (
        <Layout current={'/patient/dashboard'}>
            <div className='admin-dashboard-container'>
                <div className='header'>
                    Patient Dashboard
                </div>
                <div className='content'>
                    <Tabs defaultActiveKey="1" centered onChange={handleTabChange}>
                        <TabPane tab="Vaccinations Due" key="future">
                            <Table
                                columns={columns}
                                dataSource={futureAppointments}
                            />
                        </TabPane>
                        <TabPane tab="Vaccination History" key="past">
                            <Table
                                columns={columnsHistory}
                                dataSource={pastAppointments}
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </Layout>
    )
}

export default PatientDashboard;