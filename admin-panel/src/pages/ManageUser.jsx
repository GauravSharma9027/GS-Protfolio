import axios from "axios";
import { FilePenLine, Loader2, PercentIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/button/Button";

const ManageUser = (className) => {
    let url = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false);
    //   data aa raha hai user ka
    const [userData, setUserData] = useState({
        username: " ",
        profession: " ",
        profilePhoto: " ",
        welcomeMsg: " ",
        email: " ",
        number: " ",
        linkedin: " ",
        whatAppNumber: " ",
        hackerRank: " ",
        leetCode: " ",
        userDescription: " "
    });
    useEffect(() => {
        axios({
            url: url+'/api/v1/get/user/info',
            method: 'get',
        }).then((res) => {
            setUserData(res.data.data);
        }).catch((error) => {
            console.log("error", error);
        })
    }, []);

    // skill ka data aa raha hai 
    const [skillData, setSkillData] = useState([]);
    useEffect(() => {
        axios({
            url: url+"/api/v1/get/user/skill",
            method: 'get',
        }).then((res) => {
            setSkillData(res.data.data);
            
        }).catch((error) => {
            console.log("error: ", error);
        })
    }, []);
    console.log(skillData);
    
    // delete ho ri hai skill
    const deleteSkill = async (id)=>{
        // e.preventDefault();
        setLoading(true);
        console.log(id);
        await axios({
            method:"delete",
            url: `${url}/api/v1/delete/user/skill/${id}`,
        }).then(async (res)=>{
            toast.success(res.data.message);
            await axios({
                url: url+"/api/v1/get/user/skill",
                method: 'get',
            }).then((res) => {
                setSkillData(res.data.data);
            }).catch((error) => {
                console.log("Error fetching skill data: ", error);
            });
        }).catch((error)=>{
            console.log("error hai delete axios me", error);
        }).finally(()=>{
            setLoading(false);
        })
    }
    return (
        <div className="w-full h-screen bg-blue-gray-500 flex flex-col left-[17.5%] top-[15.9%]">
            <div className={`w-[82.65%] h-screen  text-black relative flex flex-col left-[17.45%] top-[15.9%] ${className}`}>
                <div className="h-36 flex flex-col pl-4 pt-8 items-center">
                    <input type="text" className="w-[93%] h-9 px-5 rounded-md placeholder:text-start placeholder:text-black focus:outline-none text-black text-base border-2 border-blue-gray-700 bg-blue-gray-300 focus:border-2 focus:border-none focus:ring-2 focus:ring-blue-300 focus:shadow-[0_0_5px_5px_rgba(59,130,246)] transition " placeholder="Search" />
                    <div className="w-[93%] h-10 mt-4 flex justify-between">
                        <Link className="cursor-pointer" to="/manageuser/adduser"><Button className="text-white" text={<strong>Add User</strong>}></Button></Link>
                        <Link className="cursor-pointer" to="/manageuser/addskills"><Button className="text-white" text={<strong>Add Skills</strong>}></Button></Link>
                        <Link className="cursor-pointer" to="/manageuser/addeducation"><Button className="text-white" text={<strong>Add Education</strong>}></Button></Link>
                        <Link className="cursor-pointer" to="/manageuser/addprojects"><Button className="text-white" text={<strong>Add Projects</strong>}></Button></Link>
                    </div>
                </div>

                {/* user information section */}
                <div className=" h-[53%] pl-4 pt-8 flex justify-evenly">
                    <div className="h-80 w-[29%] bg-blue-gray-300 rounded-[10%] flex flex-col shadow-[0_0_5px_3px_rgba(255,255,255,100%)]">
                        <div className="h-[78%] flex justify-center items-end">
                            <img src={userData?.profilePhoto || 'https://via.placeholder.com/150'} alt="img" className="h-[90%] w-[70%] mb-2 rounded-[10%]" />
                        </div>
                        <div className="pl-14"><strong>User Name: </strong>{userData?.username || "abc"}</div>
                        <div className="pl-14"><strong>User Profession: </strong>{userData?.profession || "developer"}</div>
                    </div>
                    <div className="h-80 w-[29%] bg-blue-gray-300 rounded-[10%] flex flex-col gap-2 py-4 overflow-x-auto scrollbar-none shadow-[0_0_5px_3px_rgba(255,255,255,100%)]">
                        <div className="px-4"><strong>E-mail Address: </strong>{userData?.email || "abc@gmail.com"}</div>
                        <div className="px-4"><strong>Contact Number: </strong>{userData?.number || "1234xxxxxx"}</div>
                        <div className="px-4"><strong>WhatsApp Contact: </strong> {userData?.whatAppNumber || "1234xxxxxx"}</div>
                        <div className="px-4"><strong>LinkedIn Link: </strong> {userData?.linkedin || "https://linkedin.xxxxxx.com"} </div>
                        <div className="px-4"><strong>HackerRank Link: </strong> {userData?.hackerRank || "https://hackerrank.xxxxxx.com"}</div>
                        <div className="px-4"><strong>LeetCode Link: </strong> {userData?.leetCode || "https://leetcode.xxxxxx.com"}</div>
                    </div>
                    <div className="h-80 w-[29%] py-4 bg-blue-gray-300 rounded-[10%] overflow-y-auto scrollbar-none shadow-[0_0_5px_3px_rgba(255,255,255,100%)]">
                        <div className="px-4"><strong> User Description: </strong>{userData?.userDescription || "Enter Your Description"}</div>
                    </div>
                </div>
                <div className="flex  justify-end pt-4 pr-9">
                    <Link to="/manageuser/edituser">
                        <Button className="text-white" text={<strong>Edit Info</strong>} />
                    </Link>
                </div>

                {/* Skill Section (Placed Below Everything) */}
                <div className="w-full  py-8 mt-8 flex justify-center items-center">
                    <div className="w-[80%] rounded-lg scroll-smooth">
                        <table className="min-w-full bg-blue-gray-500 border rounded-lg border-none">
                            <thead>
                                <tr className=" bg-black rounded-lg">
                                    <th className="text-xl py-3 px-4 font-bold text-white rounded-t-lg">Skill Logo</th>
                                    <th className="text-xl py-3 px-4 font-bold text-white rounded-t-lg">Skill Name</th>
                                    <th className="text-xl py-3 px-4 font-bold text-white rounded-t-lg">Skill Percentage</th>
                                    <th className="text-xl py-3 px-4 font-bold text-white rounded-t-lg">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {skillData.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className={`${index % 2 === 0 ? "bg-blue-gray-300" : "bg-blue-gray-200"
                                            } hover:bg-gray-100 transition-colors duration-200`}
                                    >
                                        <td id={`skillSection`} className="py-3 px-4 text-gray-700  border-2 border-blue-gray-700">
                                            <div className="flex items-center justify-center"> <img src={item.skillLogo} alt="" className="h-12 w-12" /> </div>
                                        </td>
                                        <td className="py-3 px-4 text-xl text-gray-900 border-2 border-blue-gray-700"><div className="flex items-center justify-center">{item.skillName}</div></td>
                                        <td className="py-3 px-4 text-xl text-gray-900 border-2 border-blue-gray-700"><div className="flex items-center justify-center">{item.skillPercentage} <PercentIcon className="h-7 w-5" /></div></td>
                                        <td className="py-3 px-4 text-xl text-gray-900 border-2 border-blue-gray-700">
                                            <div className="flex items-center justify-center gap-7">
                                                <Link to={`/manageuser/editskills/${item._id}`}>< FilePenLine  className="h-[1.70rem] w-[1.85rem] text-green-900 cursor-pointer transform transition-transform duration-300 hover:scale-125" /></Link>
                                                {
                                                    loading?(
                                                        <Loader2 className="animate-spin"/>
                                                    ):(
                                                        <Link onClick={()=>deleteSkill(item._id)} ><Trash2 className="h-8 w-[1.85rem] text-red-900 cursor-pointer transform transition-transform duration-300 hover:scale-125" /></Link>
                                                    )
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageUser;
