import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/button/Button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const UserDetailForm = () => {
    let url = import.meta.env.VITE_API_URL;
    const leftInputSpanInfo = [
        { spanText: "User Name", nameText: "username", typeText: "text", placeholderText: "Enter Your Name" },
        { spanText: "User Profession", nameText: "profession", typeText: "text", placeholderText: "Enter Your Profession" },
        { spanText: "Select Profile Photo", nameText: "profilePhoto", typeText: "text", placeholderText: "Enter Your Name" },
        { spanText: "Select Resume Photo", nameText: "resumePhoto", typeText: "text", placeholderText: "Enter Your Name" },
        { spanText: "Welcome Message", nameText: "welcomeMsg", typeText: "text", placeholderText: "Enter Welcome Message" },
        { spanText: "User E-mail", nameText: "email", typeText: "email", placeholderText: "Enter Your E-mail" },
        { spanText: "User Number", nameText: "number", typeText: "number", placeholderText: "Enter Your Number" },
        { spanText: "User WhatsApp Number ", nameText: "whatAppNumber", typeText: "number", placeholderText: "Enter Your WhatsApp Number" },
        { spanText: "User LinkedIn Link", nameText: "linkedin ", typeText: "text", placeholderText: "Enter Your LinkedIn Link" },
        { spanText: "User HackerRank Link", nameText: "hackerRank", typeText: "text", placeholderText: "Enter Your HackerRank Link" },
        { spanText: "User LeetCode Link", nameText: "leetCode", typeText: "text", placeholderText: "Enter Your LeetCode Link" }
    ];

    // right(edit wali) side
    const rightInputSpanInfo = [
        { spanText: "Edit User Name", nameText: "username", typeText: "text", placeholderText: "Enter Your Name" },
        { spanText: "Edit User Profession", nameText: "profession", typeText: "text", placeholderText: "Enter Your Profession" },
        { spanText: "Edit Select Profile Photo", nameText: "profilePhoto", typeText: "file", placeholderText: "Enter Your Name" },
        { spanText: "Edit Select Resume", nameText: "resumePhoto", typeText: "file", placeholderText: "Enter Your Name" },
        { spanText: "Edit Welcome Message", nameText: "welcomeMsg", typeText: "text", placeholderText: "Enter Welcome Message" },
        { spanText: "Edit User E-mail", nameText: "email", typeText: "email", placeholderText: "Enter Your E-mail" },
        { spanText: "Edit User Number", nameText: "number", typeText: "number", placeholderText: "Enter Your Number" },
        { spanText: "Edit User WhatsApp Number ", nameText: "whatAppNumber", typeText: "number", placeholderText: "Enter Your WhatsApp Number" },
        { spanText: "User LinkedIn Link", nameText: "linkedin", typeText: "text", placeholderText: "Enter Your LinkedIn Link" },
        { spanText: "Edit User HackerRank Link", nameText: "hackerRank", typeText: "text", placeholderText: "Enter Your HackerRank Link" },
        { spanText: "Edit User LeetCode Link", nameText: "leetCode", typeText: "text", placeholderText: "Enter Your LeetCode Link" }
    ];

    // for data fetch
    const [userData, setUserData] = useState({
        username: " ",
        profession: " ",
        profilePhoto: " ",
        resumePhoto: " ",
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
            method: "get",
        }).then((res) => {
            setUserData(res.data.data);
        }).catch((error) => {
            console.log("error in edit user Data me ", error);
        })
    }, [])

    // for data submit
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        username: " ",
        profession: " ",
        profilePhoto: null,
        resumePhoto: null,
        welcomeMsg: " ",
        email: " ",
        number: " ",
        whatAppNumber: " ",
        linkedin: " ",
        hackerRank: " ",
        leetCode: " ",
        userDescription: " "
    });

    const changeEventHandler = async (e) => {
        if (e.target.type === "file") {
            const file = e.target.files[0]; // Capture the file
            setInput({ ...input, [e.target.name]: file }); // Update the input state with the file
        } else {
            setInput({ ...input, [e.target.name]: e.target.value }); // For text inputs, handle normally
        }
    };

    const submitdata = async (e) => {
        e.preventDefault();
        setLoading(true);//loader start

        const formData = new FormData();
        for (let key in input) {
            if (input[key]) {
                // Check if the input is a file before appending
                if (input[key] instanceof File) {
                    formData.append(key, input[key]);  // Append the file if it is a file
                } else {
                    formData.append(key, input[key]);  // Append other values normally
                }
            }
        }
        await axios({
            method: "post",
            data: formData,
            url:url+ "/api/v1/edit/user/info",
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
                    toast.success(res.data.message);
                    navigate("/manageuser");
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className=" w-[82.5%] h-screen">
            <div className=" bg-blue-gray-500 flex font-bold relative pb-4 left-[21%] top-[15.9%]">
                <div className=" w-[50%]">
                    <div className="flex flex-col pt-4">
                        {leftInputSpanInfo.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="gap-2 m-2 flex flex-col mx-[1.65rem]"
                                >
                                    <span>{item.spanText}</span>
                                    <input
                                        disabled
                                        type={item.typeText}
                                        placeholder={item.placeholderText}
                                        // name={item.nameText}
                                        value={userData[item.nameText.trim()] || ""}
                                        className=" w-[100%] h-8 px-3 rounded-md text-black   bg-blue-gray-200 placeholder:text-blue-gray-600 border-2 border-blue-gray-700"
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-col justify-evenly mt-2">
                        <div className="gap-2 flex flex-col">
                            <span className="mx-[1.65rem]">User Description</span>
                            <textarea
                                disabled
                                type="text"
                                name="userDescription"
                                value={userData.userDescription}
                                placeholder="Enter Your Description"
                                className="px-3 h-32 mx-[1.65rem] resize-none rounded-md text-black bg-blue-gray-200 placeholder:text-blue-gray-600 border-2 border-blue-gray-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Right side */}

                <div className=" w-[50%]">
                    <div className="flex flex-col pt-4">
                        {rightInputSpanInfo.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="gap-2 m-2 flex flex-col mx-[1.65rem]"
                                >
                                    <span>{item.spanText}</span>
                                    <input

                                        type={item.typeText}
                                        placeholder={item.placeholderText}
                                        name={item.nameText}
                                        value={input.name == 'file'? undefined : rightInputSpanInfo[item.nameText]}
                                        onChange={changeEventHandler}
                                        className=" w-[100%] h-8 px-3 rounded-md text-black file:border-none file:bg-blue-gray-200  bg-blue-gray-200 placeholder:text-blue-gray-600  hover:translate-x-1 hover:translate-y-1  focus:outline-none border-2 border-blue-gray-700 focus:border-none focus:ring-2 focus:ring-blue-300  focus:shadow-[0_0_5px_5px_rgba(59,130,246)] transition"

                                    />
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-col justify-evenly mt-2">
                        <div className="gap-2 flex flex-col">
                            <span className="mx-[1.65rem]">Edit User Description</span>
                            <textarea
                                type="text"
                                name="userDescription"
                                value={input.name}
                                onChange={changeEventHandler}
                                placeholder="Enter Your Description"
                                className="px-3 h-32 mx-[1.65rem] resize-none rounded-md text-black bg-blue-gray-200 placeholder:text-blue-gray-600 hover:translate-x-1 hover:translate-y-1 focus:outline-none border-2 border-blue-gray-700 focus:border-none focus:ring-2 focus:ring-light-blue-300  focus:shadow-[0_0_5px_5px_rgba(59,130,246)] "
                            />
                        </div>
                    </div>
                    <div className="flex justify-end pr-14">
                        {loading ? (
                            <Button
                                className="relative top-2 left-[1.65rem] text-cyan-50 text-xl"
                                text={<Loader2 className="animate-spin" />}
                            />
                        ) : (
                            <Button
                                type="submit"
                                onClick={submitdata}
                                className="relative mt-4 left-[1.65rem] text-cyan-50 text-xl"
                                text="Submit"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailForm;

