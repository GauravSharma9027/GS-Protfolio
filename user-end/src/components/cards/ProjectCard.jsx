import Button from "../buttons/Button"

const ProjectCard = ({className, src, projectTitle, shortDescription,text}) => {
    return (
        <div  className={`${className} sm:w-full md:w-[41vw] MD:w-[41vw] lg:w-[32vw] xl:w-[33vw] 2xl:w-[20rem] bg-[rgb(37,35,42)] flex flex-col items-center mb-10 rounded-lg ring-4 ring-[rgb(57,54,62)] cursor-default  transition-transform duration-500 hover:scale-105`}>
            <img src={src} alt="" className="bg-[rgb(36,36,48)] h-44 w-full rounded-t-lg" />
            <h1 className="w-full px-2 text-2xl text-start font-semibold text-orange-300 relative -top-10">{projectTitle}</h1>
            <p className="px-2 pb-4 -mt-6 h-24 w-80 break-words overflow-hidden rounded-b-lg font-serif">{shortDescription}</p>
            <Button className="text-xl ml-48 w-[6.5rem] m-2 h-8 rounded-2xl text-black ring-1 ring-white" text={text}/>
        </div>
    )
}

export default ProjectCard