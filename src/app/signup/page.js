"use client"
import  {useRouter} from "next/navigation"
const { useState } = require("react")
export const Auth=()=>{
    const router = useRouter();
    const [form, setForm] = useState([
        {
            label: "Email",
            placeholder: "Email",
            type: "text",
            value: ""

        },
        {
            label: "First Name",
            placeholder: "First Name",
            type: "text",
            value: ""

        },
        {
            label: "Last Name",
            placeholder: "Last Name",
            type: "text",
            value: ""

        },
        {
            label: "Password",
            placeholder: "Password",
            type: "password",
            value: ""
        }
    ])  
    return (
        <div className="mt-[50px]">
            <div className="w-[500px] p-[1%] rounded-lg m-auto bg-[#1d1b1b]">
            <h1 className="ml-[2px]">Already have an account? <span onClick={()=>router.push("/signin")} className="cursor-pointer text-red-600">Sign-in now</span></h1>
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
                <button className="mt-[40px] bg-red-500 p-2 rounded-lg w-[50%] mt-[10px]">Sign-In</button>
                <div  className="mt-[5px] cursor-pointer text-sm">Reset Password?</div>
            </div>
        </div>
    )
}

export default Auth