import axios from 'axios'
import history from '../history'

const SET_USERS = "SET_USERS"

const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}

export default function usersReducer(state = [], action) {
    switch(action.type) {
        case SET_USERS: 
            return action.users;
        default:
            return state;
    }
}

export const fetchUsers = () => async (dispatch) => {
    try { 
        const { data } = await axios.get("/api/users");
        dispatch (setUsers(data))
    } catch (err) {
        console.error(err)
    }
}