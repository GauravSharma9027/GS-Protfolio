import { Copyright } from "lucide-react"
import { Link } from "react-router-dom"

const Footer = ({className}) => {
    return (
            <div className={`${className} lg:h-16  flex lg:flex-row sm:flex-col sm:gap-2 md:gap-0 lg:gap-0 justify-between lg:items-center sm:mt-8 lg:mt-0 2xl:pl-8 lg:pl-4 2xl:px-0 lg:pb-0 sm:pt-2 sm:px-4 sm:pb-4 2xl:pr-12 lg:pr-6 sm:text-sm lg:text-sm xl:text-lg 2xl:text-xl md:text-lg MD:text-xl font-serif cursor-default border-t-2 border-[rgb(57,54,62)]`}>
            <p className="flex gap-1"><Copyright className="pt-1"/> 2024 <p className="underline cursor-pointer text-[rgb(77,138,243)]">GS Portfolio</p>... All Rights Reserved.</p>
            <p>Developed By: <Link to="#" className="cursor-pointer"><strong className="underline text-[rgb(77,138,243)]">GAURAV SHARMA</strong></Link></p>
            </div>
    )
}

export default Footer