import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, } from "react-router-dom"


const Register = () => {
    const [alldata, setAlldata] = useState([]);
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    }

    const submit = () => {
        if (!input.name || !input.phone || !input.email || !input.password) {
            toast.error('Please fill in all fields', {
                position: "top-right",
                autoClose: 2000,
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
        let obj = {
            id: Math.floor(Math.random() * 10000),
            name: input.name,
            phone: input.phone,
            password: input.password,
            email: input.email
        }
        let data = [...alldata, obj];
        setAlldata(data);
        localStorage.setItem('alldata', JSON.stringify(data));
        toast.success('Successfully Add', {
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
        navigate('/login');
        setInput({
            name: '',
            phone: '',
            password: '',
            email: '',
        });
    }

    useEffect(() => {
        let all = JSON.parse(localStorage.getItem('alldata'));
        if (all === null) {
            setAlldata([]);
        } else {
            setAlldata(all);
        }
    }, []);

    return (
        <>
            <div className="testbox">
                <h1>Registration</h1>
                <form>
                    <label id="icon" htmlFor="email"><i className="icon-envelope" /></label>
                    <input type="text" name="email" onChange={handleChange} value={input.email} placeholder="Email" />

                    <label id="icon" htmlFor="name"><i className="icon-user" /></label>
                    <input type="text" name="name" onChange={handleChange} value={input.name} placeholder="Name" />

                    <label id="icon" htmlFor="phone"><i className="icon-phone" /></label>
                    <input type="text" name="phone" onChange={handleChange} value={input.phone} placeholder="Telephone Number" />

                    <label id="icon" htmlFor="password"><i className="icon-shield"></i></label>
                    <input type="password" name="password" onChange={handleChange} value={input.password} placeholder="Password" />

                    <button className="button" type="button" onClick={() => submit()}>Register</button>
                    <Link to='/login' >
                        <button className="button" type="button">Login</button>
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
}

export default Register;
