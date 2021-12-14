import React, {useEffect, useState} from "react";
import Layout from "../shared/Layout";
import {Button, message, Table} from "antd";
import "../../assets/scss/admin-vaccines.scss"
import AppointmentModal from "../shared/AppointmentModal";
import AdminService from "../../services/admin.service";

const AdminVaccinesPage = () => {
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
        }, {
            title: 'Vaccination ID',
            dataIndex: 'vaccinationID',
            key: 'vaccinationID',
        }, {
            title: 'Manufacturer',
            dataIndex: 'manufacturer',
            key: 'manufacturer',
        }, {
            title: 'Diseases',
            dataIndex: 'diseases',
            key: 'diseases',
            render: (val) => val ? val.join(', ') : '',
        }, {
            title: 'No Of Shots',
            dataIndex: 'numberOfShots',
            key: 'numberOfShots',
        }, {
            title: 'Shot Interval',
            dataIndex: 'shotInternalVal',
            key: 'shotInternalVal',
        }, {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
        },
    ];

    useEffect(() => {
        AdminService.getAllVaccines().then(res => {
            if (res.success) {
                setData(res.data);
            } else {
                message.error(res.message);
            }
        });
    }, []);

    return (
        <Layout current={'/admin/vaccines'}>
            <div className='admin-dashboard-container'>
                <div className='header'>
                    Vaccines
                </div>
                <div className='buttons-container'>
                    <Button type="primary" onClick={handleShowModal}>Add new vaccine</Button>
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

export default AdminVaccinesPage;