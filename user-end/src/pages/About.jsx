import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/buttons/Button";
import SkillCard from "../components/cards/SkillCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import EducationCard from "../components/cards/EducationCard";

const About = () => {
    const url = import.meta.env.VITE_API_URL;
    const [userData, setUserData] = useState({
        username: "",
        profilePhoto: " ",
        linkedin: "",
        userDescription: ""
    });
    useEffect(() => {
        axios({
            url: url + "/api/v1/get/user/info",
            method: "get",
        }).then((res) => {
            setUserData(res.data.data);
        }).catch((error) => {
            console.log("error hai user response me: ", error);
        })
    })

    // {/* education section */}
    const [educationData, setEducationData] = useState([]);
    useEffect(() => {
        axios({
            url: url + "/api/v1/get/user/education",
            method: "get",
        }).then((res) => {
            setEducationData(res.data.data);
        }).catch((error) => {
            console.log("error hai education response me: ", error);
        })
    }, []);

    //    {/* skill section */}
    const [skillData, setSkillData] = useState([]);
    useEffect(() => {
        axios({
            url: url + "/api/v1/get/user/skill",
            method: "get",
        }).then((res) => {
            setSkillData(res.data.data);
        }).catch((error) => {
            console.log("error hai skill response me: ", error);
        })
    }, []);

    return (
        <div className="h-[100vh] lg:ml-60 xl:ml-64 2xl:ml-72 sm:pt-16 lg:pt-0">
            <div className="2xl:h-[65%] MD:flex sm:p-2 MD:p-0 MD:px-4 lg:px-0 lg:pr-4">
                <div className="sm:h-[80vh] MD:h-[50vh] 2xl:h-[100%] sm:w-full MD:w-full 2xl:w-[40%] sm:pt-10 lg:pt-0 lg:mt-24 2xl:mt-0 2xl:pt-0  flex justify-center items-center" >
                    <img className="2xl:h-[90%] sm:h-[90%] MD:h-[100%] sm:w-[65%] MD:w-[80%] 2xl:w-[70%] rounded-full ring-2 ring-[rgb(255,255,255)]" src={userData.profilePhoto} alt="" />
                </div>
                <div className="MD:w-[130vw] 2xl:w-[54%] MD:pt-16 2xl:pt-4 sm:mt-4 lg:mt-0 flex gap-2 flex-col justify-start">
                    <strong className="sm:text-3xl MD:text-4xl lg:text-5xl 2xl:text-6xl">{userData.username}</strong>
                    <h1 className="sm:text-xl MD:text-2xl lg:text-3xl 2xl:text-4xl font-semibold sm:mt-4 2xl:mt-10 text-orange-600">A Bit About Me</h1>
                    <p className="font-serif sm:text-sm MD:text-lg  2xl:text-xl MD:h-[20vh] 2xl:mt-3">{userData.userDescription}</p>

                    {/* sm se block hoga */}
                    <div className="mt-6 flex justify-between items-end lg:hidden">
                        <div className="flex gap-2">
                            <Link to={userData.linkedin}><Linkedin className="text-blue-500 h-8 w-8 bg-blue  transition-transform duration-500 hover:scale-125" /></Link>
                            <Link to="#"><Github className="text-green-200 h-8 w-8 bg-blue  transition-transform duration-500 hover:scale-125" /></Link>
                        </div>
                        <span className="flex gap-4 sm:mr-2 MD:mr-7 lg:mr-0">
                            <Button text="Services" className="h-8 MD:h-10 w-24 MD:w-32 MD:text-xl font-semibold text-black ring-2 ring-white rounded-lg" />
                            <Link to="/experience#projectsection"><Button text="Projects" className="h-8 MD:h-10 MD:w-28 MD:text-xl font-semibold text-black  ring-2 ring-white rounded-lg" /></Link>
                        </span>
                    </div>

                    {/* lg se block hoga */}
                    <div className="2xl:mt-14 lg:mt-20 lg:flex justify-between hidden">
                        <div className="flex gap-6">
                            <Link to={userData.linkedin}><Linkedin className="text-blue-500 h-8 w-8 bg-blue  transition-transform duration-500 hover:scale-125" /></Link>
                            <Link to="#"><Github className="text-green-200 h-8 w-8 bg-blue  transition-transform duration-500 hover:scale-125" /></Link>
                        </div>
                        <span className="flex gap-8 lg:mr-1">
                            <Button text="View services" className="font-semibold text-black ring-2 ring-white rounded-lg" />
                            <Link to="/experience#projectsection"><Button text="My Projects" className="font-semibold text-black  ring-2 ring-white rounded-lg" /></Link>
                        </span>
                    </div>
                </div>
            </div>

            {/* education section */}
            <div className="2xl:px-20 pt-2 2xl:pt-0">
                <h1 className="text-3xl font-bold mt-6  mb-6 sm:pl-4 MD:pl-5">My Education....</h1>
                <div className="flex flex-wrap lg:justify-between xl:gap-x-2   2xl:gap-x-[4.9rem]  sm:gap-y-[0.5rem] lg:gap-y-8 sm:px-4 MD:px-7">
                    {
                        educationData.map((item, index) =>
                            <EducationCard key={index} year={item.startToPassYear} courseName={item.QualificationName} shortDescription={item.QualificationShortDescription} />
                        )
                    }
                </div>
            </div>

            {/* skill section */}
            <div className=" 2xl:px-20">
                <h1 className="text-3xl font-bold my-6 sm:pl-4 MD:pl-5">My Skills....</h1>
                <div className="flex justify-between 2xl:justify-between lg:gap-x-0 md:gap-x-[0.5rem] MD:gap-x-[2rem]  sm:px-4 MD:px-7 lg:px-10 flex-wrap">
                    {
                        skillData.map((item, index) =>
                            <SkillCard key={index} src={item.skillLogo} name={item.skillName} percentage={`${item.skillPercentage}`} shortDescription={item.skillDescription} />
                        )
                    }
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default About