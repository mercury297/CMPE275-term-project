import {Menu} from "antd";
import {useHistory} from "react-router-dom";
import "../../assets/scss/header.scss";
import {useEffect, useState} from "react";

const { SubMenu } = Menu;
const HeaderComponent = ({current, isAdmin}) => {

    const [menuOptions, setMenuOptions] = useState([]);
    const history = useHistory();
    const handleChange = ({key}) => {
        history.push(key);
    }

    useEffect(() => {
        if (isAdmin) {
            setMenuOptions([{
                    path: '/admin/appointments',
                    label: 'Appointments'
                }, {
                    path: '/admin/diseases',
                    label: 'Diseases'
                }, {
                    path: '/admin/clinics',
                    label: 'Clinics'
                }, {
                    path: '/admin/vaccines',
                    label: 'Vaccines'
                }, {
                    path: '/admin/set-time',
                    label: 'Set time'
                }, {
                    path: '/admin/report',
                    label: 'Report'
                }])
        } else {
            setMenuOptions([{
                path: '/patient/appointments',
                label: 'Appointments'
            }, {
                path: '/patient/diseases',
                label: 'History'
            }, {
                path: '/patient/check-in',
                label: 'Check-in'
            }, {
                path: '/patient/report',
                label: 'Report'
            }])
        }
    }, [isAdmin]);

    return (
        <div className='menu-container'>
            <div className='font-satisfy logo'>VMS</div>
            <Menu onClick={handleChange} selectedKeys={[current]} mode="horizontal" theme={'dark'}>
                {
                    menuOptions.map(item => (
                        <Menu.Item key={item.path}>
                            {item.label}
                        </Menu.Item>
                    ))
                }
                <Menu.Item key="logout">
                    Logout
                </Menu.Item>
            </Menu>
        </div>

    )
}

export default HeaderComponent;