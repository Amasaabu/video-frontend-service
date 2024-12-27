export const VideoCard = ({ video }) => {
    return (
        <div className="cursor-pointer w-[15%] mr-[2%] h-[120px] flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg shadow-md">
        <img
            // src="/images/video-placeholder.jpg"
            // alt={video.title}
            // className="w-full h-48 object-cover rounded-lg"
        />
        <div className="mt-4">
            <h3 className="text-lg font-semibold">{video.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{video.description}</p>
        </div>
        </div>
    );

}