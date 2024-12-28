"use client";
import React, {createContext, useReducer, useCallback} from 'react';
import axios from 'axios';
import { BASE_AUTH_URL } from '@/app/values';

export const UserContext = createContext({
    state: {user: null},
    action: {}
});
const userReducer = (state, action)=>{
    console.log(action.type)
    console.log(action.payload)
    switch(action.type){
        case "LOGIN":
            return {...state, user: action.payload}
        case "LOGOUT":
            return {...state, user: null}
        default:
            return state
    }
}

const UserContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(userReducer, {user: null})
    const login = async(email, password)=>{
        await axios.post(BASE_AUTH_URL+"/api/user/auth", {email, password}, {withCredentials:true})
        // try to get the user
        getUserFromToken()
    }
    const getUserFromToken=async()=>{
        try {
            const {data} = await axios.get(BASE_AUTH_URL+"/api/user/profile", {withCredentials:true})
            dispatch({type: "LOGIN", payload: {...data.message}})
        } catch (error) {
            console.log("error", error)
        }

    }
    return (
    <UserContext.Provider value={{state, action: {login, getUserFromToken}}}>
        {children}
    </UserContext.Provider>
    )
}

export default UserContextProvider