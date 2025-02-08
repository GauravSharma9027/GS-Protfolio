import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ManageUser from "./pages/ManageUser";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import UserDetailForm from "./pages/UserDetailForm";
import EditUserDetailForm from "./pages/EditUserDetailFOrm.sx";
import UserSkills from "./pages/UserSkills";
import UserSkillEdit from "./pages/UserSkillEdit";
import ProjectForm from "./components/ProjectForm";
import EducationForm from "./pages/EduactionForm";
import Message from "./pages/headerPages/Message";
import LoginForAdmin from "./pages/LoginForAdmin";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: localStorage.getItem('adminToken')? <Layout /> : <LoginForAdmin/>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/manageuser",
        element:<ManageUser />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
      {
        path: "/manageuser/adduser",
        element: <UserDetailForm />
      },
      {
        path:"/manageuser/edituser",
        element: <EditUserDetailForm/>
      },
      {
        path:"/manageuser/addskills",
        element: <UserSkills/>
      },
      {
        path:"/manageuser/editskills/:_id",
        element:<UserSkillEdit/>
      },
      {
        path:"/manageuser/addeducation",
        element:<EducationForm/>
      },
      {
        path:"/manageuser/addprojects",
        element:<ProjectForm/>
      },
      {
        path:"/header/message",
        element:<Message/>
      }
    ]
  },
  {
    path:"/login",
    element: localStorage.getItem('adminToken')? <Layout />:<LoginForAdmin/>
  },
  {
    path:"/logout",
    element: <LoginForAdmin/>
  }
]);
const App = () => {
  return (
    <div>
      <RouterProvider router={BrowserRouter} />
      <ToastContainer
        toastClassName="transparent-toast"
        position="top-right"
        autoClose={ 3000 }
        hideProgressBar={true }
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

{/* <Route path="*" element={<Navigate to="/" />} /> */}
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/dashboard/home" element={<Home/>}></Route>
        </Routes>
      </BrowserRouter> */}
    </div>
  )
}

export default App