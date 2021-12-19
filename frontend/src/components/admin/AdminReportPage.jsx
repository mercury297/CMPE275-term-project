import React, { useEffect, useState } from "react";
import Layout from "../shared/Layout";
import { Tabs, Table, message, Progress } from "antd";
import "../../assets/scss/admin-dashboard.scss"
import AdminService from "../../services/admin.service";
import { Input, Modal } from "antd";
import Select from "react-select";

const AdminDashboard = () => {
    // const [futureAppointments, setFutureAppointments] = useState([]);
    // const 
    const [message, setMessage] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportData, setReportData] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedClinic, setSelectedClinic] = useState('');
    const [selectedClinicName, setSelectedClinicName] = useState('');
    const [noShow, setnoShow] = useState('');
    const [totalAppointments, setTotalAppointment] = useState('');
    const [totalVaccines, setTotalVaccines] = useState([]);

    const [noShowRate, setnoShowRate] = useState('');
    const data = []

    const columns = [

        {
            title: 'No Show',
            dataIndex: 'noShow',
            key: 'noShow',

        },
        {
            title: 'Total Appointments',
            dataIndex: 'totalAppointments',
            key: 'totalAppointments',
        },
        {
            title: 'No Show Rate(In percent)',
            dataIndex: 'noShowRate',
            key: 'noShowRate',
        },
        {
            title: 'Clinic',
            dataIndex: 'clinicName',
            key: 'clinicName',
        },

    ];
    const opt = []
    const vaccineOpt = []
    useEffect(() => {
        AdminService.getAllClinics().then(res => {
            console.log(res)

            res.res.data.forEach((d) => {
                var obj = {
                    label: d.name,
                    value: d.id
                }
                opt.push(obj);

            })
            setOptions(...options, opt)
        })

    }, []);
    const startDateHandler = e => {
        setStartDate(e.target.value);
    }
    const endDateHandler = e => {
        setEndDate(e.target.value);
    }
    const handleChange = (e) => {
        console.log(e);
        setSelectedClinic(e.value)
        // setSelectedClinicName(e.label)
    }
    const handleSubmit = () => {
        if (startDate == '' || endDate == '') {
            alert("Please enter the necessary details")
        }
        else {
            const payload = {
                startDate: startDate,
                endDate: endDate,
                clinicId: selectedClinic
            }
            AdminService.getAdminReport(payload).then((res) => {
                if (res.success) {
                    console.log(res)
                    setnoShow(res.res.data.noShow)
                    setnoShowRate(res.res.data.noShowRate)
                    setTotalAppointment(res.res.data.totalAppointments)
                    setSelectedClinicName(res.res.data.clinicName)
                    // setReportData(res.res.data.SuccessMessage.message);
                    // console.log(res.data.successMessage.message)
                    // message.success('Appointment added successfully');
                } else {
                    // message.error(res.message);
                }
            });
            // AdminService.getPatientReport
        }
    }
    data.push(
        {
            key: 0,
            totalAppointments: totalAppointments,
            noShow: noShow,
            noShowRate: noShowRate,
            clinicName: selectedClinicName
        }
    )
    return (
        <Layout current={'/admin/report'}>
            {console.log(options)}
            <div className='admin-dashboard-container'>
                <div className='header'>
                    Admin Report
                </div>
                <div className='content'>
                    <div className='form-container'>
                        <div className='input-container'>
                            <div className='form-header'><span>Start Time</span></div>
                            <Input onChange={startDateHandler}
                                type='text'
                                name='startTime'
                                placeholder='Start Time'
                                style={{ width: "100%" }}
                            />
                        </div>
                        <div className='input-container'>
                            <div className='form-header'><span>End Time</span></div>
                            <Input onChange={endDateHandler}
                                type='text'
                                name='endTime'
                                placeholder='New Time'
                                style={{ width: "100%" }}
                            />
                        </div>
                        <div className='input-container'>
                            <div className='form-header' style={{ marginRight: "-470px" }}><span>Select Clinic</span></div>
                            <Select options={options} onChange={handleChange}>

                            </Select>
                        </div>
                        <button onClick={handleSubmit} style={{ width: "150px" }} className='signup-button'>
                            <span>GENERATE</span>
                        </button>
                    </div>
                </div>
                <div className="content">
                    <Table columns={columns} dataSource={data}></Table>
                </div>

            </div>

        </Layout>
    )
}

export default AdminDashboard;