import {Input, Modal} from "antd";
import React, {useState} from "react";
import '../../assets/scss/modals.scss';

const AddDiseaseModal = ({showModal, handleOk, handleCancel}) => {
    const [state, setState] = useState({
        name: '',
        diseaseID: '',
        description: '',
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
        <Modal title="Add a new disease" visible={showModal} onOk={handleDone} onCancel={handleCancel} okText={'Add Disease'}>
            <div className='form-container'>
                <div className='input-container'>
                    <div className='form-header'><span>Name</span></div>
                    <Input onChange={changeHandler}
                           type='text'
                           name='name'
                           placeholder='Some Disease'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Disease ID</span></div>
                    <Input onChange={changeHandler}
                           type='text'
                           name='diseaseId'
                           placeholder='diseaseId'
                           style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>Description</span></div>
                    <Input onChange={changeHandler}
                           type='text'
                           name='description'
                           placeholder='Description'
                           style={{width: "100%"}}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default AddDiseaseModal;