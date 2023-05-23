import React from 'react'
import Post from "./Post"
import './Posts.css'
import { useGetPostsQuery } from '../../features/post/postAPI'
import { useSelector } from 'react-redux'


const Posts = () => {
    const { user } = useSelector((state) => state.users)
    const { data } = useGetPostsQuery();

    return (
        <div className="Posts">
            {data?.posts?.map((post, id) => {
                return <Post post={post} id={id} />
            })}
        </div>
    )
}

export default Posts