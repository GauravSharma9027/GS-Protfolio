// import { File, LayoutDashboard, LogOutIcon, Settings, UserCircle2 } from "lucide-react"
// import { NavLink, useNavigate } from "react-router-dom"



// const Dashboard = () => {
//     const navigate = useNavigate();
//     const dashboardSidebarItems = [
//         { icon: <LayoutDashboard className="w-8 h-8 cursor-pointer"  />, text: "Dashboard", path: '/dashboard' },
//         { icon: <UserCircle2 className="w-8 h-8 cursor-pointer"  />, text: "ManageUser", path: '/dashboard/manageuser' },
//         { icon: <File className="w-8 h-8 cursor-pointer" />, text: "Profile", path: '/dashboard/profile' },
//         { icon: <Settings className="w-8 h-8 cursor-pointer" />, text: "Setting", path: '/dashboard/setting' },
//         { icon: <LogOutIcon className="w-8 h-8 cursor-pointer" />, text: "Logout", path: '/dashboard/logout' },
//     ]

//     const linkRoute = (textPath)=>{
//         if(textPath) navigate(textPath);
//     }
//     return (
//         <>
//             <div className="w-60 h-full bg-blue-gray-300">
//                 <div className="bg-blue-700 h-10 flex justify-center items-center cursor-default">GS</div>
//                 {
//                     dashboardSidebarItems.map((item, index) => {
//                         return (
//                             <div key={index} className="flex relative left-4 pt-7">
//                                 {item.icon}
//                                 <NavLink to={item.path} onClick={()=> linkRoute(item.path)} className="pl-4 text-2xl cursor-pointer">{item.text}</NavLink>
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         </>
//     )
// }

// export default Dashboard;



const Dashboard = () => {
    return (
        <div>Dashboard</div>
    )
}

export default Dashboard