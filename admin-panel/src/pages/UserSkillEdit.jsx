
import { useState } from "react";
import Button from "../components/button/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";


const UserSkillEdit = () => {
    let url = import.meta.env.VITE_API_URL;
    const skillInputInfo = [
        { headingText: "Edit Skill Name", inputName: "skillName", typeText: "text", placeholderText: "Enter Your Skill Name" },
        { headingText: "Edit Skill Logo", inputName: "skillLogo", typeText: "file", className: "pt-2" },
        { headingText: "Edit Skill Percentage", inputName: "skillPercentage", typeText: "text", placeholderText: "Enter Your Name" },
        { headingText: "Description", inputName: "skillDescription", typeText: "text", placeholderText: "Enter Description" },
    ]
    const [loading, setLoading] = useState(false);
    const params = useParams();
    // const MUS = `/manageuser#skillSection`
    const navigate = useNavigate();
    const [EditSkill, setEditSkill] = useState({
        skillName: "",
        skillLogo: null,
        skillPercentage: "",
        skillDescription:"",
    });
    const changeEventHandler = async (e) => {
        if (e.target.type === 'file') {
            const file = e.target.files[0];
            setEditSkill({ ...EditSkill, [e.target.name]: file });
        } else {
            setEditSkill({ ...EditSkill, [e.target.name]: e.target.value })
        }
    };
    const formData = new FormData();
    const submitData = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!params || !params._id) {
            console.error("Error: param._id is undefined or null");
            return;
        }
        for (const key in EditSkill) {
            if (EditSkill[key]) {
                formData.append(key, EditSkill[key]);
            }
        }
        await axios({
            method: "put",
            url: url+"/api/v1/edit/user/skill/" + params._id,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((res) => {
            toast.success(res.data.message);
            navigate(`/manageuser#skillSection`)
            setEditSkill({
                skillName: " ",
                skillLogo: null,
                skillPercentage: " ",
                skillDescription:" ",
            })
        }).catch((error) => {
            toast.error(error.response.data.message)
            console.log("error in axios or response: ", error);
        }).finally(() => {
            setLoading(false);
        })
    }


    return (
        <div
            className={` w-[82.5%] h-screen bg-blue-gray-500 text-black relative flex flex-col  left-[17.5%] top-[15.9%] `}
        >
            <div className="w-full h-screen flex justify-center  ">
                <div className="h-[70%] w-[50%] bg-blue-gray-300 mt-16 rounded-lg border-4 border-blue-gray-700">
                    {skillInputInfo.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className=" m-8 h-20 flex flex-col justify-between"
                            >
                                <h1 className="text-xl">{item.headingText}</h1>
                                <input
                                    maxLength="170"
                                    type={item.typeText}
                                    name={item.inputName}
                                    value={EditSkill.name}
                                    placeholder={item.placeholderText}
                                    onChange={changeEventHandler}
                                    className={`${item.className} w-[100%] h-11 px-3 rounded-md text-black file:border-none file:bg-blue-gray-200  bg-blue-gray-200 placeholder:text-blue-gray-600  hover:translate-x-1 hover:translate-y-1  focus:outline-none border-2 border-blue-gray-700 focus:border-none focus:ring-2 focus:ring-blue-300  focus:shadow-[0_0_5px_5px_rgba(59,130,246)] transition`}
                                />
                            </div>
                        );
                    })}
                    <div className="flex justify-center items-end h-24">
                        {
                            loading?(
                            <Button className="text-cyan-50" onClick={submitData} text={<Loader2 className="animate-spin"></Loader2>}/>
                        ):
                            <Button className="text-cyan-50" onClick={submitData} text={<strong>Submit</strong>}/>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserSkillEdit;
