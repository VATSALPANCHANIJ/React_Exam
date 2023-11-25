import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link, } from "react-router-dom"


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [alldata, setRecord] = useState([]);
    const [record, setrecord] = useState([]);
    const navigate = useNavigate();

    const [edit, setEdit] = useState("");
    const [input, setInput] = useState({
        name: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value
        });
    }
    const sumbit = () => {
        if (edit) {
            let ans = record.filter((val) => {
                if (val.id == edit) {
                    val.name = input.name
                    val.phone = input.phone
                }
                return val

            })
            setRecord(ans);
            setEdit("");
        } else {
            let obj = {
                id: Math.floor(Math.random() * 10000),
                name: input.name,
                phone: input.phone
            }
            let data = [...record, obj];
            setRecord(data);
            console.log(data);
            localStorage.setItem('userdatastore', JSON.stringify(data));
            alert(' add to local storage');
        }
        setInput({
            name: '',
            phone: ''
        })
    }
    const deletedata = (id) => {
        let ans = alldata.filter((val) => {
            return val.id !== id;
        })
        setRecord(ans);
        localStorage.setItem('userdatastore', JSON.stringify(ans));
        alert("deletedata");
    }

    const editData = (id) => {
        let ans = record.filter((val) => {
            return val.id == id;
        });
        setEdit(id)
        setInput(ans[0])
    }
    useEffect(() => {
        let enter = JSON.parse(localStorage.getItem('userdatastore'));
        if (!enter) {
            navigate('/login')
        }

        let all = JSON.parse(localStorage.getItem('userdatastore'));
        if (all === null) {
            setRecord([]);
        } else {
            setRecord(all);
        }
    }, [])
    return (
        <>
            <table>
                <div className="testbox">

                    <tr>

                        <label id="icon" htmlFor="name"><i className="icon-user" /></label>
                        <input type="text" placeholder="Enter your employee" name="name" onChange={handleChange} value={input.name} />

                    </tr>

                    <label id="icon" htmlFor="password"><i className="icon-shield"></i></label>
                    <input type="text" name="phone" placeholder="Enter your employee number" onChange={handleChange} value={input.phone} />



                    {
                        edit ? (
                            <button type="button" className="button" onClick={() => sumbit()}>edit</button>
                        ) : (
                            <button type="button" className="button" onClick={() => sumbit()}>submit</button>
                        )
                    }



                </div>

            </table>
            <h2>data show</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        alldata.map((val) => {
                            return (
                                <tr key={val.id}>
                                    <td>{val.id}</td>
                                    <td>{val.name}</td>
                                    <td>{val.phone}</td>
                                    <td><button type="button" onClick={() => deletedata(val.id)}>deleteData</button>
                                        <button type="button" onClick={() => editData(val.id)}>editData</button>

                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
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
            </table>
        </>
    );
}

export default Home;
