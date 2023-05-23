import React from 'react'
import './Followers.css'

import img1 from "../../assets/img1.png";


export const followers = [
    { name: "Andrew Thomas", username: "AndrewThomas", img: img1 },
    { name: "Hulk Buster", username: "HulkBuster", img: img1 },
    { name: "Thor", username: "ThunderMaster", img: img1 },
    { name: "Natasha", username: "Natasha", img: img1 },
];
const Followers = () => {
    return (
        <div className="FollowersCard">
            <h3>Who is following you</h3>

            {followers.map((follower, id) => {
                return (
                    <div className="follower">
                        <div>
                            <img src={follower.img} alt="" className='followerImage' />
                            <div className="name">
                                <span>{follower.name}</span>
                                <span>@{follower.username}</span>
                            </div>
                        </div>
                        <button className='button fc-button'>
                            Follow
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default Followers