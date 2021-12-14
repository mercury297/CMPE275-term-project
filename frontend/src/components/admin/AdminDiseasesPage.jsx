import React, {useEffect, useState} from "react";
import Layout from "../shared/Layout";
import {Button, message, Table} from "antd";
import "../../assets/scss/admin-diseases.scss"
import AppointmentModal from "../shared/AppointmentModal";
import AdminService from "../../services/admin.service";
import AddDiseaseModal from "../shared/AddDiseaseModal";

const AdminDiseasesPage = () => {
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
            title: 'Disease ID',
            dataIndex: 'diseaseID',
            key: 'diseaseID',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
    ];

    useEffect(() => {
        AdminService.getAllDiseases().then(res => {
            if (res.success) {
                setData(res.data);
            } else {
                message.error(res.message);
            }
        });
    }, []);

    return (
        <Layout current={'/admin/diseases'}>
            <div className='admin-dashboard-container'>
                <div className='header'>
                    Diseases
                </div>
                <div className='buttons-container'>
                    <Button type="primary" onClick={handleShowModal}>Add new disease</Button>
                    {/*<Button type="primary">Primary Button</Button>*/}
                </div>
                <div className='content'>
                   <Table
                       dataSource={data}
                       columns={columns}
                   />
                </div>
                <AddDiseaseModal
                    showModal={showModal}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                />
            </div>
        </Layout>
    )
}

export default AdminDiseasesPage;