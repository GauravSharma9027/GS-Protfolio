import { BellRingIcon, LucideIndentDecrease, MenuIcon, MessageSquareMoreIcon, MoonIcon } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";


const Header = ({ className }) => {
    const location = useLocation();
    const leftHeaderItems = [
        { path: '/dashboard', text: 'Dashboard' },
        { path: '/dashboard', text: 'User' },
        { path: '/dashboard', text: 'Setting' },
    ]
    const rightHeaderItems = [
        { path: '/dashboard', icon: <BellRingIcon className="h-7 w-6 hover:border-b-2 border-b-white transition-transform duration-200 active:scale-110" /> },
        { path: '/dashboard', icon: <MenuIcon className="h-7 w-6 hover:border-b-2 border-b-white transition-transform duration-200 active:scale-110" /> },
        { path: '/header/message', icon: <MessageSquareMoreIcon className="h-7 w-6 hover:border-b-2 border-b-white transition-transform duration-200 active:scale-110" /> },
        { path: '/dashboard', icon: <div className="w-14 h-9 border-x-2 border-x-blue-gray-700 flex justify-center items-center"><MoonIcon className="h-7 w-6 hover:border-b-2 border-b-white transition-transform duration-200 active:scale-110" /></div> },
    ]

    return (
        <div>
            <div className={`fixed ${className}`}>
                {/* Upper Head */}
                <div className=" flex justify-between  h-16  bg-blue-gray-300  border-b-2 border-b-blue-gray-700">
                    <div className="h-16 flex gap-4 font-bold text-xl items-center">
                        <LucideIndentDecrease className="ml-6 cursor-pointer" />
                        {
                            leftHeaderItems.map((item, index) => {
                                return (
                                    <NavLink key={index} to={item.path} className="hover:text-blue-gray-700 cursor-pointer"> {item.text} </NavLink>
                                )
                            })
                        }
                    </div>

                    <div className="flex items-center gap-4 mx-8">
                        {
                            rightHeaderItems.map((item, index) => {
                                return (
                                    <NavLink key={index} to={item.path} > {item.icon} </NavLink>
                                )
                            })
                        }

                        <div className="bg-blue-gray-300 h-10 flex items-center justify-center cursor-pointer">
                            <div className="h-9 w-9 rounded-md bg-orange-100"></div>
                        </div>
                    </div>
                </div>

                {/* Lower Head */}
                <div className="h-12 w-[100%] bg-blue-gray-300 flex items-center border-b-2 border-b-blue-gray-700 ">
                    <Link to="/dashboard" className="font-bold text-xl text-blue-900 underline pl-6">Home</Link>
                    <span className="font-bold text-xl text-blue-gray-900">{location.pathname}</span>
                </div>

            </div>
        </div>
    )
}

export default Header;