import React, { useState } from "react";
import { NavLink } from "react-browser-router";
import { useNavigate } from "react-router-dom";
import { Link, } from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const submit = () => {
        if (!email || !password) {
            toast.error('Please enter both email and password', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                style: {
                    width: '400px',
                },


            });
            return;
        }
        let data = JSON.parse(localStorage.getItem('alldata'));
        console.log(data);
        let ans = data.filter((val) => {
            if (val.email == email && val.password == password) {
                return val;
            }
        })
        if (ans.length != 0) {
            if (ans[0].password == password) {
                localStorage.setItem('alldata', JSON.stringify(ans[0]));
                navigate('/home');
            } else {
                toast.error('Please enter password');
            }
        } else {
            toast.error('Please enter email');
        }
        setEmail("");
        setPassword("");

    };

    return (
        <>
            <div className="testbox">
                <h1>Login</h1>
                <form>
                    <label id="icon" htmlFor="name"><i className="icon-envelope " /></label>
                    <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />

                    <label id="icon" htmlFor="name"><i className="icon-shield"></i></label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
                    <button className="button" type="button" onClick={() => submit()}>Login</button>

                    <Link to='/' >
                        <button className="button" type="button">Register</button>

                    </Link>

                </form>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
        </>
    );
};

export default Login;
