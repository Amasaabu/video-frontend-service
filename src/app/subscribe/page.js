"use client"
import { useState, useContext, useEffect } from "react"  
import  {useRouter} from "next/navigation"
import { UserContext } from "@/context/userContext"  
import { BASE_USER_PROFILE_URL } from "../values"
import axios from "axios"
const plans = [
    {
      name: 'Basic',
      price: 8.99,
      features: ['Watch on 1 screen at a time', 'Watch in HD', 'Unlimited movies and TV shows', 'Cancel anytime'],
    },
    {
      name: 'Standard',
      price: 13.99,
      features: ['Watch on 2 screens at a time', 'Full HD available', 'Unlimited movies and TV shows', 'Cancel anytime'],
    },
    {
      name: 'Premium',
      price: 17.99,
      features: ['Watch on 4 screens at a time', 'Ultra HD and HDR available', 'Unlimited movies and TV shows', 'Cancel anytime'],
    },
  ]
const Profile = ()=>{
    const userCxt = useContext(UserContext)
    const [updateStatus, setUpdateStatus] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState('Standard')
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
            value: 678721212126988

        }
}) 
    const router = useRouter();
    const subscribe=async(e)=>{
        e.preventDefault()
        console.log(selectedPlan)
        let amount = 0
        Object.keys(plans).map((item, id)=>{
            if(plans[item].name == selectedPlan){
                amount = plans[item].price
            }
        })
        const requestObject = { 
            amount: amount,
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
            router.push("/")
            setUpdateStatus("Subscription updated successfully, navigate to home")
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
    const monthSubscriptionCard = (
        <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Choose your plan</h1>
          <form onSubmit={subscribe}>
            <div className="grid gap-8 md:grid-cols-3">
              {plans.map((plan) => (
                <div 
                  key={plan.name} 
                  className={`relative rounded-lg p-6 border-2 transition-all duration-300 ${
                    selectedPlan === plan.name 
                      ? 'border-red-600 bg-red-900 bg-opacity-20' 
                      : 'border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    id={plan.name}
                    value={plan.name}
                    checked={selectedPlan === plan.name}
                    onChange={() => setSelectedPlan(plan.name)}
                    className="absolute right-4 top-4 w-4 h-4 text-red-600 border-red-600 focus:ring-red-600"
                  />
                  <label htmlFor={plan.name} className="block space-y-2 cursor-pointer">
                    <h2 className="text-xl font-semibold">{plan.name}</h2>
                    <p className="text-2xl font-bold">${plan.price}/month</p>
                    <ul className="space-y-2 mt-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <svg className="w-4 h-4 mr-2 text-red-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </label>
                </div>
              ))}
            </div>
            <button 
              type="submit" 
              className="w-full mt-8 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md font-semibold transition-colors duration-300"
            >
              Subscribe to {selectedPlan}
            </button>
          </form>
        </div>
      </div>
    )
    return (
        <div className="w-[50%] m-auto">
            {userCxt.state.user?.subscriptionstatus=="active"?<h1 className="w-fit m-auto">Your current subscription Status will expire on: {subscriptionDetails.ends_at}</h1>:monthSubscriptionCard}
           
        </div>
    )
}

export default Profile