import Button from "../components/button/Button"
import book from "../assets/loginForm/book.png";
import tea1 from "../assets/loginForm/tea1.png";
import pencil from "../assets/loginForm/Pencil.png";

import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { Loader2 } from "lucide-react";


const LoginForAdmin = () => {
    let url = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        email:"",
        password:"",
    });

    const changeEventHandler = (e) => {
        e.preventDefault();
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }
    const loginDashboard = async () => {
        // e.defaultPrevent();
        setLoading(true);

        const formData = new FormData();
        for (const key in loginData) {
            if (loginData[key]) {
                formData.append(key, loginData[key]);
            }
        }
        // console.log("FormData content:", formData);
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ": " + pair[1]);
        // }

        await axios({
            method: "post",
            url: url+"/api/v1/admin/login",
            data: formData,
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            toast.success(res.data.message)
            console.log(res.data.token);
            localStorage.setItem("adminToken",res.data.token)
            
            // window.location.href = 'http://localhost:12345/' //same tab me open hoga
            const adminUrl = import.meta.env.VITE_ADMIN_URL;
            window.open(adminUrl, "_blank"); // URL ko nayi tab me open karta hai
        }).catch((error) => {
            toast.error(error.response.data.message);
        }).finally(() => {
            setLoading(false);
        })
    }
    return (
        <div className="h-screen bg-blue-gray-500">
            <div className="h-screen text-black flex justify-center items-center">

                <div className="w-[60%] h-[85%] p-10 overflow-hidden bg-blue-gray-100 rounded-3xl flex flex-col gap-10 items-center shadow-[-5px_5px_15px_0px_rgba(255,255,255,0.5)]">
                    <img src={tea1} alt="" className="absolute w-52 h-52 right-60 top-0" />
                    {/* <img src={logo} alt="" className="absolute bg-white rounded-full w-28 h-28 left-[26%] top-8"/> */}
                    <div className="w-56">
                        <h1 className="text-center font-bold text-black text-4xl">GS Portfolio</h1>
                        <h5 className="text-center text-black">Fast & Easy Management</h5>
                    </div>
                    <h2 className="text-center font-serif text-black text-2xl">Welcome Back!</h2>
                    <div className="w-[35%]">
                        <span>Email</span>
                        <input type="email" placeholder="abc@gmail.com" name="email" value={loginData.email} onChange={changeEventHandler}  className=" w-[100%] h-8 px-3 my-3 bg-slate-300  text-black  bg-blue-gray-100 placeholder:text-blue-gray-600  hover:translate-x-1 hover:translate-y-1  focus:outline-none border-b-2 border-blue-gray-700  transition" />

                        <span>Password</span>
                        <input type="password" placeholder="xxxxxxx" name="password" value={loginData.password} onChange={changeEventHandler} className=" w-[100%] h-8 px-3 my-3 bg-slate-300  text-black  bg-blue-gray-100 placeholder:text-blue-gray-600  hover:translate-x-1 hover:translate-y-1  focus:outline-none border-b-2 border-blue-gray-700 transition" />

                        {
                            loading ? (
                                <Button target="_black" className="w-[100%] mt-10 rounded-lg cursor-wait text-white" text={<Loader2 className="animate-spin flex justify-center items-center"></Loader2>} />
                            ) : (
                                <Button className="w-[100%] mt-10 rounded-lg cursor-pointer text-white" text="Login" target="_blank" onClick={loginDashboard} />
                            )
                        }

                    </div>

                    <h1 className="mt-8 ">Term of use | Privacy policy</h1>
                </div>
                <Button className="absolute top-[75%] right-60 rounded-3xl p-4 bg-blue-500 text-white border-4 border-white hover:border-4 hover:border-black" text="Forget Password & Email" />
                <Button className="absolute top-[82%] right-60 rounded-3xl p-4 bg-stone-400 text-white border-4 border-white hover:border-4 hover:border-black" text="Need Help?" />

                <img src={book} className="absolute h-48 w-48 bottom-10 left-[20%] rotate-12" />
                <img src={pencil} className="absolute h-28 w-28 bottom-28 left-[23%] -rotate-90" />
            </div>
        </div>
    )
}

export default LoginForAdmin;