import React from "react";
import "./ProfileCard.css";

import Cover from "../../assets/cover.jpg";
import Profile from "../../assets/profileImg.jpg";

const ProfileCard = ({ user }) => {
    const { name, email, image } = user;
    const ProfilePage = true;
    return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                <img src={Cover} alt="" />
                <img src={image} alt="" />
            </div>

            <div className="ProfileName">
                <span>{name}</span>
                <span>Senior UI/UX Designer</span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>6,890</span>
                        <span>Followings</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>1</span>
                        <span>Followers</span>
                    </div>

                    {ProfilePage && (
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>3</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>
            {ProfilePage ? "" : <span>My Profile</span>}
        </div>
    );
};

export default ProfileCard;
