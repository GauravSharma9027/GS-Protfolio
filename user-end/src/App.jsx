import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import MainLayout from "./layouts/MainLayout"
import About from "./pages/About"
import Experience from "./pages/Experience"
import Resume from "./pages/Resume"
import Contact from "./pages/Contact"
import {ToastContainer}  from "react-toastify"
import Setting from "./pages/Setting"
const BrowserRouter = createBrowserRouter([
      {
        path:'/',
        element:<MainLayout/>,
        children:[
          {
            path:"/",
            element:<Home/>
          },
          {
            path:"/about",
            element:<About/>
          },
          {
            path:"/experience",
            element: <Experience/>
          },
          {
            path:"/resume",
            element:<Resume/>
          },
          {
            path:"/contact",
            element:<Contact/>
          },
          {
            path:"/setting",
            element:<Setting/>
          },
        ]
      }
])
const App = () => {
  return (
    <div className="h-screen w-screen">
      <RouterProvider router={BrowserRouter}/>
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
    </div>
  )
}

export default App