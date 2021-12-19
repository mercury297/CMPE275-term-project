import { Input, Modal } from "antd";
import React, { useState, useEffect } from "react";
import '../../assets/scss/modals.scss';
import Select from "react-select";
import AdminService from "../../services/admin.service";
import Multiselect from "@khanacademy/react-multi-select";

const AppointmentModal = ({ showModal, handleOk, handleCancel }) => {
    const [state, setState] = useState({
        date: '',
        clinicName: '',
        vaccinations: '',
    });
    const [options, setOptions] = useState([]);

    const [vaccineOptions, setVaccineOpt] = useState([]);
    const [selectedClinic, setSelectedClinic] = useState('');
    const [selectedVaccine, setSelectedVaccine] = useState('');
    const [selectedVaccines, setSelectedVaccines] = useState([]);


    const changeHandler = e => {
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleDone = () => {
        const builtObj = {
            date : state.date,
            clinicName : selectedClinic,
            vaccines : selectedVaccines
        }
        console.log(builtObj)
        // console.log(this.props)
        handleOk(builtObj);
    }
    const opt = []
    const vaccineOpt = []

    const handleClinicChange = (e) => {
        console.log(e);
        setSelectedClinic(e.value)
        // setSelectedClinicName(e.label)
    }
    const handleVaccineChange = selectedVaccines => {
        if (selectedVaccines.length > 4) {
            alert("You can enter only upto 4 vaccines")
        } else {
            setSelectedVaccines(selectedVaccines)

            // setSelectedVaccines(selectedVaccines)
            // setBookingInfo({
            //     ...bookingInfo,
            //     vaccineSelected: selectedVaccines
            // })
        }
    };
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
        AdminService.getAllVaccines().then(res => {
            console.log(res)
            console.log(res.res.data)
            res.res.data.forEach((d) => {
                var temp = {
                    label: d.name,
                    value: d.id
                }
                vaccineOpt.push(temp);

            })
            console.log(vaccineOpt)
            setVaccineOpt(...vaccineOptions, vaccineOpt)
        })
    }, []);
    return (

        <Modal title="Add a new appointment" visible={showModal} onOk={handleDone} onCancel={handleCancel} okText={'Add Appointment'}>
            {console.log(vaccineOpt)}
            <div className='form-container'>
                <div className='input-container'>
                    <div className='form-header'><span>Time</span></div>
                    <Input onChange={changeHandler}
                        type='text'
                        name='date'
                        placeholder='Time'
                        style={{ width: "100%" }}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Clinic</span></div>
                    <Select options={options} style={{ width: "500px" }} onChange={handleClinicChange}>

                    </Select>
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Vaccinations</span></div>
                    <Multiselect style={{ marginTop: "10%" }}
                        options={vaccineOptions} max={1}
                        onSelectedChanged={handleVaccineChange}
                        selected={selectedVaccines}
                        disableSearch={true}
                        overrideStrings={{
                            selectSomeItems: "Select Vaccines",
                            allItemsAreSelected: "All Vaccines selected",
                        }}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default AppointmentModal;