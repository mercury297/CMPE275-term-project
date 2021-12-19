import React, { useEffect, useState } from "react";
import Layout from "../shared/Layout";
import { Tabs, Button, Table, message } from "antd";
import "../../assets/scss/admin-dashboard.scss"
import { toast } from "react-toastify";
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
    const handleCheckIn = value => () => {
        AdminService.checkInAppointment(value.key).then(res => {
            console.log(res);
            if (res.success) {
                if(res.res.data.checkIn === "1"){
                    message.success("Checked In successfully")
                }
                else{
                    message.success(res.res.data.SuccessMessage.message)
                }
            }
            // console.log(success);
        })
    };
    const handleDelete = value => () => {
        AdminService.cancelAppointment(value.key).then(res => {
            console.log(res);
            if (res.success) {
                alert(res.res.data.SuccessMessage.message);
            }
            // console.log(success);
        })
    };
    const futureColumns = [{
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
    }, {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        render: (text, record, index) => < div className="btn-wrap"
            style={
                {
                    marginLeft: "100px",
                    width: "200px"
                }
            } >
                {console.log(record.checkIn)}
            {
                record.checkIn === '0' ? <Button type="primary" style={{ marginLeft: "10px" }} danger onClick={handleCheckIn(record)}>
                    Check In
                </Button> : <Button type="primary" disabled style={{ marginLeft: "10px" }} danger onClick={handleCheckIn(record)}>
                    Check In
                </Button>
            }
            {/* <Button type="primary" style={{ marginLeft: "10px" }} danger onClick={handleCheckIn(record)}>
                Check In
            </Button> */}
            <Button type="primary" style={{ marginLeft: "20px" }} danger onClick={handleDelete(record)}>
                Delete
            </Button>
        </div >
    },
    ];
    const pastColumns = [{
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
    },
    ];
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
                    if ("SuccessMessage" in res.res.data) {
                        console.log(res.res.data.SuccessMessage.message);
                        toast.error(res.res.data.SuccessMessage.message);
                    }
                    else {
                        let data = []
                        for (let i = 0; i < res.res.data.length; i++) {
                            let vaccines = "";
                            for (let j = 0; j < res.res.data[i].vaccinationList.length; j++) {
                                vaccines += res.res.data[i].vaccinationList[j].name + ", ";
                            }
                            data.push({
                                key: res.res.data[i].appointmentID,
                                clinic: res.res.data[i].clinic.name,
                                appointmentDate: res.res.data[i].appointmentDate,
                                vaccinationList: vaccines,
                                checkIn : res.res.data[i].checkIn
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
                    if ("SuccessMessage" in res.res.data) {
                        console.log(res.res.data.SuccessMessage.message);
                        toast.error(res.res.data.SuccessMessage.message);
                    }
                    else {
                        let data = []
                        for (let i = 0; i < res.res.data.length; i++) {
                            let vaccines = "";
                            for (let j = 0; j < res.res.data[i].vaccinationList.length; j++) {
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
                                columns={futureColumns}
                                dataSource={futureAppointments}
                            />
                        </TabPane>
                        <TabPane tab="Past Appointments" key="past">
                            <Table
                                columns={pastColumns}
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