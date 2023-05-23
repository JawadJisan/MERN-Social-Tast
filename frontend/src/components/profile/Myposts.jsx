import React, { useEffect } from 'react'
import Post from "./Post"
import { useGetSingleAssignmentQuery } from '../../features/post/postAPI'
import { useSelector } from 'react-redux'


const Myposts = () => {
    const { user } = useSelector((state) => state.users)

    const { data: newData, isLoading, isError } = useGetSingleAssignmentQuery(user?._id);
    // user?._id


    return (
        <div className="Posts">
            <p className='notFounds' >My Post</p>
            {newData?.posts   && newData?.posts
                ?.map((post, id) => {
                    return <Post post={post} id={id} />
                })
            }
            { !newData?.posts?.length > 0 && <p className='notFound' >No Post Found</p>}
        </div>
    )
}

export default Myposts