import { Input, Modal} from "antd";
import React, {useState} from "react";
import '../../assets/scss/modals.scss';

const ChangeTime = ({showModal, handleCancel, handleOk}) => {
    const [state, setState] = useState({
        currentTime: '',
        newTime: '',
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

    return(
        <Modal title="Change Time" visible={showModal} onOk={handleDone} onCancel={handleCancel} okText={'Change Time'}>
            <div className='form-container'>
                <div className='input-container'>
                    <div className='form-header'><span>Current Time</span></div>
                    <Input onChange={changeHandler}
                            type='text'
                            name='currentTime'
                            placeholder={localStorage.getItem('currentTime')}
                            value={localStorage.getItem('currentTime')}
                            defaultValue={localStorage.getItem('currentTime')}
                            disabled={true}
                            style={{width: "100%"}}
                    />
                </div>
                <div className='input-container'>
                    <div className='form-header'><span>New Time</span></div>
                    <Input onChange={changeHandler}
                            type='text' 
                            name='newTime'
                            placeholder='New Time'
                            style={{width: "100%"}}
                    />
                </div>
            </div>


        </Modal> 
    )
}

export default ChangeTime;