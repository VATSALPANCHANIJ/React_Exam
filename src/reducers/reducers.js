import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let initialState = {
    users: localStorage.getItem('record') ? JSON.parse(localStorage.getItem('record')) : [],
    user: {}
}

const Crud = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_DATA":
            let insertdata = action.payload;
            let data = [...state.users, insertdata];
            localStorage.setItem("record", JSON.stringify(data));
            return {
                ...state,
                users: data
            }
            break;
        case "DATA_DELETE":
            let Delete = state.users.filter((val) => {
                return val.id != action.payload
            })
            localStorage.setItem("record", JSON.stringify(Delete));
            toast.success("Successfully Delete");
            return {
                ...state,
                users: Delete
            }
            break;
        case "DATA_EDIT":
            let edit = state.users.find((val) => {
                return val.id == action.payload
            })
            return {
                ...state,
                user: edit
            }
            break;
        case "UP_DATE":
            let Update = state.users.map((val) => {
                if (val.id === action.payload.id) {
                    return {
                        ...val,
                        name: action.payload.name
                    }
                }
                return val
            })
            localStorage.setItem("record", JSON.stringify(Update));
            toast.success("Successfully UP date");
            return {
                ...state,
                users: Update
            }
            break;

        default:
            return state
    }
    <ToastContainer />
}

export default Crud