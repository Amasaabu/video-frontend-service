import { VideoCard } from "../card/VideoCard"
const section = ({videos}) => {
    return (
        <div className="flex">
            {videos.map((video, id)=>{
                return <div key={id} className="mr-[50px]"> <VideoCard video={video}/></div>
            })}
        </div>

    )
}

export default section