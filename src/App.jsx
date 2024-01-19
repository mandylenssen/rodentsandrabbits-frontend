import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import CreateAccount from "./pages/createaccount/CreateAccount.jsx";
import RegisterPet from "./pages/registerpet/RegisterPet.jsx";
import AccountCreated from "./pages/accountcreated/AccountCreated.jsx";
import LoginRequired from "./pages/loginrequired/LoginRequired.jsx";
import MyPets from "./pages/mypets/MyPets.jsx";
import SuccessfullBooking from "./pages/successfullbooking/SuccessfullBooking.jsx";
import PetBoarding from "./pages/petboarding/PetBoarding.jsx";
import Logbook from "./pages/logbook/Logbook.jsx";
import NotFound from "./pages/notfound/NotFound.jsx";
import EditBookings from "./pages/editbookings/EditBookings.jsx";
import MyBookings from "./pages/mybookings/MyBookings.jsx";
import Bookings from "./pages/bookings/Bookings.jsx";
import EditLogbook from "./pages/editlogbook/EditLogbook.jsx";
import Navigation from "./components/navigation/Navigation.jsx";
import Footer from "./components/footer/Footer.jsx";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";
import LogOut from "./pages/logout/LogOut.jsx";


function App() {

    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <Navigation/>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/createaccount" element={<CreateAccount/>}/>
                <Route path="/accountcreated" element={isAuth? <AccountCreated/> : <Navigate to="/logingrequired"/>}/>
                <Route path="/registerpet" element={<RegisterPet/>}/>
                <Route path="/mypets" element={isAuth? <MyPets/> : <Navigate to="/logingrequired"/>}/>
                <Route path="/petboarding" element={<PetBoarding/>}/>
                <Route path="/loginrequired" element={<LoginRequired/>}/>
                <Route path="/successfullbooking" element={isAuth? <SuccessfullBooking/> : <Navigate to="/loginrequired"/>}/>
                <Route path="/logbook" element={isAuth? <Logbook/> : <Navigate to="/logingrequired"/>}/>
                <Route path="/bookings" element={<Bookings/>}/>
                <Route path="/mybookings" element={isAuth? <MyBookings/> : <Navigate to="/logingrequired"/>}/>
                <Route path="/editlogbook" element={<EditLogbook/>}/>
                <Route path="/editbookings" element={<EditBookings/>}/>
                <Route path="/logout" element={<LogOut/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>


        </>
    )
}

export default App
