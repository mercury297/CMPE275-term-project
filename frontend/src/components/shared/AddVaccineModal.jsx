import {Input, Modal} from "antd";
import React, {useState} from "react";
import '../../assets/scss/modals.scss';

const AddVaccineModal = ({showModal, handleOk, handleCancel}) => {
    const [state, setState] = useState({
        name: '',
        manufacturer: '',
        diseases: '',
        numberOfShots: 1,
        shotInternalVal: 20,
        duration: 20,
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
        <Modal title="Add a new appointment" visible={showModal} onOk={handleDone} onCancel={handleCancel} okText={'Add Vaccine'}>
            <div className='form-container'>
                <div className='input-container'>
                    <div className='form-header'><span>Name</span></div>
                    <Input onChange={changeHandler}
                           type='text'
                           name='name'
                           placeholder='Vaccine Name'
                           style={{width: "100%"}}
                    />
                </div>
              
                <div className='input-container'>
                    <div className='form-header'><span>Manufacturer</span></div>
                    <Input onChange={changeHandler}
                           type='text'
                           name='manufacturer'
                           placeholder='Manufacture'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Diseases</span></div>
                    <Input onChange={changeHandler}
                           type='text'
                           name='diseases'
                           placeholder='Diseases'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>No. of Shots</span></div>
                    <Input onChange={changeHandler}
                           type='text'
                           name='numberOfShots'
                           placeholder='number-of-shots'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Shot Interval</span></div>
                    <Input onChange={changeHandler}
                           type='text'
                           name='shotInternalVal'
                           placeholder='shot-internal-val'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Duration</span></div>
                    <Input onChange={changeHandler}
                           type='number'
                           name='duration'
                           placeholder='duration'
                           style={{width: "100%"}}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default AddVaccineModal;