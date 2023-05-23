import React, { useState } from 'react'
import './Post.css'
import moment from 'moment';


import { useSelector } from 'react-redux'

import { AiFillLike, AiOutlineComment, AiFillDislike } from "react-icons/ai"
import { useAddLikeMutation, usePostCommentMutation } from '../../features/post/postAPI';
import { toast } from 'react-hot-toast';


const Post = ({ post }) => {
    const { comments, description, image, likes, title, createdAt, _id } = post || {}
    const { user } = useSelector((state) => state.users) || {};



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
        <div className="Post">
            <img src={image} alt="" />
            <div className="postReact">
                <div>
                    <button onClick={() => handleLike("like")} ><AiFillLike size={25} /></button>
                    <button onClick={() => handleLike("disLike")} ><AiFillDislike size={25} /></button>
                    <button
                        onClick={handleCommentIconClick}
                    ><AiOutlineComment size={25} /></button>
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