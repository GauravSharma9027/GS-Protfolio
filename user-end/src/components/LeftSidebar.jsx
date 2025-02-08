import { Cog, Contact2, FileCog2, FileUser, Home, MenuSquare, UserCircle, UserRoundSearch, X, } from "lucide-react";
import { NavLink } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
const LeftSidebar = () => {
    const LeftSidebarItem = [
        { icon: <Home className="lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 h-md:w-10 h-md:h-10" />, text: "Home", path: "/" },
        { icon: <UserCircle className="lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8  h-md:w-10 h-md:h-10" />, text: "About", path: "/about" },
        { icon: <FileCog2 className="lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8  h-md:w-10 h-md:h-10" />, text: "Experience", path: "/experience" },
        { icon: <FileUser className="lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 h-md:w-10 h-md:h-10" />, text: "Resume", path: "/resume" },
        { icon: <Contact2 className="lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 h-md:w-10 h-md:h-10" />, text: "Contact", path: "/contact" },
        { icon: <Cog className="lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 h-md:w-10 h-md:h-10" />, text: "Setting", path: "/setting" },
    ];
    const [hidden, setHidden] = useState('hidden');
    const [userData, setUserData] = useState({
        username: "",
        profession: "",
        profilePhoto: "",
    })
    const url = import.meta.env.VITE_API_URL;
    useEffect(() => {
        axios({
            method: "get",
            url: url + "/api/v1/get/user/info",
        }).then((res) => {
            setUserData(res.data.data);
        }).catch((error) => {
            console.log("Error in LeftSidebar component i axios or backend response: ", error);
        });
    }, []);

    const showNavbar = (item) => {
        if (item === "block") {
            setHidden('block');
        }
        if (item === "hidden") {
            setHidden('hidden');
        }
    }

    return (

        <div className={`sm:w-screen z-20 lg:w-60 xl:w-64 2xl:w-72 lg:h-screen lg:block ${hidden=="block"?"sm:h-screen z-20":"sm:h-12 h-md:h-16 "} fixed h-screen lg:bg-[rgb(37,35,42)] sm:bg-[rgb(37,35,42)] text-slate-300 border-r-2 border-[rgb(57,54,62)]`}>
            <div className="sm:h-12 h-md:h-16 lg:h-52 sm:w-64 lg:w-full sm:bg-[rgb(37,35,42)] lg:bg-[rgb(36,36,48)] flex sm:gap-1  2xl:gap-0 lg:flex-col lg:justify-center items-center lg:p-2">
                <img className="sm:h-12 lg:h-20 xl:h-24 2xl:h-28 sm:w-12 lg:w-20 xl:w-24 2xl:w-28 rounded-[100%] lg:ml-0 sm:ml-1 lg:p-0 sm:p-1" src={userData.profilePhoto} alt="" />
                <span className="h-md:text-2xl sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-[1.97rem] font-bold text-slate-100">{userData.username}</span>
                <h1 className="xl:text-xl 2xl:text-xl lg:block  sm:hidden">{userData.profession}</h1>
            </div>
            <hr className=" lg:border-[rgb(57,54,62)] sm:border-[rgb(174,168,184)]  lg:block" />
            {
                hidden == "hidden" ? <MenuSquare onClick={() => showNavbar("block", true)} className={`h-9 w-9  absolute right-2 top-1 pt-1 ${hidden == "block" ? "hidden" : "block"}  lg:hidden`} /> : <X onClick={() => showNavbar("hidden", false)} className={`h-9 w-9  absolute right-2 top-1 pt-1 ${hidden == "block" ? "block" : "hidden"} lg:hidden`} />
            }
            {
                LeftSidebarItem.map((item, index) => {
                    return (
                        <NavLink key={index} onClick={()=>showNavbar("hidden")} to={item.path} className={({ isActive }) => `sm:h-8 xl:h-9 2xl:h-10 h-md:h-14 sm:w-52 lg:w-52 xl:w-56 2xl:w-64 h-md:w-72 sm:m-2 lg:m-4 mt-3 h-md:mt-4 lg:pl-3 sm:pl-1 sm:flex sm:${hidden} lg:flex gap-3 cursor-pointer rounded-lg items-center  hover:bg-slate-300 hover:text-green-700 hover:font-semibold  transition ${isActive ? 'bg-slate-100 text-green-600 font-semibold' : ' '}`}>
                            <span >{item.icon}</span>
                            <span className="lg:text-xl xl:text-2xl 2xl:text-2xl h-md:text-3xl text-end">{item.text}</span>
                        </NavLink>
                    );
                })
            }

        </div>
    );
};

export default LeftSidebar;
