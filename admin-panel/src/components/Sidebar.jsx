// import { Avatar } from "@material-tailwind/react";
import { File, LayoutDashboard, LogOutIcon, Settings, UserCircle2Icon } from "lucide-react"
import { NavLink } from "react-router-dom"



const Sidebar = () => {
    const SidebarSidebarItems = [
        { icon: <LayoutDashboard className="w-6 h-6 cursor-pointer"  />, text: "Dashboard", path: '/dashboard' },
        { icon: <UserCircle2Icon className="w-6 h-6 cursor-pointer"  />, text: "ManageUser", path: '/manageuser' },
        { icon: <File className="w-6 h-6 cursor-pointer" />, text: "Profile", path: '/profile' },
        { icon: <Settings className="w-6 h-6 cursor-pointer" />, text: "Setting", path: '/setting' },
        { icon: <LogOutIcon className="w-6 h-6 cursor-pointer" />, text: "Logout", path: '/logout' },
    ]

    const linkRoute = (textPath)=>{
        if(textPath == "/logout") localStorage.removeItem("adminToken");
    }
    return (
        <>
            <div className="w-64 fixed h-screen z-10 bg-blue-gray-300 border-r-2 border-r-blue-gray-700">
                <div className="bg-blue-gray-300 h-16 pl-4 gap-2 border-b-2 border-b-blue-gray-700 text-xl flex items-center cursor-default">
                    <div className="h-9 w-9 rounded-md bg-orange-100"></div>
                    <span>Gaurav Sharma</span>
                </div>
                {
                    SidebarSidebarItems.map((item, index) => {
                        return (
                            <NavLink key={index} to={item.path} onClick={()=> linkRoute(item.path)} className={({isActive})=>`flex relative items-center my-3 mx-2  py-1 hover:bg-blue-gray-200 rounded-lg ${isActive ? 'bg-blue-gray-200': " bg-blue-gray-300"}`}>
                                <span className="pl-4 my-2"> {item.icon} </span>
                                <span className="pl-3 text-xl my-1 cursor-pointer ">{item.text}</span>
                            </NavLink>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Sidebar;

