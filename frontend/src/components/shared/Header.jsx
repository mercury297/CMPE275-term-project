import {Menu} from "antd";
import {MailOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import "../../assets/scss/header.scss";

const { SubMenu } = Menu;
const HeaderComponent = ({current}) => {

    const history = useHistory();
    const handleChange = ({key}) => {
        history.push(key);
    }

    return (
        <div className='menu-container'>
            <div className='font-satisfy logo'>VMS</div>
            <Menu onClick={handleChange} selectedKeys={[current]} mode="horizontal" theme={'dark'}>
                <Menu.Item key="mail" icon={<MailOutlined/>}>
                    Navigation One
                </Menu.Item>
                <Menu.Item key="alipay">
                    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                        Navigation Four - Link
                    </a>
                </Menu.Item>
            </Menu>
        </div>

    )
}

export default HeaderComponent;