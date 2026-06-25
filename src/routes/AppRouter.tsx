import {Route, Routes} from "react-router-dom";

import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import Dashboard from "../pages/Dashboard";
import AddPage from "../pages/AddPage";
import EditPage from "../pages/EditPage";
import ProfilePage from "../pages/ProfilePage";
import ItemDetailPage from "../pages/ItemDetailPage";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/add" element={<AddPage/>}/>
            <Route path="/edit/:id" element={<EditPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/product/:id" element={<ItemDetailPage />} />
        </Routes>
    )
}