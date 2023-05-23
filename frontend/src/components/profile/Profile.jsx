import React from 'react'
import RightSide from '../rightDiv/RightSide'
import ProfileLeft from './ProfileLeft'
import ProfileCard from './ProfileCard'
import './Profile.css'
import MyPostSide from './MyPostSide'
const Profile = () => {
  return (
    <div className="Profile">
      <ProfileLeft />
      <div className="Profile-center">
        <ProfileCard />
        <MyPostSide />
      </div>
      <RightSide />
    </div>
  )
}

export default Profile