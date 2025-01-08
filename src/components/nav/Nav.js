"use client"
import { ProfileIcon } from "../profileicon/ProfileIcon";
import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
const Nav=()=>{
    const userCxt = useContext(UserContext);
    console.log("Nav is rendering")
    console.log(userCxt.state.user)
    const navItems = [{name: "Home", path: "/"}, {name: "Trending", path: ""}, {name: "Subscription", path:"/subscribe"}];
    if (userCxt.state.user) {navItems.push({name: "Logout", path: "/logout"})}
    if (userCxt.state.user?.status=="ADMIN") {console.log("adding...");navItems.push({name: "Upload", path: "/upload"})}
    console.log(navItems);
    return (
        <div className="flex mt-[20px]">
            <div className="text-red ml-[20px] text-[30px] text-red-500 w-fit">EduTube</div>
            <div className="flex ml-[60px] w-[40%] justify-around">
                    {navItems.map((item, id)=>{
                    return <div key={id} className="color-white text-[20px] cursor-pointer">
                        <Link href={{pathname: item.path}}>{item.name} </Link>
                    </div>
                     })}
            </div>
            <div className="w-fit  mr-[8%] ml-auto">
                <ProfileIcon user={userCxt.state } />
               {userCxt.state.user&& <button onClick={userCxt.action.logout} className="bg-red-500 p-2 rounded-lg w-[50%] ml-[10px]">Sign-Out</button>}
            </div>
        </div>
    )
}

export default Nav