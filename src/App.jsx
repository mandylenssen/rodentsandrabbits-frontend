import './App.css'
import {Route, Routes} from "react-router-dom";
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




function App() {


    return (
        <>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/createaccount" element={<CreateAccount/>}/>
                <Route path="/accountcreated" element={<AccountCreated/>}/>
                <Route path="/registerpet" element={<RegisterPet/>}/>
                <Route path="/mypets" element={<MyPets/>}/>
                <Route path="/petboarding" element={<PetBoarding/>}/>
                <Route path="/loginrequired" element={<LoginRequired/>}/>
                <Route path="/successfullbooking" element={<SuccessfullBooking/>}/>
                <Route path="/logbook" element={<Logbook/>}/>
                <Route path="/bookings" element={<Bookings/>}/>
                <Route path="/mybookings" element={<MyBookings/>}/>
                <Route path="/editlogbook" element={<EditLogbook/>}/>
                <Route path="/editbookings" element={<EditBookings/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>


        </>
    )
}

export default App
