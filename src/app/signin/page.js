"use client"
import { UserContext } from "@/context/userContext"
import { useContext } from "react"
import  {useRouter} from "next/navigation"
import axios from "axios"
import { BASE_URL } from "../values"
import { BASE_AUTH_URL } from "../values"
const { useState } = require("react")
export const Auth=()=>{
    const router = useRouter();

    const [form, setForm] = useState({
        email: {
            label: "Email",
            placeholder: "Email",
            type: "text",
            value: ""

        },
        password: {
            label: "Password",
            placeholder: "Password",
            type: "password",
            value: ""
        }
}) 
    const userCxt = useContext(UserContext)
    if (userCxt.state.user) router.push("/")
    return (
        <div className="mt-[50px]">
            <div className="w-[420px] p-[1%] rounded-lg m-auto bg-[#1d1b1b]">
            <h1 className="ml-[2px]">Want a free account? <span onClick={()=>router.push("/signup")} className="cursor-pointer text-red-600 ">Sign-up now</span></h1>
                {Object.keys(form).map((item, id)=>{
                return (
                    <div className="mt-[10px]" key={id}>
                        <label className="ml-[3px]">{form[item].label}</label>
                        <input
                        className="block text-white bg-gray-800 p-2 rounded-lg w-[100%]"
                        type={form[item].type}
                        placeholder={form[item].placeholder}
                        onChange={e=>setForm({...form, [item]:{...form[item], value:e.target.value}})}
                    />
                    </div>
                    )
                })}
                <button onClick={()=>userCxt.action.login(form.email.value, form.password.value)} className="mt-[40px] bg-red-500 p-2 rounded-lg w-[50%] mt-[10px]">Sign-In</button>
                <div className="mt-[5px] cursor-pointer text-sm">Reset Password?</div>
            </div>
        </div>
    )
}

export default Auth