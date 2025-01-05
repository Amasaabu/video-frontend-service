"use client"
import Section1 from '@/components/section1/section'
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_CONTENT_URL, BASE_STREAM_URL, BASE_USER_PROFILE_URL } from "./values";
import { UserContext } from "@/context/userContext";
import  {useRouter} from "next/navigation"
import { useContext } from "react";
export default function Home() {
  const userCxt = useContext(UserContext);
  const [videos, setVideos]=useState([])
  const [likedVideos, setLikedVideos]=useState([])
  const router = useRouter()
  //guard to prevent unsubscribed users from accessing the page
  useEffect(() => {
    //dont perform the check until the user object is available
    if (!userCxt.state.user) return;
    if (userCxt.state.user?.subscriptionstatus != "active") {
      router.push("/subscribe");
    }
  }, [userCxt.state.user?.subscriptionstatus]);
  useEffect(()=>{
    // userCxt.action.getUserFromToken()
    const fetchVideos = async()=>{
      const {data} = await axios.get(BASE_CONTENT_URL + "/api/content/all/video")
      setVideos(data)
    }

    const getLikes = async()=>{
      const cookies = document.cookie.split(';')
      let parts = []
      cookies.forEach(cookie=>{
        if(cookie.includes('token')){
          parts = cookie.split('=')
        }})
      
      console.log('Before axios');
      console.log(parts[1])

      const {data} = await axios.get(BASE_USER_PROFILE_URL + "/api/profile/likes", {headers: {token: `${parts[1]}`}}) 
      console.log("liked videos")
      console.log(data)
      setLikedVideos(data.message)
    }
    getLikes()
    fetchVideos()
  },[])
  return (
  <>
    <section className="p-[20px]">
      <h2 className="mb-[10px] text-lg">Recently Added</h2>
      <Section1 videos={videos}/>
    </section>

    <section className="p-[20px]">
      <h2 className="mb-[10px] text-lg">Likes</h2>
      <Section1 videos={likedVideos}/>
    </section>

    <section className="p-[20px]">
      <h2 className="mb-[10px] text-lg">Watch List</h2>
      <Section1 videos={videos}/>
    </section>
  
  </>
  );
}
