import React from "react";
import "./App.css"
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


import SignIn from "./pages/signIn/SignIn";
import { SignUp } from "./pages/signUp/SignUp";
import Home from "./pages/home/Home";
import Profile from "./components/profile/Profile";
import useAuthCheck from "./hooks/useAuthCheck";

const App = () => {
  const authChecked = useAuthCheck();
  return !authChecked ? (<div>Loading</div>) : (
    <Router  >
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App