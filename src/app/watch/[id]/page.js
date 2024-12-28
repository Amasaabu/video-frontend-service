"use client"

import { BASE_STREAM_URL } from "@/app/values";

const {usePathname, useSearchParams} = require("next/navigation");
const Watch=()=>{
    const path = usePathname();
    const search = useSearchParams();
    const poster = search.get('poster');    

    const paths = path.split('/')
    const id = paths[paths.length - 1];
    return (
        <div className="aspect-w-16 aspect-h-9">
            <video poster={poster} controls className="w-full h-[500px]">
                <source src={`${BASE_STREAM_URL}/video/stream/${id}`} type="video/mp4"/>
            </video>
            {/* <div className="absolute top-10 left-0 w-full h-full flex  justify-center bg-black bg-opacity-30 text-white">
                <h1 className="text-xl font-bold">Your Video Title</h1>
            </div> */}
        </div>
    )
}

export default Watch;