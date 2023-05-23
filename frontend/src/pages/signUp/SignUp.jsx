import React, { useEffect, useRef, useState } from 'react'
import "./SignUp.css"
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useRegisterMutation } from '../../features/user/userAPI';
import axios from "axios";



export const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const [file, setFile] = useState("");

    const [avatarPreview, setAvatarPreview] = useState(null);




    const handleImage = event => {
        setFile(event.target.files[0]);
        const image = event.target.files[0];
        const formData = new FormData();
        formData.set('image', image);
        axios.post('https://api.imgbb.com/1/upload?key=87dddf2da47f63b4b871952317bd5a8b', formData)
            .then(res => {
                console.log(res, 'image bb url')
                setAvatarPreview(res.data.data.display_url)
                console.log(res.data.data.display_url)
            })
    }

    const [register, { data, isLoading, error: responseError, isSuccess }] = useRegisterMutation();


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, password, confirmPassword, avatarPreview);
        if (confirmPassword !== password) {
            toast.error("Password don't match!!")
        } else {
            if (avatarPreview !== null) {
                register({
                    name,
                    email,
                    password,
                    image: avatarPreview
                });
            } else {
                toast.error("Please Upload user photo")
            }
        }
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success('Registration Successfull')
            navigate('/')
        }
    }, [isSuccess, navigate])


    return (
        <>
            <div className="Auth">
                <div className="a-left">
                    <img src={Logo} alt="" />
                    <div className="Webname">
                        <h1>New Social</h1>
                        <h6>Explore the ideas throughout the world <br /> using New Social Media APP </h6>
                    </div>
                </div>

                <div className="a-right">
                    <form onSubmit={handleSubmit} className="infoForm authForm">
                        <h3>Create New Account</h3>
                        <div>
                            <input
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Name"
                                className="infoInput"
                                name="name"
                            />
                        </div>

                        <div>
                            <input
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="infoInput"
                                name="email"
                                placeholder="Email"
                            />
                        </div>

                        <div>
                            <input
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="infoInput"
                                name="password"
                                placeholder="Password"
                            />
                            <input
                                value={confirmPassword}
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                className="infoInput"
                                name="confirmpass"
                                placeholder="Confirm Password"
                            />
                        </div>

                        <div className="infoInput" style={{ color: "var(--photo)" }}
                        >
                            {/* <UilScenery /> */}
                            Photo
                            <input
                                type="file"
                                id="file"
                                onChange={handleImage}
                            // style={{ display: "none" }}
                            />

                        </div>
                        {avatarPreview !== null && (
                            <div className="previwAvater">
                                <img src={avatarPreview} alt="AVATER" />
                            </div>
                        )}
                        <div>
                            <span style={{ fontSize: '15px', display: "flex", alignItems: "center", justifyContent: "center" }}>Already have an account. <Link to='/signIn' > <span style={{ padding: "5px", marginLeft: "10px" }} className='button ' >Sign In</span> </Link> </span>
                        </div>
                        <button className="button infoButton" type="submit">Sign Up</button>
                    </form>

                </div>

            </div>
        </>
    )
}
