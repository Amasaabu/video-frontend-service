"use client"
import { useRef, useState} from "react"
import { BASE_CONTENT_URL } from "../values"
import axios from "axios"
const Upload=()=>{
    // const router = useRouter();
    const [uploadedFileName, setUploadedFileName] = useState("")
    const formDataRef = useRef(null);
    const [submitResult, setSubmitResult] = useState()
    const thumbNailDataRef = useRef(null);
    const [thumbNailName, setThumbNailName] = useState("")
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

const onImageUpload = async (e) => {
    const selectedFile = e.target.files[0];
    formDataRef.current = new FormData();
    formDataRef.current.append('file', selectedFile);
    setUploadedFileName(selectedFile.name);
    console.log("Updated data")
    for (const [key, value] of formDataRef.current.entries()) {
        console.log(`${key}:`, value); // This will log the key and the file object
    }    
}
const onThumbNailUpload = async (e) => {
    const selectedFile = e.target.files[0];
    thumbNailDataRef.current = new FormData();
    thumbNailDataRef.current.append('file', selectedFile);
    setThumbNailName(selectedFile.name);    
}
    const sendThumbNail = async()=>{
        console.log("sending thumbnail")
        const cookies = document.cookie.split(';')
        let parts = []
        cookies.forEach(cookie=>{
          if(cookie.includes('token')){
            parts = cookie.split('=')
          }})
          try {
          //submit thumbNail
          const {data} = await axios.post(BASE_CONTENT_URL+"/api/content/thumb", thumbNailDataRef.current, {
              headers: { 'Content-Type': `multipart/form-data`, token: `${parts[1]}` },
             // onUploadProgress: (uploadState) => console.log(uploadState.loaded)
          }) 
          return data
          } catch (error) {
              console.log(error.repsonse.data)
          }
    }
    const sendVideo = async()=>{
        console.log("sending video")
    const cookies = document.cookie.split(';')
      let parts = []
      cookies.forEach(cookie=>{
        if(cookie.includes('token')){
          parts = cookie.split('=')
        }})
        try {
        console.log(formDataRef.current)
        //submit video
        const {data} = await axios.post(BASE_CONTENT_URL+"/api/content/upload", formDataRef.current, {
            headers: { 'Content-Type': `multipart/form-data`, token: `${parts[1]}` },
           // onUploadProgress: (uploadState) => console.log(uploadState.loaded)
        }) 
        console.log(data)
        return data
        } catch (error) {
            console.log(error.repsonse.data)
        }

    }
    const sendForm = async(videoLocation, thumbNailLocation)=>{
        const cookies = document.cookie.split(';')
        let parts = []
        cookies.forEach(cookie=>{
          if(cookie.includes('token')){
            parts = cookie.split('=')
          }})
        
        try {
        await axios.post(`/api/content/add`, {
            title: form.title.value,
            releasedAt: form.releasedAt.value,
            genre: form.genre.value,
            thumbNailLocation: thumbNailLocation,
            location: videoLocation,
            
        }, {headers: {token: `${parts[1]}`}})
        } catch (error) {
            console.log(error.repsonse.data)
            
        }
    }
    const submitRequest = async()=>{ 
        console.log("submitting request");
        try {
            const repsonse = await sendVideo()
            const thumbNail = await sendThumbNail()
            await sendForm(repsonse.location, thumbNail.location)
            setSubmitResult("Video uploaded successfully")
        } catch (error) {
            console.log(error)
            setSubmitResult(`Error trying to upload video, error: ${error.response.data}`)
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

                        <input onChange={onThumbNailUpload} type="file" id="thumbupload" style={{ display: 'none' }} />
                        <label className="mt-[20px] cursor-pointer block bg-green-500 p-2 rounded-lg w-fit mt-[10px]" for='thumbupload'>Click to upload thumbNail</label>

                        {uploadedFileName && <div className="text-white">{uploadedFileName}</div>}
                        <div onClick={()=>submitRequest()} className="mt-[20px] bg-red-500 p-2 rounded-lg w-fit mt-[10px]">Submit</div>     
                        {submitResult && <div className="text-white">{submitResult}</div>}               
                    </div>
            </div>
        </div>
        <div className="w-[100%]">
        </div>
        </div>
    )
}

export default Upload