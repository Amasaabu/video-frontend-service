export const VideoCard = ({ video }) => {
    return (
        // <div className="pb-[9px] cursor-pointer w-[15%] mr-[2%] h-[100px] flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-md">
        <div className="cursor-pointer">
        <img
            src={video.thumbNailLocation}
            alt={video.title}
            className="w-[200px] h-[100px] object-cover rounded-lg"
            // className="w-full h-[400px] object-cover rounded-lg"
        />
        <div className="mt-2">
            <h3 className="text-lg text-[#d0b8b8]">{video.title}</h3>
            {/* <p className="mt-1 text-sm text-gray-600">{video.description}</p> */}
        </div>
        </div>
        // </div>
    );

}