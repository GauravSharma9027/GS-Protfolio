import { useState } from "react";
import axios from "axios";
import Button from "../components/button/Button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const UserDetailForm = () => {
    let url = import.meta.env.VITE_API_URL;
    const inputSpanInfo = [
        { spanText: "User Name", nameText: "username", typeText: "text", placeholderText: "Enter Your Name" },
        { spanText: "User Profession", nameText: "profession", typeText: "text", placeholderText: "Enter Your Profession" },
        { spanText: "Select Profile Photo", nameText: "profilePhoto", typeText: "file", placeholderText: "Enter Your Name" },
        { spanText: "Select REsume Photo", nameText: "resumePhoto", typeText: "file", placeholderText: "Enter Your Name" },
        { spanText: "Welcome Message", nameText: "welcomeMsg", typeText: "text", placeholderText: "Enter Welcome Message" },
        { spanText: "User E-mail", nameText: "email", typeText: "email", placeholderText: "Enter Your E-mail" },
        { spanText: "User Number", nameText: "number", typeText: "number", placeholderText: "Enter Your Number" },
        { spanText: "User WhatsApp Number ", nameText: "whatAppNumber", typeText: "number", placeholderText: "Enter Your WhatsApp Number" },
        { spanText: "User LinkedIn Link", nameText: "linkedin", typeText: "text", placeholderText: "Enter Your LinkedIn Link" },
        { spanText: "User HackerRank Link", nameText: "hackerRank", typeText: "text", placeholderText: "Enter Your HackerRank Link" },
        { spanText: "User LeetCode Link", nameText: "leetCode", typeText: "text", placeholderText: "Enter Your LeetCode Link" }
    ];
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
        linkedin: "",
        hackerRank: " ",
        leetCode: " ",
        userDescription: " "
    });

    const changeEventHandler = async (e) => {
        if (e.target.type === "file") {
            const file = e.target.files[0]; // Capture the file
            setInput({...input, [e.target.name]: file }); // Update the input state with the file
            console.log(input);
        } else {
            setInput({ ...input, [e.target.name]: e.target.value }); // For text inputs, handle normally
        }
    };

    const submitdata = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
    // Loop through input and append to formData
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
        // Log FormData to check what data is being sent to the backend
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ': ' + pair[1]);
        // }
        await axios({
            method: "post",
            data: formData,
            url: url+"/api/v1/fill/user/info",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            // withCredentials: false
        })
            .then((res) => {
                toast.success(res.data.message);
                navigate("/manageuser");
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    className: "bg-gradient-to-r from-red-500 via-red-300 to-red-500 bg-opacity-40 border-2 border-red-900 rounded-lg h-[10%]"
                })
                if (error.response.data.userCount === 1) {
                    navigate("/manageuser/edituser");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className=" w-[82.5%]">
            <div className="h-screen bg-blue-gray-500  font-bold relative  left-[21%] top-[15.9%]">
                <div className="flex flex-wrap pt-4">
                    {inputSpanInfo.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="w-[45.55%] gap-2 m-2 flex wa flex-col flex-shrink-0  mx-[1.65rem]"
                            >
                                <span>{item.spanText}</span>
                                <input
                                    type={item.typeText}
                                    placeholder={item.placeholderText}
                                    name={item.nameText}
                                    value={item.typeText === "file" ? undefined : inputSpanInfo[item.inputName]}
                                    onChange={changeEventHandler}
                                    className=" w-[100%] h-8 px-3 rounded-md text-black file:border-none file:bg-blue-gray-200  bg-blue-gray-200 placeholder:text-blue-gray-600  hover:translate-x-1 hover:translate-y-1  focus:outline-none border-2 border-blue-gray-700 focus:border-none focus:ring-2 focus:ring-blue-300  focus:shadow-[0_0_5px_5px_rgba(59,130,246)] transition"
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-col justify-evenly mt-6">
                    <div className="gap-2 flex flex-col">
                        <span className="mx-[1.65rem]">User Description</span>
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
                {loading ? (
                    <Button
                        className="relative top-4 left-[1.65rem] text-cyan-50 text-xl"
                        text={<Loader2 className="animate-spin" />}
                    />
                ) : (
                    <Button
                        type="submit"
                        onClick={submitdata}
                        className="relative top-4 left-[1.65rem] text-cyan-50 text-xl"
                        text="Submit"
                    />
                )}
            </div>
        </div>
    );
};

export default UserDetailForm;

