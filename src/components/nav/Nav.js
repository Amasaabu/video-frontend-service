import { ProfileIcon } from "../profileicon/ProfileIcon";
import Link from "next/link";
const Nav=()=>{
    const navItems = ["Home", "Trending", "Settings", "Liked Videos", "History"];
    return (
        <div className="flex mt-[20px]">
            <div className="text-red ml-[20px] text-[30px] text-red-500 w-fit">EduTube</div>
            <div className="flex ml-[60px] w-[40%] justify-around">
                    {navItems.map((item, id)=>{
                    return <div key={id} className="color-white text-[20px] cursor-pointer">
                        <Link href={{pathname: '/'+item}}>{item} </Link>
                    </div>
                     })}
            </div>
            <div className="w-fit  mr-[8%] ml-auto">
                <ProfileIcon user={{ name: "John Doe", avatar: null}} />
            </div>
        </div>
    )
}

export default Nav