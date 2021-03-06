import './App.css';
import {BrowserRouter, Switch,Route, useHistory} from "react-router-dom";
import "antd/dist/antd.css";
import "./assets/scss/app.scss";
import {PublicRoute} from "./components/shared/PublicRoute";
import {message, Spin} from "antd";
import {useEffect, useState} from "react";
import AuthService from "./services/auth-service";
import LoginPage from "./components/shared/LoginPage";
import {PrivateRoute} from "./components/shared/PrivateRoute";
import AdminDashboard from "./components/admin/AdminDashboard";
import PatientDashboard from "./components/patient/PatientDashboard";
import Report from "./components/patient/Report";
import AdminDiseasesPage from "./components/admin/AdminDiseasesPage";
import AdminVaccinesPage from "./components/admin/AdminVaccinesPage";
import AdminClinicsPage from "./components/admin/AdminClinicsPage";
import SignupPage from "./components/shared/Signup";
import Appointments from "./components/patient/Appointments";
import EmailVerificationComponent from "./components/shared/EmailVerificationComponent";
import AdminReportPage from "./components/admin/AdminReportPage";

const App = () => {
    const [loading, setLoading] = useState(false);
    const [isUserVerified, setIsUserVerified] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setLoading(true);
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            setIsUserVerified(true);
            setIsAdmin(parsedUser.admin);
        } else if (window.location.pathname !== '/auth/signup' && window.location.pathname !== '/auth/login' && !window.location.pathname.startsWith('/email-verification')) {
            console.log(window.location.pathname);
            window.location = '/auth/login';
        }
        setLoading(false);
    }, []);

    useEffect(( ) => {
        if (window.location.pathname === '/' || window.location.pathname === '/auth/login' || window.location.pathname === '/auth/signup') {
            if (isUserVerified) {
                if (isAdmin) {
                    window.location = '/admin/dashboard';
                } else {
                    window.location = '/patient/appointments';
                }
            }
        }
    }, [isAdmin, isUserVerified]);
    return (
        <Spin className='loader-container' tip="Loading..." spinning={loading} >
            <BrowserRouter>
                <Switch>
                    <PublicRoute exact path="/auth/signup" isLoggedIn={isAdmin}>
                        <SignupPage />
                    </PublicRoute>
                    <PublicRoute exact path="/auth/login" isLoggedIn={isAdmin}>
                        <LoginPage />
                    </PublicRoute>
                    <Route path="/admin/dashboard">
                        <AdminDashboard />
                    </Route>
                    <Route path="/admin/diseases">
                        <AdminDiseasesPage />
                    </Route>
                    <Route path="/admin/vaccines" >
                        <AdminVaccinesPage />
                    </Route>
                    <Route path="/admin/clinics" >
                        <AdminClinicsPage />
                    </Route>
                    <PrivateRoute path="/patient/appointments" isLoggedIn={!isAdmin}>
                        <Appointments />
                    </PrivateRoute>
                    <PrivateRoute path="/patient/dashboard" isLoggedIn={!isAdmin}>
                        <PatientDashboard />
                    </PrivateRoute>
                    <PrivateRoute path="/patient/report" isLoggedIn={!isAdmin}>
                        <Report />
                    </PrivateRoute>
                    <PrivateRoute path="/email-verification/:email/:verificationCode" isLoggedIn={!isUserVerified}>
                        <EmailVerificationComponent />
                    </PrivateRoute>
                    <Route path="/admin/report" >
                        <AdminReportPage />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Spin>
    )
}
export default App;