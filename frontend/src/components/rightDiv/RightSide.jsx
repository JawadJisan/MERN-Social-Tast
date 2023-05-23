import React, { useState } from "react";
import "./RightSide.css";
import Comment from "../../assets/comment.png";
import { FcHome } from 'react-icons/fc';
import { CgProfile } from 'react-icons/cg';

import TrendCard from "./TrendCard";
import ShareModal from "./ShareModal";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../features/user/userSlice";

import {RiLoginBoxFill} from "react-icons/ri"

const RightSide = () => {
    const [modalOpened, setModalOpened] = useState(false);
    const { user } = useSelector((state) => state.users) || {};
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const logout = (e) => {
        e.preventDefault()
        dispatch(userLoggedOut());
        localStorage.removeItem("auth");
        navigate('/SignIn')
    }




    return (
        <div className="RightSide">
            <div className="navIcons">
                <Link to="/" ><FcHome size={40} /></Link>

                <div className="profileDiv">
                    {user?.image ?
                        <nav className="navbar" >
                            <img onClick={toggleDropdown} className="profileIMG" src={user?.image} alt="Profile" />
                            {isDropdownOpen && (
                                <div className="navbar__dropdown" >
                                    <ul>
                                        <li><Link style={{ textDecoration: "none" }} to={"/profile"} >Profile</Link></li>
                                        <li onClick={logout} >Logout</li>
                                    </ul>
                                </div>
                            )}
                        </nav>
                        : <Link to="/signUp" > <RiLoginBoxFill size={40} /> </Link> }
                </div>
            </div>

            <TrendCard />

            <button className="button r-button" onClick={() => setModalOpened(true)}>
                New Post
            </button>
            <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
        </div>
    );
};

export default RightSide;
