import { Outlet } from "react-router-dom"
import LeftSidebar from "../components/LeftSidebar"

const MainLayout = () => {
    return (
        <div className="w-screen h-screen overflow-y-scroll scrollbar-none">
            <LeftSidebar />
            <Outlet />
        </div>
    )
}

export default MainLayout