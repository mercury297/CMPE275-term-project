import React, {useState} from "react";
import Layout from "../shared/Layout";
import {Button, Table, Tabs} from "antd";
import "../../assets/scss/admin-vaccines.scss"
import AppointmentModal from "../shared/AppointmentModal";

const { TabPane } = Tabs;

const AdminVaccinesPage = () => {
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

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];

    return (
        <Layout current={'/admin/vaccines'}>
            <div className='admin-dashboard-container'>
                <div className='header'>
                    Vaccines
                </div>
                <div className='buttons-container'>
                    <Button type="primary" onClick={handleShowModal}>Add new disease</Button>
                    {/*<Button type="primary">Primary Button</Button>*/}
                </div>
                <div className='content'>
                   <Table
                       dataSource={dataSource}
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

export default AdminVaccinesPage;