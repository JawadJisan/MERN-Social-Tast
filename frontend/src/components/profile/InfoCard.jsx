import React, { useState } from "react";
import "./InfoCard.css";
import { AiFillEdit } from "react-icons/ai"
import ProfileModal from "./ProfileModal";
import { useGetUSerInfoQuery, useUpdateInfoMutation } from "../../features/user/userAPI";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";


const InfoCard = () => {
    const [modalOpened, setModalOpened] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const { user } = useSelector((state) => state.users);
    const { fName, lName, worksAt, livesIn, country, relation, imgPrev, coverPrev } = user?.info?.[0] || {}

    const { data } = useGetUSerInfoQuery(user?._id);


    const logout = (e) => {
        e.preventDefault()
        dispatch(userLoggedOut());
        localStorage.removeItem("auth");
        navigate('/SignIn')
    }

    return (
        <div className="InfoCard">
            <div className="infoHead">
                <h4>Your Info</h4>
                <div>
                    <AiFillEdit
                        size={30}
                        onClick={() => setModalOpened(true)}
                    />
                    <ProfileModal
                        modalOpened={modalOpened}
                        setModalOpened={setModalOpened}
                    />
                </div>
            </div>

            <div className="info">
                <span>
                    <b>Status </b>
                </span>
                <span>in {data?.user?.info?.[0]?.relation} </span>
            </div>

            <div className="info">
                <span>
                    <b>Lives in </b>
                </span>
                <span> {data?.user?.info?.[0]?.livesIn} {data?.user?.info?.[0]?.country} </span>
            </div>

            <div className="info">
                <span>
                    <b>Works at </b>
                </span>
                <span> {data?.user?.info?.[0]?.worksAt} </span>
            </div>

            <button onClick={logout} className="button logout-button">Logout</button>
        </div>
    );
};

export default InfoCard;
