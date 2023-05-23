import React, { useState, useRef } from "react";
import ProfileImage from "../../assets/profileImg.jpg";
import pro from "../../assets/pro.jpg";
import "./PostShare.css";
import { CgProfile } from 'react-icons/cg';
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { FcStackOfPhotos } from 'react-icons/fc';
import axios from "axios";
import { useCreatePostMutation, useGetPostsQuery } from "../../features/post/postAPI";





const PostShare = () => {
    const [image, setImage] = useState(null);
    const imageRef = useRef();
    const { user } = useSelector((state) => state.users) || {};

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const [imgPrev, setImgPrev] = useState(null);

    const [createPost, { isLoading, isSuccess, isError }] = useCreatePostMutation();



    const handleImage = event => {
        setFile(event.target.files[0]);
        const image = event.target.files[0];
        const formData = new FormData();
        formData.set('image', image);
        axios.post('https://api.imgbb.com/1/upload?key=87dddf2da47f63b4b871952317bd5a8b', formData)
            .then(res => {
                setImgPrev(res.data.data.display_url)
            })
    }

    const reset = () => {
        setTitle("");
        setDescription("");
        setImgPrev(null);
    }

    // title, description, image
    const handlePost = (e) => {
        e.preventDefault();
        if (user?.email) {
            createPost({
                title,
                description,
                image: imgPrev,
                user
            })
            toast.success("New Posted Successfully!!")
            reset()
        } else {
            toast('Please Login or SignUp for Post!',
                {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        }


    }

    return (
        <div className="PostShare">
            {user?.email ? <img src={user?.image} alt="AVATER" /> : <img src={pro} alt="IMG" />}
            <div>
                <form onSubmit={handlePost} >
                    <input type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Post Title" />
                    <input style={{ marginTop: "10px" }} type="text"
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Post Description" />
                    <div className="postOptions">
                        <div className="option" style={{ color: "var(--photo)" }}
                            onClick={() => imageRef.current.click()}
                        >
                            <FcStackOfPhotos size={20} />
                            Photo
                        </div>
                        <div className="option" style={{ color: "var(--video)" }}>
                            {/* <UilPlayCircle /> */}
                            Video
                        </div>{" "}
                        <div className="option" style={{ color: "var(--location)" }}>
                            {/* <UilLocationPoint /> */}
                            Location
                        </div>{" "}
                        <div className="option" style={{ color: "var(--shedule)" }}>
                            {/* <UilSchedule /> */}
                            Shedule
                        </div>
                        <button type="submit" className="button ps-button">Post</button>
                        <div style={{ display: "none" }}>
                            <input
                                type="file"
                                name="myImage"
                                ref={imageRef}
                                onChange={handleImage}
                            />
                        </div>
                    </div>
                    {imgPrev && (
                        <div className="previewImage">
                            <img src={imgPrev} alt="" />
                        </div>
                    )}
                </form>
            </div>
        </div >
    );
};

export default PostShare;
