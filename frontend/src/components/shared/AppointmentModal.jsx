import {Input, Modal} from "antd";
import React, {useState} from "react";
import '../../assets/scss/modals.scss';

const AppointmentModal = ({showModal, handleOk, handleCancel}) => {
    const [state, setState] = useState({
        date: '',
        clinicName: '',
        vaccinations: '',
    });

    const changeHandler = e => {
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleDone = () => {
        handleOk(state);
    }

    return (
        <Modal title="Add a new appointment" visible={showModal} onOk={handleDone} onCancel={handleCancel} okText={'Add Appointment'}>
            <div className='form-container'>
                <div className='input-container'>
                    <div className='form-header'><span>Time</span></div>
                    <Input onChange={changeHandler}
                           type='text'
                           name='date'
                           placeholder='Time'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Clinic</span></div>
                    <Input onChange={changeHandler}
                           type='text'
                           name='clinicName'
                           placeholder='Clinic'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Vaccinations</span></div>
                    <Input onChange={changeHandler}
                           type='text'
                           name='vaccinations'
                           placeholder='Vaccinations'
                           style={{width: "100%"}}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default AppointmentModal;