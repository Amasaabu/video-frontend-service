"use client"
import { useState } from "react"
import { BASE_CONTENT_URL } from "../values"
import axios from "axios"
const Upload=()=>{
    // const router = useRouter();
    const [uploadedFileName, setUploadedFileName] = useState("")
    const [form, setForm] = useState({
        title: {
            label: "Video Title",
            placeholder: "Title here",
            type: "text",
            value: ""

        },
        releasedAt: {
            label: "Relesased Date",
            placeholder: "Enter year of release",
            type: "number",
            value: "2025"
        },
        genre: {
            label: "Category",
            placeholder: "Enter category here",
            type: "text",
            value: ""
        },
        description: {
            label: "Description",
            placeholder: "Enter description here",
            type: "text",
            value: ""
        }
}) 
let fd = new FormData()
const onImageUpload = async (e) => {
    const file = e.target.files[0]
    console.log(file)
    fd.append('file', file)
    setUploadedFileName(file.name)
    //to prevent calling setState twice and aviod duplicatae btns 
    // if(!versionedBollean) {
    //     setFileState({name:file.name})
    // }

    
}
    const sendVideo = async()=>{
        try {
        //submit video
        const {data} = await axios.post(BASE_CONTENT_URL+"/api/content/upload", fd, {
            headers: { 'Content-Type': `multipart/form-data` },
            onUploadProgress: (uploadState) => console.log(uploadState.loaded)
        }) 
        console.log(data)
        return data
        } catch (error) {
            console.log(error)
        }

    }
    const sendForm = async()=>{
        try {
        await axios.post(`/api/content/add`, {
            title: form.title.value,
            releasedAt: form.releasedAt.value,
            genre: form.genre.value,
            thumbNailLocation: "",
            location: "https://video-streaming-bucket-8.s3.us-east-2.amazonaws.com/video/sound.mp4",
            
        })
        } catch (error) {
            console.log(error)
            
        }
    }

    const submitRequest = async()=>{ 
        try {
            const repsonse = await sendVideo()
            console.log(repsonse)
            await sendForm()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
           <div className="mt-[50px]">
            <div className="w-[420px] p-[1%] rounded-lg m-auto bg-[#1d1b1b]">
                {Object.keys(form).map((item, id)=>{
                return (
                    <div className="mt-[10px]" key={id}>
                        <label className="ml-[3px]">{form[item].label}</label>
                        <input
                        className="block text-white bg-gray-800 p-2 rounded-lg w-[100%]"
                        type={form[item].type}
                        placeholder={form[item].placeholder}
                        value={form[item].value}
                        onChange={e=>setForm({...form, [item]:{...form[item], value:e.target.value}})}
                    />
                    </div>
                    )
                })}
                    <div className="">
                        <input onChange={onImageUpload} type="file" id="imgupload" style={{ display: 'none' }} />
                        <label className="mt-[20px] cursor-pointer block bg-green-500 p-2 rounded-lg w-fit mt-[10px]" for='imgupload'>Click to upload Video file</label>

                        {uploadedFileName && <div className="text-white">{uploadedFileName}</div>}
                        <div onClick={submitRequest} className="mt-[20px] bg-red-500 p-2 rounded-lg w-fit mt-[10px]">Submit</div>                    
                    </div>
            </div>
        </div>
        <div className="w-[100%]">
        </div>
        </div>
    )
}

export default Upload