import React from "react";
import Cover from "../../assets/cover.jpg";
import Profile from "../../assets/profileImg.jpg";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { useGetSingleAssignmentQuery } from "../../features/post/postAPI";
import { useGetUSerInfoQuery } from "../../features/user/userAPI";

const ProfileCard = () => {
    const ProfilePage = true;

    const { user } = useSelector((state) => state.users)
    const { data } = useGetUSerInfoQuery(user?._id);

    const { data: newData, isLoading, isError } = useGetSingleAssignmentQuery(user?._id);


    return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                <img className="coverImgg" src={data?.user?.info?.[0]?.coverPrev ? data?.user?.info?.[0]?.coverPrev : Cover } alt="Cover" />
                <img src={data?.user?.image} alt="" />
            </div>

            <div className="ProfileName">
                <span>{user?.name} </span>
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
                                <span> {newData?.posts?.length} </span>
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
