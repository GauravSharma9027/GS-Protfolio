import { Github, Linkedin } from "lucide-react"
import { Link } from "react-router-dom"
import ProjectCard from "../components/cards/ProjectCard"
import Footer from "../components/Footer"
import ServicesCard from "../components/cards/ServicesCard"
import { useEffect, useState } from "react"
import axios from "axios"

const Experience = () => {
  const url = import.meta.env.VITE_API_URL;
  const [projectData, setProjectData] = useState([])
  useEffect(()=>{
    axios({
      url: url + "/api/v1/get/user/project",
      method:"get",
    }).then((res)=>{
      setProjectData(res.data.data);
    }).catch((error)=>{
      console.log("error in axios or response from experience component: ",error);
    });
  },[])
  return (
    <div className="h-screen pt-8 lg:ml-60 xl:ml-64 2xl:ml-72">
      <div className="bg-rose-300 h-[60%]  rounded-2xl mx-16 cursor-default">
        <img className="h-[100%]" src="" alt="" />
        <div className="px-16 py-12 relative -top-[26rem]">
          <h1 className="text-4xl">Hello!👋</h1>
          <h1 className="my-3 text-6xl font-bold text-orange-400">Discover My Amazing <br /> Art Space!</h1>
          <h1 className="text-xl font-serif ">I Love Creation ❤️!</h1>
          <span className="flex gap-6 my-24">
            <Link to="#"><Linkedin className="text-blue-500 h-8 w-8 bg-blue  transition-transform duration-500 hover:scale-125" /></Link>
            <Link to="#"><Github className="text-green-700 h-8 w-8 bg-blue  transition-transform duration-500 hover:scale-125" /></Link>
          </span>
        </div>
      </div>

      {/* project section */}
      <div id="projectsection" className="sm:mt-4 2xl:mt-8  sm:mx-6 2xl:mx-16">
        <h1 className="text-3xl font-bold mt-6 mb-6">My Projects....</h1>
        <div className="flex justify-between gap-x-[2.8rem] flex-wrap">
          {
            projectData.map((item,index)=>
              <ProjectCard src={item.projectImage} shortDescription={item.projectShortDescription} projectTitle={item.projectTitle} key={index}/>
            )
          }
        </div>
      </div>

      {/* Services Section */}
      <div className=" mx-16">
        <h1 className="text-3xl font-bold mb-6">My Services....</h1>
        <div className="flex gap-x-[2.8rem] flex-wrap">
          <ServicesCard/>
        </div>
      </div>
      {/* footer section */}
      <Footer/>
    </div>
  )
}

export default Experience