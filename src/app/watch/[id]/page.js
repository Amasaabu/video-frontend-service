"use client"

import { BASE_CONTENT_URL, BASE_STREAM_URL, BASE_USER_PROFILE_URL } from "@/app/values";
import axios from "axios";
import { useEffect, useState } from "react";
const {usePathname, useSearchParams} = require("next/navigation");
const Watch=()=>{
    const path = usePathname();
    const search = useSearchParams();
    const poster = search.get('poster');    

    const paths = path.split('/')
    const id = paths[paths.length - 1];
    const [videoDetails, setVideoDetails] = useState({})
    // get video details
    const getVideoDetails = async()=>{
        try {
            const {data} = await axios.get(BASE_CONTENT_URL + "/api/content/videodetails?id="+id)
            setVideoDetails(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getVideoDetails()
    },[])
    const addToLikes = async()=>{
        try {
            const cookies = document.cookie.split(';')
            let parts = []
            cookies.forEach(cookie=>{
              if(cookie.includes('token')){
                parts = cookie.split('=')
              }})
              console.log(parts[1])
            const {data} = await axios.post(BASE_USER_PROFILE_URL + "/api/profile/like/"+id, {headers: {token: `${parts[1]}`}})
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="aspect-w-16 aspect-h-9">
            {/* <div className="absolute top-10 left-0 w-full h-full flex  justify-center bg-black bg-opacity-30 text-white">
                <h1 className="text-xl font-bold">Your Video Title</h1>
            </div> */}
            <div className="h-[30vh] w-fit m-auto">
                <h1 className="text-xl w-fit m-auto font-bold">{videoDetails.title}</h1>
                <div className="text-[5px]">
                    <span className="text-sm">Genre: </span>
                    <span className="text-sm">{videoDetails.genre}</span>
                </div>
                <div className="text-sm w-fit m-auto">{videoDetails.releasedAt}</div>
                <div className="flex items-center space-x-2">{videoDetails.description}</div>
                <button onClick={addToLikes} className="bg-red-500 p-2 rounded-lg w-fit mt-[10px]">Like</button>
                <button className="bg-red-500 ml-[10px] p-2 rounded-lg w-fit mt-[10px]">Add to watch list</button>
            </div>
            <video poster={poster} controls className="w-full mt-[5vh] h-[500px]">
                <source src={`${BASE_STREAM_URL}/video/stream/${id}`} type="video/mp4"/>
            </video>
        </div>
    )
}

export default Watch;