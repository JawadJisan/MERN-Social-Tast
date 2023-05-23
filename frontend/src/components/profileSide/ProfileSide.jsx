import React from 'react'
import "./ProfileSide.css"
import LogoSearch from '../logoSearch/LogoSearch'
import ProfileCard from '../profileCard/ProfileCard'
import Followers from '../followers/Followers'
import { useSelector } from 'react-redux'

const ProfileSide = () => {

    const { user } = useSelector((state) => state.users) || {};


    return (
        <>
            <div className="ProfileSide">
                <LogoSearch />
                {user?.email && <ProfileCard user={user} />}
                <Followers />
            </div>
        </>
    )
}

export default ProfileSide