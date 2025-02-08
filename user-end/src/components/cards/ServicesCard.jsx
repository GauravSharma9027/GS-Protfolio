import { LaptopMinimal } from "lucide-react"

const ServicesCard = ({ className }) => {
    return (
        <div>
            <div className={`${className} bg-[rgb(37,35,42)] p-4 w-72  flex flex-col gap-2  mb-10 rounded-lg ring-4 ring-[rgb(57,54,62)] cursor-default  transition-transform duration-500 hover:scale-105`}>
                <LaptopMinimal className="w-9 h-9"/>
                <h1 className="w-full text-2xl text-start font-semibold text-orange-300">Web Developer</h1>
                <p className=" overflow-hidden rounded-b-lg font-serif">Loinus repudiandae, ut hic eius provident dolore. Sit veniam earum laboriosam nobis.</p>
            </div>
            <div className="bg-black opacity-60  w-72 h-[11.8rem] rounded-lg relative bottom-[14.3rem] flex justify-center items-center text-3xl font-semibold text-white">Coming Soon</div>
        </div>
    )
}

export default ServicesCard;