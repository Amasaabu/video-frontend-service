"use client"
import { useState, useContext, useEffect } from "react"  
import  {useRouter} from "next/navigation"
import { UserContext } from "@/context/userContext"  
import { BASE_USER_PROFILE_URL } from "../values"
import axios from "axios"
const Profile = ()=>{
    const userCxt = useContext(UserContext)
    const [updateStatus, setUpdateStatus] = useState(false)
    const [subscriptionDetails, setSubscriptionDetails] = useState({ends_at: "NULL"})  
    const [form, setForm] = useState({
       amount: {
            label: "Amount",
            placeholder: "Amount",
            type: "number",
            value: 0

        },
       cardNumber: {
            label: "Card Number",
            placeholder: "Card Number",
            type: "text",
            value: ""

        }
}) 
    const router = useRouter();
    const subscribe=async()=>{
        const requestObject = { 
            amount: form.amount.value,
            cardnumber: form.cardNumber.value,
            currency: "GBP"
        }
        const cookies = document.cookie.split(';')
        let parts = []
        cookies.forEach(cookie=>{
          if(cookie.includes('token')){
            parts = cookie.split('=')
          }})
          try {
            const {data} = await axios.post(BASE_USER_PROFILE_URL + "/api/profile/subscribe", requestObject, {headers: {token: parts[1]}})
            setUpdateStatus("Subscription updated successfully, navigate to home")
            router.push("/")
          } catch (error) {
            console.log(error)
            setUpdateStatus("Subscription update failed, kindly try again")
          }
    }
    const getsubdetails = async()=>{
        try {
            const cookies = document.cookie.split(';')
            let parts = []
            cookies.forEach(cookie=>{
              if(cookie.includes('token')){
                parts = cookie.split('=')
              }})
            const {data} = await axios.get(BASE_USER_PROFILE_URL + "/api/profile/subscribe", {headers: {token: parts[1]}})
            console.log(data);
            setSubscriptionDetails(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        console.log("Before firing")
        console.log(userCxt.state.user)
        if(userCxt.state.user?.subscriptionstatus=="active"){
            //get subscription expiry date
            getsubdetails()
        }
    },[userCxt.state.user])
    const renew = (
        <>
        <div className="text-red-500">Your subscription has expired, kindly renew</div>
        <div className="w-fit m-auto">Renew Subscription</div>
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
                <button onClick={()=>subscribe()} className="mt-[40px] bg-red-500 p-2 rounded-lg w-[50%] mt-[10px]">Renew Subscription</button>
                {updateStatus?<div className="ml-[3px]">Mesage: {setUpdateStatus}</div>:''}
        </>
    )
    return (
        <div className="w-[50%] m-auto">
            {userCxt.state.user?.subscriptionstatus=="active"?<h1 className="w-fit m-auto">Your current subscription Status will expire on: {subscriptionDetails.ends_at}</h1>:renew}
           
        </div>
    )
}

export default Profile