import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"


const Layout = () => {
    
    return (
        <div>
            <div className="flex w-screen h-screen bg-blue-gray-500 overflow-y-scroll scrollbar-none">
                <Sidebar />
                <div className="w-screen h-screen flex flex-col">
                    <Header className="fixed w-[83%] left-[17.46%] z-10" />
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Layout