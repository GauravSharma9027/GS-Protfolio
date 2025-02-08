import { useEffect, useState } from "react";
import axios from "axios";
import DownloadButton from "../components/buttons/DownloadButton"
import Footer from "../components/Footer";
const Home = () => {
    // const [boldURL, setBolbURL] = useState({
    //     URL:""
    // });
    const url = import.meta.env.VITE_API_URL;
    const [userData, setUserData] = useState({
        username: " ",
        profilePhoto: " ",
        resumePhoto: " ",
        welcomeMsg: " ",
        userDescription: " "
    });
    useEffect(() => {
        axios({
            url: url + "/api/v1/get/user/info",
            method: "get",
            // responseType: "blob", // This tells axios to return the response as a blob[agar image download krni hai to]
            // Yeh axios ko batata hai ki server se jo response milega, wo blob format me hona chahiye. Blob ek binary format hota hai,
            // jisme images, PDFs, aur other media types ko store kiya ja sakta hai.
        }).then((res) => {
            // const URL = window.URL.createObjectURL(res.data.data.resumePhoto) //ka use karke hum blob ke liye ek temporary URL banate hain, jo user ko download ke liye diya jata hai.
            // console.log("bolb URL: ", URL)
            // setBolbURL(URL);
            setUserData(res.data.data);
        }).catch((error) => {
            console.log("Error in axios or backend response", error);
        });
    }, [])

    console.log(userData.resumePhoto);

    return (
        <div className="h-screen  lg:ml-60 xl:ml-64 2xl:ml-72 sm:mt-12 h-md:mt-16 lg:mt-0">
            <div className="flex lg:flex-row flex-col lg:h-screen lg:-mb-16">
                <div className="2xl:pl-10 lx:pl-7 lg:pl-4 sm:p-2 lg:block sm:flex h-lg:gap-4 flex-col md:px-4 lg:px-0 lg:w-[60%] h-full rounded-lg">
                    <div className="lg:h-[45%] flex flex-col gap-2 justify-center items-start">
                        <h1 className="md:text-lg MD:text-2xl lg:text-2xl xl:text-[1.72rem] 2xl:text-[2.19rem] font-thin">{userData.welcomeMsg}</h1>
                        <h1 className="text-xl md:text-2xl  MD:text-4xl font-bold lg:hidden text-orange-400">Discover My Amazing Art Space!</h1>
                        <h1 className="lg:text-3xl xl:text-4xl 2xl:text-6xl mt-6 font-bold hidden lg:block text-orange-400">Discover My Amazing <br /> Art Space!</h1>
                        {/* it will be block only for below from lg */}
                        <div className="w-full md:h-96  h-lg:h-[60vh] h-lg:py-4 flex justify-center items-center lg:hidden">
                            <img className=" mt-1 w-full MD:w-96 h-full flex items-start rounded-lg" src={userData.profilePhoto} alt="" />
                        </div>
                        <h1 className="sm:text-xl lg:text-xl md:text-2xl MD:text-3xl xl:text-[1.3rem] 2xl:text-2xl  font-serif">Hii, I am {userData.username} And I am Computer Engineer....</h1>
                    </div>
                    <div className="w-full lg:hidden flex justify-center items-center">
                        <DownloadButton className="my-4 text-2xl MD:text-3xl h-10 MD:h-12 MD:w-64" text="Resume" href={userData.resumePhoto} />
                    </div>
                    <div className="lg:mt-2 lg:text-sm xl:text-[1rem] 2xl:text-xl MD:text-xl">{userData.userDescription}</div>
                    <div className="hidden lg:block">
                    <DownloadButton className="lg:mt-10 2xl:mt-14 lg:text-xl xl:text-2xl 2xl:text-3xl lg:h-9 xl:h-10 2xl:h-12 lg:w-36 xl:w-44 2xl:w-56" text="Resume" href={userData.resumePhoto} />
                    </div>
                </div>

                <div className="w-[40%] h-full flex justify-center items-center sm:hidden lg:block lg:px-4">
                    <img className="lg:h-[55%] xl:h-[60%] 2xl:h-[60%] lg:mt-24 xl:mt28  2xl:mt-32 rounded-lg" src={userData.profilePhoto} alt="" />
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home