import React, { useState } from 'react'
import PostShare from '../postShare/PostShare'
import Myposts from './Myposts'


const MyPostSide = () => {
    return (
        <div className="PostSide">
            <PostShare />
            <Myposts />
        </div>
    )
}

export default MyPostSide