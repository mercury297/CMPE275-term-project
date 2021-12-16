import './App.css';
import {BrowserRouter, Switch, useHistory} from "react-router-dom";
import "antd/dist/antd.css";
import "./assets/scss/app.scss";
import {PublicRoute} from "./components/shared/PublicRoute";
import {message, Spin} from "antd";
import {useEffect, useState} from "react";
import AuthService from "./services/auth-service";
import LoginPage from "./components/shared/LoginPage";
import {PrivateRoute} from "./components/shared/PrivateRoute";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminDiseasesPage from "./components/admin/AdminDiseasesPage";
import AdminVaccinesPage from "./components/admin/AdminVaccinesPage";
import AdminClinicsPage from "./components/admin/AdminClinicsPage";
import SignupPage from "./components/shared/Signup";
import Appointments from "./components/patient/Appointments";
import EmailVerificationComponent from "./components/shared/EmailVerificationComponent";

const App = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    useEffect(() => {
        setLoading(true);
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            setUser(parsedUser);
        } else if (window.location.pathname !== '/auth/signup' && window.location.pathname !== '/auth/login') {
            console.log(window.location.pathname);
            window.location = '/auth/login';
        }
        setLoading(false);
    }, []);

    return (
        <Spin className='loader-container' tip="Loading..." spinning={loading} >
            <BrowserRouter>
                <Switch>
                    <PublicRoute exact path="/auth/signup" isLoggedIn={user.role}>
                        <SignupPage />
                    </PublicRoute>
                    <PublicRoute exact path="/auth/login" isLoggedIn={user.role}>
                        <LoginPage />
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
                    <PrivateRoute path="/patient/appointments" isLoggedIn={user.role !== 'patient'}>
                        <Appointments />
                    </PrivateRoute>
                    <PrivateRoute path="/patient/dashboard" isLoggedIn={user.role !== 'patient'}>
                        <AdminDashboard />
                    </PrivateRoute>
                    <PrivateRoute path="/patient/dashboard" isLoggedIn={user.role !== 'admin'}>
                        <AdminDashboard />
                    </PrivateRoute>
                    <PrivateRoute path="/email-verification/:email/:verificationCode" isLoggedIn={user.role !== 'admin'}>
                        <EmailVerificationComponent />
                    </PrivateRoute>
                </Switch>
            </BrowserRouter>
        </Spin>
    )
}
export default App;
