import React from "react";
import Layout from "../shared/Layout";
import {Tabs, Button} from "antd";
import "../../assets/scss/admin-dashboard.scss"
const { TabPane } = Tabs;

const AdminDashboard = () => {
    return (
        <Layout current={'/admin/dashboard'}>
            <div className='admin-dashboard-container'>
                <div className='header'>
                    Admin Dashboard
                </div>
                <div className='buttons-container'>
                    <Button type="primary">Add an appointment</Button>
                    {/*<Button type="primary">Primary Button</Button>*/}
                </div>
                <div className='content'>
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Future Appointments" key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="Past Appointments" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard;