"use client";
import React, {createContext, useReducer, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BASE_AUTH_URL } from '@/app/values';

export const UserContext = createContext({
    state: {user: null},
    action: {}
});
const userReducer = (state, action)=>{
    console.log(action.type)
    console.log(action.payload)
    //
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
    const router = useRouter()
    const [state, dispatch] = useReducer(userReducer, {user: null})
    const login = async(email, password)=>{
        console.log("login")
        await axios.post(BASE_AUTH_URL+"/api/user/auth", {email, password}, {withCredentials:true})
        // router.push("/")
        location.href = "/"
    }
    useEffect(()=>{
        getUserFromToken()
    },[])
    const getUserFromToken=async()=>{
        try {
            const {data} = await axios.get(BASE_AUTH_URL+"/api/user/profile", {withCredentials:true})
            dispatch({type: "LOGIN", payload: {...data.message}})
        } catch (error) {
            router.push("/signin")
            console.log("error", error)
             document.cookie = 'token=; Max-Age=0; path=/;'
        }

    }
    const logout=()=>{
        document.cookie = 'token=; Max-Age=0; path=/;'
        dispatch({type: "LOGOUT"})
        router.push("/signin")
    }
    return (
    <UserContext.Provider value={{state, action: {login, getUserFromToken, logout}}}>
        {children}
    </UserContext.Provider>
    )
}

export default UserContextProvider