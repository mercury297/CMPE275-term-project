import React, {useEffect, useState} from "react";
import Layout from "../shared/Layout";
import {Button, message, Table} from "antd";
import "../../assets/scss/admin-clinics.scss"
import AppointmentModal from "../shared/AppointmentModal";
import AdminService from "../../services/admin.service";

const AdminClinicsPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);

    const handleOk = () => {
        setShowModal(false);
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    const handleShowModal = () => {
        setShowModal(true);
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
        },
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Zip Code',
            dataIndex: 'zipCode',
            key: 'zipCode',
        },
        {
            title: 'Business Hours',
            dataIndex: 'businessHours',
            key: 'businessHours',
        },
        {
            title: 'Physicians Count',
            dataIndex: 'numberOfPhysicians',
            key: 'numberOfPhysicians',
        },
    ];

    useEffect(() => {
        AdminService.getAllClinics().then(res => {
            if (res.success) {
                setData(res.data);
            } else {
                message.error(res.message);
            }
        });
    }, []);

    return (
        <Layout current={'/admin/clinics'}>
            <div className='admin-dashboard-container'>
                <div className='header'>
                    Clinics
                </div>
                <div className='buttons-container'>
                    <Button type="primary" onClick={handleShowModal}>Add new clinic</Button>
                    {/*<Button type="primary">Primary Button</Button>*/}
                </div>
                <div className='content'>
                   <Table
                       dataSource={data}
                       columns={columns}
                   />
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

export default AdminClinicsPage;