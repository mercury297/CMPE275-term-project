import {Input, Modal} from "antd";
import React, {useState} from "react";
import '../../assets/scss/modals.scss';

const AddVaccineModal = ({showModal, handleOk, handleCancel}) => {
    const [state, setState] = useState({
        name: '',
        vaccinationId: '',
        manufacture: '',
        diseases: [],
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
                           type='name'
                           name='name'
                           placeholder='John Doe'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Vaccination ID</span></div>
                    <Input onChange={changeHandler}
                           type='vaccinationID'
                           name='vaccinationID'
                           placeholder='vaccination-id'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Manufacturer</span></div>
                    <Input onChange={changeHandler}
                           type='manufacturer'
                           name='manufacturer'
                           placeholder='Manufacture'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Diseases</span></div>
                    <Input onChange={changeHandler}
                           type='diseases'
                           name='diseases'
                           placeholder='Diseases'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>No. of Shots</span></div>
                    <Input onChange={changeHandler}
                           type='numberOfShots'
                           name='numberOfShots'
                           placeholder='number-of-shots'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Shot Interval</span></div>
                    <Input onChange={changeHandler}
                           type='shotInternalVal'
                           name='shotInternalVal'
                           placeholder='shot-internal-val'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Duration</span></div>
                    <Input onChange={changeHandler}
                           type='duration'
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