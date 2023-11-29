import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [alldata, setAlldata] = useState([])

    const onsubmit = () => {
        let obj = {
            id: Math.floor(Math.random() * 1000),
            name: name,
            email: email,
            password: password,
            phone: phone
        }
        let data = [...alldata, obj];
        localStorage.setItem("register", JSON.stringify(data));
        setAlldata(data);
        setEmail("");
        setPassword("");
        setPhone("");
        setName("");
        toast.success("Successfully registered");
        navigate("/login")
    }
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('register'));
        if (data === null) {
            setAlldata([])
        } else {
            setAlldata(data)
        }
        let admin = JSON.parse(localStorage.getItem('login'));
        if (admin) {
            navigate('/home');
        }
    }, [])

    return (
        <center>
            <div className="testbox">
                <h1>Registration</h1>
                <form>
                    <label id="icon" htmlFor="email"><i className="icon-envelope" /></label>
                    <input type="text" name="email" onChange={(e) => setName(e.target.value)} value={name} placeholder="Name" />

                    <label id="icon" htmlFor="email"><i className="icon-envelope" /></label>
                    <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />


                    <label id="icon" htmlFor="phone"><i className="icon-phone" /></label>
                    <input type="text" name="phone" onChange={(e) => setPhone(e.target.value)} value={phone} placeholder="Telephone Number" />

                    <label id="icon" htmlFor="password"><i className="icon-shield"></i></label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
                    <Link to='/login' >
                        <button className="button" type="button">Login</button>
                    </Link>

                    <div className="md-3 d-flex justify-content-center">

                        <button type="button" className="button"  onClick={() => onsubmit()}>Submit</button>
                    </div>
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
        </center>
    )
}

export default Register