import './App.css';
import {Switch} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import "./assets/scss/app.scss";
import {PublicRoute} from "./components/shared/PublicRoute";
import {message, Spin} from "antd";
import {useEffect, useState} from "react";
import AuthService from "./services/auth-service";
import Login from "./components/admin/Login";
import {PrivateRoute} from "./components/shared/PrivateRoute";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminDiseasesPage from "./components/admin/AdminDiseasesPage";
import AdminVaccinesPage from "./components/admin/AdminVaccinesPage";
import AdminClinicsPage from "./components/admin/AdminClinicsPage";

const App = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    useEffect(() => {
        setLoading(true);
        AuthService.getCurrentUserInfo().then((data) => {
            if (data.success) {
                setUser(data.res.data);
            } else {
                message.error(data.message);
            }
            setLoading(false);
        });
    }, []);
    return (
        <Spin className='loader-container' tip="Loading..." spinning={loading} >
            <BrowserRouter>
                <Switch>
                    <PublicRoute exact path="/auth/login" isLoggedIn={user.role}>
                        <Login />
                    </PublicRoute>
                    <PrivateRoute path="/admin/dashboard" isLoggedIn={user.role !== 'admin'}>
                        <AdminDashboard />
                    </PrivateRoute>
                    <PrivateRoute path="/admin/diseases" isLoggedIn={user.role !== 'admin'}>
                        <AdminDiseasesPage />
                    </PrivateRoute>
                    <PrivateRoute path="/admin/vaccines" isLoggedIn={user.role !== 'admin'}>
                        <AdminVaccinesPage />
                    </PrivateRoute>
                    <PrivateRoute path="/admin/clinics" isLoggedIn={user.role !== 'admin'}>
                        <AdminClinicsPage />
                    </PrivateRoute>
                </Switch>
            </BrowserRouter>
        </Spin>
    )
}
export default App;
