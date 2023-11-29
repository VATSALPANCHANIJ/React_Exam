import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()
    const [alldata, setAlldata] = useState([])
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onsubmit = () => {
        let val = JSON.parse(localStorage.getItem('register'));
        let data = (val == null) ? [] : val;
        let ans = data.filter((val) => {
            if (val.email == email) {
                return val;
            }
        });
        if (ans.length != 0) {
            if (ans[0].password == password) {
                localStorage.setItem("login", JSON.stringify(ans[0]));
                toast.success("Successfully Login");
                navigate('/home')
            } else {
                toast.error("Password is not valid");
            }
        } else {
            toast.error("Email is not found");
        }
    }

    useEffect(() => {
        let admin = JSON.parse(localStorage.getItem('login'));
        if (admin) {
            navigate('/home');
        }
    }, [])


    return (
        <>

            <div className="testbox">
                <h1>Login</h1>
                <div className="d-flex justify-content-center">
                    <form className="">

                        <label id="icon" htmlFor="name"><i className="icon-envelope " /></label>
                        <input type="text" name="password " onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Email" />

                        <label id="icon" htmlFor="name"><i className="icon-shield"></i></label>
                        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Password" />

                        <button type="button" className="button" onClick={() => onsubmit()}>Login</button>
                        <Link to='/'>
                            <button className="button" type="button">Register</button>
                        </Link>




                    </form>
                </div>
            </div>
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
        </>
    )
}

export default Login