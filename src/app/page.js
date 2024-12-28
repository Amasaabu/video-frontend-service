"use client"
import Section1 from '@/components/section1/section'
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_CONTENT_URL } from "./values";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";
export default function Home() {
  const userCxt = useContext(UserContext);
  const [videos, setVideos]=useState([])
  useEffect(()=>{
    console.log(userCxt)
    userCxt.action.getUserFromToken()
    const fetchVideos = async()=>{
      const {data} = await axios.get(BASE_CONTENT_URL + "/api/content/all/video")
      console.log(data)
      setVideos(data)
    }
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
      <Section1 videos={videos}/>
    </section>

    <section className="p-[20px]">
      <h2 className="mb-[10px] text-lg">Watch List</h2>
      <Section1 videos={videos}/>
    </section>
  
  </>
  );
}
