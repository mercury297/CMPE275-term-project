import {Modal} from "antd";

const AppointmentModal = ({showModal, handleOk, handleCancel}) => {
    return (
        <Modal title="Add a new appointment" visible={showModal} onOk={handleOk} onCancel={handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default AppointmentModal;