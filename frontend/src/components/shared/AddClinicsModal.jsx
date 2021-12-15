import {Input, Modal} from "antd";
import React, {useState} from "react";
import '../../assets/scss/modals.scss';

const AddClinicsModal = ({showModal, handleOk, handleCancel}) => {
    const [state, setState] = useState({
        name: '',
        street: '',
        number: '',
        city: '',
        state: '',
        zipCode: '',
        businessStartTime: '',
        businessEndTime: '',
        numberOfPhysicians: 1,
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
        <Modal title="Add a new Clinic" visible={showModal} onOk={handleDone} onCancel={handleCancel} okText={'Add Clinics'}>
            <div className='form-container'>
                <div className='input-container'>
                    <div className='form-header'><span>Name</span></div>
                    <Input onChange={changeHandler}
                           type='text'
                           name='name'
                           placeholder='Clinic Name'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Street</span></div>
                    <Input onChange={changeHandler}
                           type='text'
                           name='street'
                           placeholder='Street'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Number</span></div>
                    <Input onChange={changeHandler}
                           type='number'
                           name='number'
                           placeholder='Number'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>City</span></div>
                    <Input onChange={changeHandler}
                           type='text'
                           name='city'
                           placeholder='City'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>State</span></div>
                    <Input onChange={changeHandler}
                           type='text'
                           name='state'
                           placeholder='State'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Zip Code</span></div>
                    <Input onChange={changeHandler}
                           type='text'
                           name='zipCode'
                           placeholder='zip-code'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Business Start Time</span></div>
                    <Input onChange={changeHandler}
                           type='text'
                           name='businessStartTime'
                           placeholder='Business-hours'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Business End Time</span></div>
                    <Input onChange={changeHandler}
                           type='text'
                           name='businessEndTime'
                           placeholder='Business-hours'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Physicians Count</span></div>
                    <Input onChange={changeHandler}
                           type='number'
                           name='numberOfPhysicians'
                           placeholder='Physicians Count'
                           style={{width: "100%"}}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default AddClinicsModal;