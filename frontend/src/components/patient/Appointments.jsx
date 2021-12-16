import React, {useEffect, useState} from "react";
import Layout from "../shared/Layout";
import {Tabs, Button, Table, message} from "antd";
import "../../assets/scss/admin-dashboard.scss"
import AppointmentModal from "../shared/AppointmentModal";
import AdminService from "../../services/admin.service";

const { TabPane } = Tabs;

const AppointmentsComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const [futureAppointments, setFutureAppointments] = useState([]);
    const [pastAppointments, setPastAppointments] = useState([]);

    const handleOk = (payload) => {
        AdminService.addAppointment(payload).then((res) => {
            if (res.success) {
                message.success('Appointment added successfully');
            } else {
                message.error(res.message);
            }
        });
        setShowModal(false);
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    const handleShowModal = () => {
        setShowModal(true);
    }

    const columns = [{
        title: 'Appointment ID',
        dataIndex: 'appointmentID',
        key: 'appointmentID',
    }, {
        title: 'Clinic',
        dataIndex: 'clinic',
        key: 'clinic',
    }, {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    }, {
        title: 'Vaccinations',
        dataIndex: 'vaccinations',
        key: 'vaccinations',
        render: (val) => val ? val.join(', ') : '',
    }];

    const handleTabChange = (value) => {
        console.log(value);
    //    Make API call to get the latest data in here
        getTableData(value);
    }

    const getTableData = (type) => {
        if (type === 'future') {
            AdminService.getFutureAppointments().then(res => {
                if (res.success) {
                    setFutureAppointments(res.data);
                } else {
                    message.error(res.message);
                }
            });
        } else if (type === 'past') {
            AdminService.getPastAppointments().then(res => {
                if (res.success) {
                    setPastAppointments(res.data);
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
        <Layout current={'/patient/appointments'}>
            <div className='admin-dashboard-container'>
                <div className='header'>
                    Patient Dashboard
                </div>
                <div className='buttons-container'>
                    <Button type="primary" onClick={handleShowModal}>Add an appointment</Button>
                    {/*<Button type="primary">Primary Button</Button>*/}
                </div>
                <div className='content'>
                    <Tabs defaultActiveKey="1" centered onChange={handleTabChange}>
                        <TabPane tab="Future Appointments" key="future">
                            <Table
                                columns={columns}
                                dataSource={futureAppointments}
                            />
                        </TabPane>
                        <TabPane tab="Past Appointments" key="past">
                            <Table
                                columns={columns}
                                dataSource={pastAppointments}
                            />
                        </TabPane>
                    </Tabs>
                </div>
                <AppointmentModal
                    showModal={showModal}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                />
            </div>
        </Layout>
    )
}

export default AppointmentsComponent;