import React, { useEffect, useState } from 'react';
import "./SignIn.css";
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../features/user/userAPI';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const { user } = useSelector((state) => state.users) || {}



    const [login, { data, isLoading, error: responseError, isSuccess }] =
        useLoginMutation();

    const loginSubmit = (e) => {
        e.preventDefault();
        login({
            email,
            password
        })
        console.log(email, password)
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success(' Login Successfull')
        }
        if (responseError) {
            toast.error("Invalid email or password")
        } if (user?.email) {
            navigate('/')
        }
    }, [isSuccess, navigate, responseError, user?.email])

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
                    <form onSubmit={loginSubmit} className="infoForm authForm">
                        <h3>Sign In to Account</h3>

                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="infoInput"
                                name="username"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                className="infoInput"
                                placeholder="Password"
                                name="password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <span style={{ fontSize: '15px', display: "flex", alignItems: "center", justifyContent: "center" }}>Don't have an account Sign up <Link to='/signUp' > <span style={{ padding: "5px", marginLeft: "10px" }} className='button ' >Sign Up</span> </Link> </span>
                        </div>
                        <button type='submit' className="button infoButton">Login</button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default SignIn