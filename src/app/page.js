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
  const [watchListVideos, setWatchListVideos]=useState([])
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
      const {data} = await axios.get(BASE_USER_PROFILE_URL + "/api/profile/likes", {headers: {token: `${parts[1]}`}}) 
      setLikedVideos(data.message)
    }

    const getWatchlist = async()=>{
      const cookies = document.cookie.split(';')
      let parts = []
      cookies.forEach(cookie=>{
        if(cookie.includes('token')){
          parts = cookie.split('=')
        }})
      
      console.log('Before axios');
      console.log(parts[1])

      const {data} = await axios.get(BASE_USER_PROFILE_URL + "/api/profile/watchlist", {headers: {token: `${parts[1]}`}}) 
      console.log("watchlist videos")
      console.log(data)
      setWatchListVideos(data.message)
    }
    getWatchlist()
    getLikes()
    fetchVideos()
  },[])
  const likedVideosWithStatus=[]
  const watchListVideosWithStatus=[]
  const videosWithLikeStatus = videos.map((item)=>{
    const isLiked = likedVideos.find((video)=>video.id == item.id)
    if(isLiked){
      likedVideosWithStatus.push( {...item, isLiked: true})
      return {...item, isLiked: true}
    }else{
      return {...item, isLiked: false}
    }
  })
  const videosWithLikeAndWatchListStatus = videosWithLikeStatus.map((item)=>{
    const isWatchListed = watchListVideos.find((video)=>video.id == item.id)
    if(isWatchListed){
      watchListVideosWithStatus.push( {...item, isWatchListed: true})
      return {...item, isWatchListed: true}
    }else{
      return {...item, isWatchListed: false}
    }
  })
  return (
  <>
    <section className="p-[20px]">
      <h2 className="mb-[10px] text-lg">Recently Added</h2>
      <Section1 videos={videosWithLikeAndWatchListStatus}/>
    </section>

    <section className="p-[20px]">
      <h2 className="mb-[10px] text-lg">Likes</h2>
      <Section1 videos={likedVideos}/>
    </section>

    <section className="p-[20px]">
      <h2 className="mb-[10px] text-lg">Watch List</h2>
      <Section1 videos={watchListVideos}/>
    </section>
  
  </>
  );
}
