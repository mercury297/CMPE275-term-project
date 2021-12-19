import { Menu, message } from "antd";
import { useHistory } from "react-router-dom";
import "../../assets/scss/header.scss";
import { useEffect, useState } from "react";
import ChangeTime from "../patient/ChangeTime";
import AdminService from "../../services/admin.service";

const { SubMenu } = Menu;
const HeaderComponent = ({ current, isAdmin }) => {

    const [showModal, setShowModal] = useState(false);
    const [menuOptions, setMenuOptions] = useState([]);
    const history = useHistory();
    const handleChange = ({ key }) => {
        if (key === 'change-time') {
            console.log('change time');
            //do nothing
        }
        else {
            history.push(key);
        }
        console.log(key);
    }

    const handleOk = (payload) => {
        console.log(payload);
        localStorage.setItem('currentTime', payload.newTime);
    }

    const handleCancel = () => {
        console.log('cancel');
        setShowModal(false);
        console.log('showModal', showModal);
    }

    const handleShowModal = () => {
        setShowModal(true);
    }


    useEffect(() => {
        // console.log(localStorage.getItem("user").admin);
        const user = localStorage.getItem("user");
        // console.log(JSON.parse(user));
        const updatedUser = JSON.parse(user);
        console.log(updatedUser.admin)
        if (updatedUser.admin) {
            setMenuOptions([{
                path: '/admin/diseases',
                label: 'Diseases'
            }, {
                path: '/admin/clinics',
                label: 'Clinics'
            }, {
                path: '/admin/vaccines',
                label: 'Vaccines'
            }, {
                path: '/admin/report',
                label: 'Report'
            }])
        } else {
            setMenuOptions([{
                path: '/patient/appointments',
                label: 'Appointments'
            }, {
                path: '/patient/report',
                label: 'Report'
            }, {
                path: '/patient/dashboard',
                label: 'Dashboard'
            },])
        }
    }, [isAdmin]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location = process.env.REACT_APP_ENDPOINT;
    }

    return (
        <div className='menu-container'>
            <div className='font-satisfy logo'>VMS</div>
            <Menu selectedKeys={[current]} mode="horizontal" theme={'dark'}>
                {
                    menuOptions.map(item => (
                        <Menu.Item key={item.path} onClick={handleChange}>
                            {item.label}
                        </Menu.Item>
                    ))
                }
                <Menu.Item key="change-time" onClick={handleShowModal}>
                    {"Change Time"}
                    <ChangeTime
                        showModal={showModal}
                        handleCancel={handleCancel}
                        handleOk={handleOk}
                    />
                </Menu.Item>
                <Menu.Item key="logout" onClick={handleLogout}>
                    Logout
                </Menu.Item>
            </Menu>
        </div>

    )
}

export default HeaderComponent;