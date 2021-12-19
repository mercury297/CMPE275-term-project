import { Input, Modal } from "antd";
import React, { useState, useEffect } from "react";
import '../../assets/scss/modals.scss';
import Select from "react-select";
import AdminService from "../../services/admin.service";
import Multiselect from "@khanacademy/react-multi-select";

const AddVaccineModal = ({ showModal, handleOk, handleCancel }) => {
    const [state, setState] = useState({
        name: '',
        manufacturer: '',
        diseases: '',
        numberOfShots: 1,
        shotInternalVal: 20,
        duration: 20,
    });
    const [selectedDiseases, setSelectedDiseases] = useState("");
    const [diseaseOption, setDiseaseOption] = useState([]);
    const opt = []

    useEffect(() => {
        AdminService.getAllDiseases().then(res => {
            console.log(res)

            res.res.data.forEach((d) => {
                var obj = {
                    label: d.name,
                    value: d.id
                }
                opt.push(obj);

            })
            setDiseaseOption(...diseaseOption, opt)
        })
    }, []);



    const changeHandler = e => {
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleDone = () => {
        console.log(selectedDiseases);
        let buildObj = {
            name: state.name,
            manufacturer: state.manufacture,
            diseases: selectedDiseases,
            numberOfShots: state.numberOfShots,
            shotInternalVal: state.shotInternalVal,
            duration: state.duration,        
        }
        handleOk(buildObj);
    }
    const handleVaccineChange = selectedDiseases => {
        if (selectedDiseases.length > 4) {
            alert("You can enter only upto 4 vaccines")
        } else {
            setSelectedDiseases(selectedDiseases)

            // setSelectedVaccines(selectedVaccines)
            // setBookingInfo({
            //     ...bookingInfo,
            //     vaccineSelected: selectedVaccines
            // })
        }
    };
    const handleClinicChange = (e) => {
        setSelectedDiseases(e.label)
        // setSelectedClinicName(e.label)
    }
    return (
        <Modal title="Add a new appointment" visible={showModal} onOk={handleDone} onCancel={handleCancel} okText={'Add Vaccine'}>
            {console.log(diseaseOption)}
            <div className='form-container'>
                <div className='input-container'>
                    <div className='form-header'><span>Name</span></div>
                    <Input onChange={changeHandler}
                        type='text'
                        name='name'
                        placeholder='Vaccine Name'
                        style={{ width: "100%" }}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Manufacturer</span></div>
                    <Input onChange={changeHandler}
                        type='text'
                        name='manufacturer'
                        placeholder='Manufacture'
                        style={{ width: "100%" }}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Diseases</span></div>
                    <Select options={diseaseOption} style={{ width: "500px" }} onChange={handleClinicChange}>

                    </Select>
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>No. of Shots</span></div>
                    <Input onChange={changeHandler}
                        type='text'
                        name='numberOfShots'
                        placeholder='number-of-shots'
                        style={{ width: "100%" }}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Shot Interval</span></div>
                    <Input onChange={changeHandler}
                        type='text'
                        name='shotInternalVal'
                        placeholder='shot-internal-val'
                        style={{ width: "100%" }}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Duration</span></div>
                    <Input onChange={changeHandler}
                        type='number'
                        name='duration'
                        placeholder='duration'
                        style={{ width: "100%" }}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default AddVaccineModal;