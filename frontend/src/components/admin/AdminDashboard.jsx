import React, {useState} from "react";
import Layout from "../shared/Layout";
import {Tabs, Button, Modal} from "antd";
import "../../assets/scss/admin-dashboard.scss"
import AppointmentModal from "../shared/AppointmentModal";
const { TabPane } = Tabs;

const AdminDashboard = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOk = () => {
        setShowModal(false);
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    const handleShowModal = () => {
        setShowModal(true);
    }

    return (
        <Layout current={'/admin/dashboard'}>
            <div className='admin-dashboard-container'>
                <div className='header'>
                    Admin Dashboard
                </div>
                <div className='content'>
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Future Appointments" key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="Past Appointments" key="2">
                            Content of Tab Pane 2
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

export default AdminDashboard;