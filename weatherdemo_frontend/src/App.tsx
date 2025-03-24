
import Signup from "./pages/Signup";
import './App.css';
import Login from "./pages/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import Members from "./pages/Members";
import ForgotPassword from "./pages/ForgotPassword";
import SignupSuccess from "./pages/SignupSuccess";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (
        <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/success" element={<SignupSuccess />} />
            <Route path="/" element={<Navigate to="/login" replace/>}/>
            {/* Protected */}
            <Route element={<ProtectedRoute />}>
                <Route path="/members" element={<Members />} />
            </Route>
        </Routes>
    );
}
export default App;
