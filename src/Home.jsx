import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD_DATA, DATA_DELETE, DATA_EDIT, UP_DATE } from "./action/action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {

    const dispatch = useDispatch();
    const record = useSelector(state => state.Crud.users)
    const singal = useSelector(state => state.Crud.user)
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [edit, setEdit] = useState("");


    const onsubmit = () => {
        if (edit) {
            let obj = {
                id: edit,
                name: name,
            }
            dispatch(UP_DATE(obj))
        } else {
            let obj = {
                id: Math.floor(Math.random() * 1000),
                name: name,
            }
            toast.success("Successfully Add");
            dispatch(ADD_DATA(obj))
        }
        setName("")
        setEdit("")
    }

    useEffect(() => {
        let admin = JSON.parse(localStorage.getItem('login'));
        if (!admin) {
            navigate('/login');
        }
    }, [])
    useEffect(() => {
        setName(singal.name);
        setEdit(singal.id);
    }, [singal])
    return (
        <center>
            <h1>Taks</h1>


            <label id="icon" htmlFor="name"><i className="icon-envelope " /></label>

            <input type="text" name="name" onChange={(e) => setName(e.target.value)} value={name}></input>
            <td>
                {
                    (edit) ? (<button type="button" className="button" onClick={() => onsubmit()}>Edit</button>)
                        : (<button type="button" className="button" onClick={() => onsubmit()}>Submit</button>)
                }
            </td>

            <br /><hr />
            <table >
                <thead className="text-center">
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>

                    {
                        record.map((val) => {
                            const { name, id } = val
                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td><button onClick={() => dispatch(DATA_DELETE(id))} className="button" >Delete</button></td>
                                    <td><button onClick={() => dispatch(DATA_EDIT(id))} className="button" >Edit</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>

            <ToastContainer />
        </center >
    )
}

export default Home