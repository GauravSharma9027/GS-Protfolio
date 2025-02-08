import { Clock, Github, Linkedin, Mail, PhoneCall, Loader2 } from "lucide-react"
import Footer from "../components/Footer"
import Button from "../components/buttons/Button"
import HR from "../assets/160_Hackerrank_logo_logos-1024.webp"
import LC from "../assets/leetcode-3628885-3030025.webp"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { toast } from "react-toastify";

const Contact = () => {
    const url = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        email: "",
        number: "",
        github: "",
        hackerRank: "",
        leetCode: "",
        linkedin: "",
        GFG: ""
    });
    useEffect(() => {
        axios({
            url: url + "/api/v1/get/user/info",
            method: "get",
        }).then((res) => {
            setUserData(res.data.data);
        }).catch((error) => {
            console.log("error in response of Contact file: ", error);
        })
    }, []);

    // { send message }
    const [messageData, setMessageData] = useState({
        viewerName: "",
        email: "",
        viewerSubject: "",
        viewerMessage: "",
    });
    const changeEventHandler = (e) => {
        e.preventDefault();
        setMessageData({ ...messageData, [e.target.name]: e.target.value })
    }
    const sendMessage = async (e) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData();
        for (const key in messageData) {
            if (messageData[key]) {
                formData.append(key, messageData[key]);
            }
        }
        // console.log("FormData content:");
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ": " + pair[1]);
        // }

        await axios({
            method: "post",
            url: url + "/api/v2/send/viewer/message",
            data: formData,
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            toast.success(res.data.message);
            setMessageData({
                viewerName: "",
                email: "",
                viewerSubject: "",
                viewerMessage: "",
            })
        }).catch((error) => {
            toast.warn(error.response.data.message);
            console.log("error in axios response from Contact", error);
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className="2xl:ml-72">
            <div className="w-full px-16 my-10 flex">
                <div className="w-[50%] flex flex-col gap-12">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-blue-600 font-bold text-xl">Have a Question?</h1>
                        <h1 className="text-6xl font-serif">Contact With Us...</h1>
                    </div>
                    <div className="flex flex-col gap-2 px-4">
                        <div className="bg-black opacity-60 rounded-lg w-96 flex gap-4 text-xl h-14 items-center pl-4">
                            <PhoneCall />
                            <h1>+91 {userData.number}</h1>
                        </div>
                        <div className="bg-black opacity-60 rounded-lg w-96 flex gap-4 text-xl h-14 items-center pl-4">
                            <Mail />
                            <h1>{userData.email}</h1>
                        </div>
                        <div className="bg-black opacity-60 rounded-lg w-96 flex gap-4 text-xl h-14 items-center pl-4">
                            <Linkedin />
                            <h1><Link to={userData.linkedin} className="text-blue-600 underline">LinkedIn</Link></h1>
                        </div>
                        <div className="bg-black opacity-60 rounded-lg w-96 flex gap-4 text-xl h-14 items-center pl-4">
                            <PhoneCall />
                            <h1>+91 9027525718</h1>
                        </div>
                        <div className="mt-16 w-96 flex gap-4 items-center">
                            <Link to={userData.github}><span className="w-9 h-9 flex justify-center items-center bg-slate-300 rounded-lg transition-transform duration-300 hover:scale-125"><Github className="text-black font-bold" /></span></Link>
                            <Link to={userData.hackerRank}><img src={HR} className="h-10 w-10 cursor-pointer transition-transform duration-300 hover:scale-125" alt="" /></Link>
                            <Link to={userData.leetCode}><img src={LC} className="h-10 w-10 cursor-pointer transition-transform duration-300 hover:scale-125" alt="" /></Link>
                        </div>
                        <hr className="border-2 w-96" />
                        <div className="opacity-60 rounded-lg flex gap-1 mt-4">
                            <Clock />
                            <h1 className="font-serif">The One Est Bad, Semper Six at <br /> Quis, Congue 8AM - 8PM</h1>
                        </div>
                    </div>
                </div>

                {/* message send form */}
                <div className="w-[50%]  pt-10 pl-8 flex flex-col  items-center gap-8">
                    <h1 className="text-4xl font-semibold">Send Me Message!</h1>
                    <div className="w-[90%] py-10 bg-[rgb(37,35,42)] flex flex-col gap-4 items-center justify-center rounded-3xl ring-4 ring-[rgb(57,54,62)] ">
                        <div>
                            <input type="text" maxLength="23" name="viewerName" value={messageData.viewerName} onChange={changeEventHandler} placeholder="Your Name" className="w-80 h-10 px-4 bg-black opacity-60 outline-none rounded-3xl" />
                        </div>
                        <div>
                            <input type="email" name="email" value={messageData.email} onChange={changeEventHandler} placeholder="Email" className="w-80 h-10 px-4 bg-black opacity-60  outline-none rounded-3xl" />
                        </div>
                        <div>
                            <input type="text" name="viewerSubject" value={messageData.viewerSubject} onChange={changeEventHandler} placeholder="Subject" className="w-80 h-10 px-4 bg-black opacity-60 outline-none rounded-3xl" />
                        </div>
                        <div>
                            <textarea type="text" name="viewerMessage" value={messageData.viewerMessage} onChange={changeEventHandler} cols="30" rows="6" placeholder="Your Message" maxLength="150" className="w-80 px-4 pt-3 bg-black opacity-60 outline-none rounded-2xl resize-none" />
                        </div>
                        <div className="flex items-start w-80">
                            {
                                loading ? (
                                    <Button text={<Loader2 className="animate-spin"></Loader2>} />
                                ) : (
                                    <Button onClick={sendMessage} className="w-36 h-10 rounded-3xl text-white ring-1 ring-white" text="send message" />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact

// import { Clock, Github, Linkedin, Mail, PhoneCall, Loader2 } from "lucide-react";
// import Footer from "../components/Footer";
// import Button from "../components/buttons/Button";
// import HR from "../assets/160_Hackerrank_logo_logos-1024.webp";
// import LC from "../assets/leetcode-3628885-3030025.webp";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

// const Contact = () => {
//     const [loading, setLoading] = useState(false);
//     const [userData, setUserData] = useState({
//         email: "",
//         number: "",
//         github: "",
//         hackerRank: "",
//         leetCode: "",
//         linkedin: "",
//         GFG: ""
//     });
    
//     useEffect(() => {
//         axios.get("http://localhost:8000/api/v1/get/user/info")
//             .then((res) => setUserData(res.data.data))
//             .catch((error) => console.log("error in response of Contact file: ", error));
//     }, []);

//     const [messageData, setMessageData] = useState({
//         viewerName: "",
//         email: "",
//         viewerSubject: "",
//         viewerMessage: "",
//     });

//     const changeEventHandler = (e) => {
//         setMessageData({ ...messageData, [e.target.name]: e.target.value });
//     };

//     const sendMessage = async (e) => {
//         setLoading(true);
//         e.preventDefault();
//         const formData = new FormData();
//         Object.keys(messageData).forEach(key => {
//             if (messageData[key]) {
//                 formData.append(key, messageData[key]);
//             }
//         });

//         try {
//             const res = await axios.post("http://localhost:8000/api/v2/send/viewer/message", formData, {
//                 headers: { "Content-Type": "application/json" }
//             });
//             toast.success(res.data.message);
//             setMessageData({ viewerName: "", email: "", viewerSubject: "", viewerMessage: "" });
//         } catch (error) {
//             toast.warn(error.response?.data?.message || "Something went wrong");
//             console.log("error in axios response from Contact", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="px-4 sm:px-8 md:px-16 lg:ml-20 xl:ml-40 2xl:ml-72">
//             <div className="flex flex-col lg:flex-row my-10 gap-8 lg:gap-16">
//                 <div className="w-full lg:w-1/2 flex flex-col gap-8">
//                     <div className="flex flex-col gap-3">
//                         <h1 className="text-blue-600 font-bold text-xl">Have a Question?</h1>
//                         <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif">Contact With Us...</h1>
//                     </div>
//                     <div className="flex flex-col gap-4">
//                         {[{icon: PhoneCall, text: `+91 ${userData.number}`}, {icon: Mail, text: userData.email}, {icon: Linkedin, text: <Link to={userData.linkedin} className="text-blue-600 underline">LinkedIn</Link>}].map((item, index) => (
//                             <div key={index} className="bg-black opacity-60 rounded-lg p-4 flex items-center gap-4 text-lg">
//                                 <item.icon />
//                                 <h1>{item.text}</h1>
//                             </div>
//                         ))}
//                         <div className="flex gap-4 items-center mt-8">
//                             {[{icon: Github, link: userData.github}, {icon: HR, link: userData.hackerRank, isImg: true}, {icon: LC, link: userData.leetCode, isImg: true}].map((item, index) => (
//                                 <Link key={index} to={item.link} className="transition-transform duration-300 hover:scale-125">
//                                     {item.isImg ? <img src={item.icon} className="h-10 w-10" alt="" /> : <item.icon className="text-black font-bold w-9 h-9 bg-gray-300 rounded-lg flex justify-center items-center" />}
//                                 </Link>
//                             ))}
//                         </div>
//                         <hr className="border-2 w-96" />
//                         <div className="opacity-60 flex gap-1 mt-4">
//                             <Clock />
//                             <h1 className="font-serif">The One Est Bad, Semper Six at <br /> Quis, Congue 8AM - 8PM</h1>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="w-full lg:w-1/2 pt-10 flex flex-col items-center gap-8">
//                     <h1 className="text-3xl md:text-4xl font-semibold">Send Me Message!</h1>
//                     <div className="w-full max-w-lg p-6 bg-gray-900 rounded-3xl ring-4 ring-gray-700">
//                         {['viewerName', 'email', 'viewerSubject', 'viewerMessage'].map((field, index) => (
//                             <div key={index} className="mb-4">
//                                 {field === 'viewerMessage' ? (
//                                     <textarea name={field} value={messageData[field]} onChange={changeEventHandler} placeholder="Your Message" maxLength="150" className="w-full h-24 p-3 bg-black opacity-60 outline-none rounded-2xl resize-none" />
//                                 ) : (
//                                     <input type={field === 'email' ? 'email' : 'text'} name={field} value={messageData[field]} onChange={changeEventHandler} placeholder={field.replace('viewer', '')} className="w-full h-10 p-3 bg-black opacity-60 outline-none rounded-3xl" />
//                                 )}
//                             </div>
//                         ))}
//                         <div className="flex justify-center">
//                             {loading ? (
//                                 <Button text={<Loader2 className="animate-spin" />} />
//                             ) : (
//                                 <Button onClick={sendMessage} className="w-36 h-10 rounded-3xl text-white ring-1 ring-white" text="Send Message" />
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default Contact;
