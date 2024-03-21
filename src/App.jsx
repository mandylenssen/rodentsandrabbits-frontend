import "./App.css"
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import CreateAccount from "./pages/createaccount/CreateAccount.jsx";
import RegisterPet from "./pages/registerpet/RegisterPet.jsx";
import AccountCreated from "./pages/accountcreated/AccountCreated.jsx";
import LoginRequired from "./pages/loginrequired/LoginRequired.jsx";
import MyPets from "./pages/mypets/MyPets.jsx";
import SuccessfulBooking from "./pages/successfulbooking/SuccessfulBooking.jsx";
import PetBoarding from "./pages/petboarding/PetBoarding.jsx";
import Logbook from "./pages/logbook/Logbook.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";
import MyBookings from "./pages/mybookings/MyBookings.jsx";
import Bookings from "./pages/bookings/Bookings.jsx";
import BookingManager from "./pages/bookingmanager/BookingManager.jsx";
import Navigation from "./components/navigation/Navigation.jsx";
import Footer from "./components/footer/Footer.jsx";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";
import LogOut from "./pages/logout/LogOut.jsx";
import AdminRoute from "./components/adminroute/AdminRoute.jsx";
import LogbookManager from "./pages/logbookmanager/LogbookManager.jsx";
import { useScrollToTop } from "./hooks/useScrollToTop.jsx";
import PetManager from "./pages/petmanager/PetManager.jsx";


function App() {
    useScrollToTop();

    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <Navigation/>


            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/petboarding" element={<PetBoarding/>}/>
                <Route path="/loginrequired" element={<LoginRequired/>}/>

                <Route path="/createaccount" element={<CreateAccount/>}/>
                <Route path="/accountcreated" element={<AccountCreated/>}/>
                <Route path="/registerpet" element={isAuth? <RegisterPet/> : <Navigate to="/loginrequired"/>}/>
                <Route path="/mypets" element={isAuth? <MyPets/> : <Navigate to="/loginrequired"/>}/>
                <Route path="/successfulbooking" element={isAuth? <SuccessfulBooking/> : <Navigate to="/loginrequired"/>}/>
                <Route path="/logbook" element={isAuth? <Logbook/> : <Navigate to="/loginrequired"/>}/>
                <Route path="/bookings" element={isAuth? <Bookings/> : <Navigate to="/loginrequired"/>}/>
                <Route path="/mybookings" element={isAuth? <MyBookings/> : <Navigate to="/loginrequired"/>}/>
                <Route path="/logbookmanager" element={<AdminRoute><LogbookManager/> </AdminRoute>}/>
                <Route path="/bookingmanager" element={<AdminRoute><BookingManager/> </AdminRoute>}/>
                <Route path="/petmanager" element={<AdminRoute><PetManager/> </AdminRoute>}/>
                <Route path="/logout" element={<LogOut/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>


        </>
    )
}

export default App
