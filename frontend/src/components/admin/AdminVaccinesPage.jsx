import React, {useEffect, useState} from "react";
import Layout from "../shared/Layout";
import {Button, message, Table} from "antd";
import "../../assets/scss/admin-vaccines.scss"
import AppointmentModal from "../shared/AppointmentModal";
import AdminService from "../../services/admin.service";
import AddVaccineModal from "../shared/AddVaccineModal";

const AdminVaccinesPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState([]);

    const handleOk = (payload) => {
        AdminService.addVaccine(payload).then((res) => {
            if (res.success) {
                message.success('Vaccine added successfully');
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

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Manufacturer',
            dataIndex: 'manufacturer',
            key: 'manufacturer',
        }, {
            title: 'Diseases',
            dataIndex: 'disease',
            key: 'disease',
            
        }, {
            title: 'No Of Shots',
            dataIndex: 'numberOfShots',
            key: 'numberOfShots',
        }, {
            title: 'Shot Internal Val',
            dataIndex: 'shotInternalval',
            key: 'shotInterval',
        }, {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
        },
    ];

    useEffect(() => {
        AdminService.getAllVaccines().then(res => {
            if (res.success) {
                console.log(res.res.data);
                setData(res.res.data);
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
                <AddVaccineModal
                    showModal={showModal}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                />
            </div>
        </Layout>
    )
}

export default AdminVaccinesPage;