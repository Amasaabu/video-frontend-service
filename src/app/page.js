"use client"
import Section1 from '@/components/section1/section'
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_CONTENTET_URL } from "./values";
export default function Home() {
  const videos = [{title: "This is us", description: "A movie about this is us"}]
  // useEffect(async()=>{
  //   const {data} = await axios.get(BASE_CONTENTET_URL + "/api/content/all/video")
  //   console.log(data)

  // },[])
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
