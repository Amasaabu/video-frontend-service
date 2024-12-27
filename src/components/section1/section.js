import { VideoCard } from "../card/VideoCard"
const section = ({videos}) => {
    return (
        <div className="flex">
            {videos.map((video)=>{
                return <VideoCard video={video}/>
            })}
  </div>

    )
}

export default section