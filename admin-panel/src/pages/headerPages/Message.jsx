import { Plus, Trash2, UserCircle2 } from "lucide-react"
import { useEffect, useState } from "react"
import axios from 'axios';
import { Link, NavLink } from "react-router-dom"
import { toast } from "react-toastify";

const Message = () => {
    const url = import.meta.env.VITE_API_URL;
    //  {* for individual message*}
    // const param = useParams();
    const [toggle, setToggle] = useState(false);
    const [viewerDataOneByOne, setViewerDataOneByOne] = useState({
        viewerName: "",
        email: "",
        viewerSubject: "",
        viewerMessage: "",
        createdAt: "",
    });
    const getViewerMessage = async (id, viewerName, email, viewerSubject, viewerMessage, formattedTime, formattedDate) => {
        setViewerDataOneByOne({
            id: id,
            viewerName: viewerName,
            email: email,
            viewerSubject: viewerSubject,
            viewerMessage: viewerMessage, // Example customization
            createdAt: `${formattedDate} ____ ${formattedTime}`,
        });
        setToggle(true)
    }

    const deleteIndividualMessage = async (id)=>{
        await axios({
            url:`${url}/api/v2/delete/viewer/message/${id}`,
            method:"delete",
        }).then(async (res)=>{
            toast.success(res.data.message);
            await axios({
                url: url + "/api/v2/get/viewer/message",
                method: "get",
            }).then((res) => {
                setViewerData(res.data.data);
            }).catch((error) => {
                console.log("error in axios response from message: ", error);
            })
        }).catch((error)=>{
            console.log("error in axios or response of deleteIndividualMessage function: ",error);
        })
    }
    // const getViewerMessage = async (id) => {
    //     console.log("id:", id);
    //     await axios({
    //         url: "http://localhost:8000/api/v2/get/viewer/message/" + id,
    //         method: "get",
    //     }).then((res) => {
    //         setViewerDataOneByOne(res.data.data);
    //     }).catch((error) => {
    //         console.log("error in axios response from message: ", error);
    //     })
    // }
    // {* for all message*}
    const [viewerData, setViewerData] = useState([]);
    useEffect(() => {
        axios({
            url: url + "/api/v2/get/viewer/message",
            method: "get",
        }).then((res) => {
            setViewerData(res.data.data);
        }).catch((error) => {
            console.log("error in axios response from message: ", error);
        })
    }, []);

    const formatDateTime = (createdAt) => {
        const date = new Date(createdAt);
        // IST (Asia/Kolkata) के अनुसार तारीख और समय निकालें
        const optionsDate = { timeZone: "Asia/Kolkata", year: "numeric", month: "long", day: "numeric" };
        const optionsTime = { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };
        const formattedDate = new Intl.DateTimeFormat("en-IN", optionsDate).format(date);
        const formattedTime = new Intl.DateTimeFormat("en-IN", optionsTime).format(date);
        return { formattedDate, formattedTime };
    }
    return (
        <div className="h-screen ml-64 mt-28  bg-black opacity-40 flex justify-end px-4 pt-4 " >
            {/* left */}
            {
                toggle ? (<div className="w-[50rem] h-[35rem] flex justify-center items-center">
                    <div className="w-[30rem] h-[32rem] rounded-lg bg-white">
                        <div className="sticky top-0 z-10 bg-blue-gray-300  h-16 pl-4 gap-2 border-b-2 border-b-blue-gray-700 text-xl flex items-center cursor-default rounded-t-lg">
                            <UserCircle2 className="h-12 w-12" />
                            <div className="w-[22.5rem]">
                                <span className="text-xl font-bold">{viewerDataOneByOne.viewerName}</span>
                                <h1 className="text-sm  text-black">Available on mobile</h1>
                            </div>
                            <Trash2 className="cursor-pointer transition-transform duration-300 active:scale-125" onClick={()=>deleteIndividualMessage(viewerDataOneByOne.id)}/>
                        </div>
                        <div className="p-4">
                            <div className="mt-6">
                                <UserCircle2 className="h-20 w-20" />
                                <div className="text-2xl font-serif pl-1 pt-1">{viewerDataOneByOne.viewerName} <span className="font-thin text-2xl text-blue-gray-700">(She/Him)</span></div>
                                <h1 className="pl-1 font-serif">{viewerDataOneByOne.email}</h1>
                            </div>
                            <div className="flex w-[27.9rem] my-4 justify-center">{viewerDataOneByOne.createdAt}</div>
                            <div className="flex gap-2">
                                <strong className="text-xl">Subject:</strong>
                                <h1 className="break-words overflow-hidden text-xl font-serif">{viewerDataOneByOne.viewerSubject}</h1>
                            </div>
                            <div className="flex gap-2 my-2">
                                <strong className="text-xl">Message:</strong>
                                <h1 className="break-words overflow-hidden  font-serif">{viewerDataOneByOne.viewerMessage}</h1>
                            </div>
                        </div>
                    </div>
                </div>) : " "
            }

            {/* right */}
            <div className="w-[22rem] h-[35rem] bg-white rounded-lg overflow-x-auto scrollbar-none relative ">
                <div className="sticky top-0 z-10 bg-blue-gray-300  h-16 pl-4 gap-2 border-b-2 border-b-blue-gray-700 text-xl flex items-center cursor-default rounded-t-lg">
                    <div className="h-9 w-9 rounded-md bg-orange-100"></div>
                    <span>Gaurav Sharma</span>
                    <Link to="/dashboard" className="ml-28"><Plus className="relative  rotate-45 h-8 w-7 cursor-pointer" /></Link>
                </div>
                {
                    viewerData.map((item) => {
                        const { formattedDate, formattedTime } = formatDateTime(item.createdAt);
                        return (<NavLink onClick={() => getViewerMessage(item._id, item.viewerName, item.email, item.viewerSubject, item.viewerMessage, formattedTime, formattedDate)} key={item._id} className={(isActive) => `h-16 p-2 bg-blue-gray-100 m-2 rounded-lg flex gap-3 items-center  ring-1 focus:ring-black ${isActive ? '' : " "}`}>
                            <UserCircle2 className="h-12 w-12" />
                            <div className="h-14 ">
                                <h1 className="font-bold text-black">{item.viewerName}</h1>
                                <div className="w-64 flex justify-between items-center">
                                    <span className="">{formattedDate}</span>
                                    <span className="">{formattedTime}</span>
                                </div>
                            </div>
                        </NavLink>)
                    }
                    )
                }
            </div>
        </div>
    )
}

export default Message