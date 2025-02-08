import pencil from "../assets/Pencil.png"
import axios from "axios";
import { SendHorizontal } from "lucide-react"
import DownloadButton from "../components/buttons/DownloadButton"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"

const Resume = () => {
    const url = import.meta.env.VITE_API_URL;
    const[userData, setUserData] = useState({
        username:"",
        resumePhoto:"",
    })
    useEffect(()=>{
        axios({
            url: url + "/api/v1/get/user/info",
            method:"get",
        }).then((res)=>{
            setUserData(res.data.data);
        }).catch((error)=>{
            console.log("Resume Error hai", error);
        });

    })
    return (
        <div className="h-screen  ml-72" >
            <div className="h-full mb-10">
            <div className="h-full flex">
                <div className="h-[93%] relative z-10 left-16 mt-7 w-[70%] bg-white  shadow-[-5px_5px_15px_0px_rgba(255,255,255,0.5)]">
                    <img src={userData.resumePhoto} alt="" className=" h-full w-full" />
                </div>

                    <img className=" absolute h-[28rem] right-[21rem] top-40 -rotate-45" src={pencil} alt=""/>
                <div className="w-[80%] h-[80%] pt-16  flex justify-center bg-yellow-500 rounded-bl-[25rem]">
                    <div className="pl-28 flex flex-col gap-10">
                    <h1 className="text-6xl pr text-white font-serif">{userData.username}</h1>
                    <textarea placeholder="Feedback" name="" id="" cols="40" rows="7" maxLength="210" className="p-4 w-96 outline-none text-black font-serif resize-none rounded-3xl overflow-hidden"></textarea>
                    <DownloadButton href={userData.resumePhoto} text="Resume" className="ml-48 "/>
                    {/* <SendHorizontal className="cursor-pointer text-green-500 relative bottom-[10.5rem] left-[21rem] w-8 h-8" /> */}
                    <span className="w-12 h-12 flex justify-center items-center relative bottom-44 left-[20.5rem] rounded-full">
                        <SendHorizontal className="w-8 h-8 text-green-500 transition-transform duration-300 active:scale-125"/>
                    </span>
                    </div>
                </div>
            </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Resume