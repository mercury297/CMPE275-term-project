import React, {useEffect, useState} from "react";
import Layout from "../shared/Layout";
import {Tabs, Button, Table, message} from "antd";
import "../../assets/scss/admin-dashboard.scss"
import {toast} from "react-toastify";
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
        title: 'Clinic',
        dataIndex: 'clinic',
        key: 'clinic',
    }, {
        title: 'Time',
        dataIndex: 'appointmentDate',
        key: 'time',
    }, {
        title: 'Vaccinations',
        dataIndex: 'vaccinationList',
        key: 'vaccinations',
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
                    console.log(res.res.data);
                    if("SuccessMessage" in res.res.data){
                        console.log(res.res.data.SuccessMessage.message);
                        toast.error(res.res.data.SuccessMessage.message);
                    }
                    else{
                        let data = []
                        for(let i=0; i<res.res.data.length; i++){
                            let vaccines = "";
                            for(let j=0; j<res.res.data[i].vaccinationList.length; j++){
                                vaccines += res.res.data[i].vaccinationList[j].name + ", ";
                            }
                            data.push({
                                key: i,
                                clinic: res.res.data[i].clinic.name,
                                appointmentDate: res.res.data[i].appointmentDate,
                                vaccinationList: vaccines
                            })
                        }
                        console.log(data);
                        setFutureAppointments(data);
                    }

                } else {
                    message.error(res.message);
                }
            });
        } else if (type === 'past') {
            AdminService.getPastAppointments().then(res => {
                if (res.success) {
                    console.log(res.res.data);
                    if("SuccessMessage" in res.res.data){
                        console.log(res.res.data.SuccessMessage.message);
                        toast.error(res.res.data.SuccessMessage.message);
                    }
                    else{
                        let data = []
                        for(let i=0; i<res.res.data.length; i++){
                            let vaccines = "";
                            for(let j=0; j<res.res.data[i].vaccinationList.length; j++){
                                vaccines += res.res.data[i].vaccinationList[j].name + ", ";
                            }
                            data.push({
                                key: i,
                                clinic: res.res.data[i].clinic.name,
                                appointmentDate: res.res.data[i].appointmentDate,
                                vaccinationList: vaccines
                            })
                        }
                        console.log(data);
                        setPastAppointments(data);
                    }

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
                    Patient Appointments
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