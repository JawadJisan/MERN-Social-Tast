import React, { useState } from 'react'
import moment from 'moment';
import './Post.css'


import { useSelector } from 'react-redux'

import { AiFillLike, AiOutlineComment, AiFillDislike, AiFillDelete, AiFillEdit } from "react-icons/ai"
import { useAddLikeMutation, useDeleteSinglePostMutation, usePostCommentMutation } from '../../features/post/postAPI';
import { toast } from 'react-hot-toast';
import UpdatePost from './UpdatePost';


const Post = ({ post }) => {
    const { comments, description, image, likes, title, createdAt, _id } = post || {}
    const { user } = useSelector((state) => state.users) || {};
    const [deleteSinglePost, { }] = useDeleteSinglePostMutation();
    const [modalOpened, setModalOpened] = useState(false);





    const [addLike, { isLoading, isSuccess, isError }] = useAddLikeMutation();
    const [postComment, { }] = usePostCommentMutation();

    const [commentText, setCommentText] = useState('');
    const [isCommentOpen, setIsCommentOpen] = useState(false);

    const handleCommentIconClick = () => {
        setIsCommentOpen(!isCommentOpen);
    };
    const handleCommentChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleDeletePost = (event) => {
        if (user?.email) {
            deleteSinglePost(_id)
            toast.success("product deleted successfully!!")
        }

    };

    const handleEditPost = (event) => {
        if (user?.email) {
            toast.success("product deleted successfully!!")
        }
    };

    const handlePostComment = () => {
        if (commentText && user?.email) {
            postComment({
                comment: commentText,
                productId: _id,
                user: {
                    _id: user?._id,
                    name: user?.name
                }
            })
        } else if (commentText && !user?.email) {
            toast.error("Login first to comment this post")
        }
        else {
            toast.error("Please Type somethinmg")
        }
        setCommentText('');
        setIsCommentOpen(false);
    };


    const handleLike = (type) => {
        addLike({ productId: _id, type })
    }


    return (
        <div className="Post postHover ">
            <img src={image} alt="" />
            <div className="postReact2">
                <div className='deleteBTn'>
                    <button onClick={() => handleLike("like")} ><AiFillLike size={25} /></button>
                    <button onClick={() => handleLike("disLike")} ><AiFillDislike size={25} /></button>
                    <button
                        onClick={handleCommentIconClick}
                    ><AiOutlineComment size={25} /></button>
                </div>
                <div className='deletePostBtn' >
                    <button
                        onClick={handleDeletePost}
                    ><AiFillDelete size={25} /></button>

                    <button
                        onClick={() => setModalOpened(true)}
                    ><AiFillEdit size={25} />
                    </button>
                    <div>
                        <UpdatePost
                            post={post}
                            modalOpened={modalOpened}
                            setModalOpened={setModalOpened}
                        />
                    </div>
                </div>
            </div>


            <span style={{ color: "var(--gray)", fontSize: '12px' }}>{likes} likes</span>

            <div>
                {comments.length > 0 && comments.map((c) => (
                    <p className='comment'> {c.comment} </p>
                ))}
            </div>

            <div>
                {isCommentOpen && (
                    <div className="comment-input">
                        <textarea
                            required
                            placeholder="Enter your comment"
                            value={commentText}
                            onChange={handleCommentChange}
                        />
                        <button onClick={handlePostComment}>Post</button>
                    </div>
                )}
            </div>

            <div className="detail">
                <div  >
                    <span><b>{title}</b></span><br />
                    <span> {description}</span>
                </div>
                <div className='postBy' >
                    <p>Post by: <span>{user?.name}</span> </p>
                    <p>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                </div>
            </div>
        </div>
    )
}

export default Post