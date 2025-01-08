"use client"

import { BASE_CONTENT_URL, BASE_STREAM_URL, BASE_USER_PROFILE_URL } from "@/app/values";
import axios from "axios";
import { useEffect, useState } from "react";
const {usePathname, useSearchParams} = require("next/navigation");
const Watch=()=>{
    const path = usePathname();
    const search = useSearchParams();
    const poster = search.get('poster');    
    const isLiked = search.get('like');
    const isWatchList = search.get('watchlist');
    const [likeState, setLikeState] = useState(isLiked)
    const [watchListState, setWatchListState] = useState(isWatchList)

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
             const {data} = await axios.post(BASE_USER_PROFILE_URL + "/api/profile/like/"+id,{}, {headers: {token: `${parts[1]}`}})
            setLikeState("true")
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    const addToWatchList = async()=>{
        try {
            const cookies = document.cookie.split(';')
            let parts = []
            cookies.forEach(cookie=>{
              if(cookie.includes('token')){
                parts = cookie.split('=')
              }})
             const {data} = await axios.post(BASE_USER_PROFILE_URL + "/api/profile/watchlist/"+id,{}, {headers: {token: `${parts[1]}`}})
             setWatchListState("true")
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    const removeFromLikes = async()=>{
        try {
            const cookies = document.cookie.split(';')
            let parts = []
            cookies.forEach(cookie=>{
              if(cookie.includes('token')){
                parts = cookie.split('=')
              }})
             const {data} = await axios.delete(BASE_USER_PROFILE_URL + "/api/profile/like/"+id, {headers: {token: `${parts[1]}`}})
              setLikeState("false")
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    const removeFromWatchList = async()=>{
        try {
            const cookies = document.cookie.split(';')
            let parts = []
            cookies.forEach(cookie=>{
              if(cookie.includes('token')){
                parts = cookie.split('=')
              }})
             const {data} = await axios.delete(BASE_USER_PROFILE_URL + "/api/profile/watchlist/"+id, {headers: {token: `${parts[1]}`}})
              setLikeState("false")
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
                    <span className="text-sm">{videoDetails.genres}</span>
                </div>
                <div className="text-sm w-fit m-auto">{videoDetails.releasedAt}</div>
                <div className="flex items-center space-x-2">{videoDetails.description}</div>
                <button onClick={likeState=="true"?removeFromLikes:addToLikes} className="bg-red-500 p-2 rounded-lg w-fit mt-[10px]">{likeState=="true"?"Unlike":"Like"}</button>
                <button onClick={watchListState=="true"?removeFromWatchList:addToWatchList} className="bg-red-500 ml-[10px] p-2 rounded-lg w-fit mt-[10px]">{watchListState=="true"?"Remove From Watchlist":"Add to watch list"}</button>
            </div>
            <video poster={poster} controls className="w-full mt-[5vh] h-[500px]">
                <source src={`${BASE_STREAM_URL}/video/stream/${id}`} type="video/mp4"/>
            </video>
        </div>
    )
}

export default Watch;