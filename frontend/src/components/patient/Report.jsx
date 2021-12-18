import React, { useEffect, useState } from "react";
import Layout from "../shared/Layout";
import { Tabs, Table, message, Progress } from "antd";
import "../../assets/scss/admin-dashboard.scss"
import AdminService from "../../services/admin.service";
import { Input, Modal } from "antd";

const PatientReport = () => {
    // const [futureAppointments, setFutureAppointments] = useState([]);
    // const 
    const [message, setMessage] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportData, setReportData] = useState('');
    const [noShow, setnoShow] = useState('');
    const [totalAppointments, setTotalAppointment] = useState('');
    const [noShowRate, setnoShowRate] = useState('');

    useEffect(() => {
        
        // AdminService.getPatientReport().then(res => {
        //     if (res.success) {
        //         setMessage(res.res.data);
        //     } else {
        //         message.error(res.message);
        //     }
        // });
    }, []);
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
          title: 'No Show Rate',
          dataIndex: 'noShowRate',
          key: 'noShowRate',
        },
      ];
    const startDateHandler = e => {
        setStartDate(e.target.value);
    }
    const endDateHandler = e => {
        setEndDate(e.target.value);
    }
    const data = []
    const handleSubmit = () => {
        if (startDate == '' || endDate == '') {
            alert("Please enter the necessary details")
        }
        else {
            const payload = {
                startDate: startDate,
                endDate: endDate
            }
            AdminService.getPatientReport(payload).then((res) => {
                if (res.success) {
                    console.log(res.res.data)
                    setnoShow(res.res.data.noShow)
                    setnoShowRate(res.res.data.noShowRate)
                    setTotalAppointment(res.res.data.totalAppointments)
                    // console.log(res.res.data.SuccessMessage.message)
                    // setReportData(res.res.data.SuccessMessage.message)
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
            key : 0,
            totalAppointments : totalAppointments,
            noShow : noShow,
            noShowRate : noShowRate
        }
    )
    return (
        <Layout current={'/patient/report'}>
            {console.log(noShow)}
            {console.log(totalAppointments)}
            {console.log(noShowRate)}
            <div className='admin-dashboard-container'>
                <div className='header'>
                    Patient Report
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

export default PatientReport;