import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import Button from "./button/Button";


const ProjectForm = () => {
    const projectInputInfo = [
        { headingText: "Project Title", inputName: "projectTitle", typeText: "text", placeholderText: "Enter Your Project Title" },
        { headingText: "Project Image", inputName: "projectImage", typeText: "file", className: "pt-2" },
        { headingText: "Project Section  Hero Image", inputName: "heroImage", typeText: "file", className: "pt-2" },
        { headingText: "Short Description", inputName: "projectShortDescription", typeText: "text", placeholderText: "Short Description" },
    ]
    const [loading, setLoading] = useState(false);
    const [sendData, setSendData] = useState({
        projectTitle: "",
        projectImage: null,
        heroImage: null,
        projectShortDescription: ""
    });
    const changeEventHandler = async (e) => {
        // e.preventDefault();
        if (e.target.type === "file") {
            const file = e.target.files[0];
            setSendData({ ...sendData, [e.target.name]: file });
        } else {
            setSendData({ ...sendData, [e.target.name]: e.target.value })
        }
    };
    const formData = new FormData();
    const submitData = async (e) => {
        setLoading(true);
        e.preventDefault();
        for (const key in sendData) {
            if (sendData[key]) {
                formData.append(key, sendData[key]);
            }
        }
        await axios({
            method: "post",
            url: "http://localhost:8000/api/v1/fill/user/project",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((res) => {
            toast.success(res.data.message);
            setSendData({
                projectTitle: "",
                projectImage: null,
                projectShortDescription: "",
            });
            document.querySelector("input[type='file']").value = "";
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
                    {projectInputInfo.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className=" m-8 h-20 flex flex-col justify-between"
                            >
                                <h1 className="text-xl">{item.headingText}</h1>
                                <input
                                maxLength="160"
                                    type={item.typeText}
                                    name={item.inputName}
                                    // value={sendData.name}
                                    value={item.typeText === "file" ? undefined : sendData[item.inputName]} //### Bind value for text inputs, avoid for file inputs
                                    placeholder={item.placeholderText}
                                    onChange={changeEventHandler}
                                    className={`${item.className} w-[100%] h-11 px-3 rounded-md text-black file:border-none file:bg-blue-gray-200  bg-blue-gray-200 placeholder:text-blue-gray-600  hover:translate-x-1 hover:translate-y-1  focus:outline-none border-2 border-blue-gray-700 focus:border-none focus:ring-2 focus:ring-blue-300  focus:shadow-[0_0_5px_5px_rgba(59,130,246)] transition`}
                                />
                            </div>
                        );
                    })}
                    <div className="flex justify-center items-end h-24">
                        {
                            loading ? (
                                <Button className="text-cyan-50" onClick={submitData} text={<Loader2 className="animate-spin"></Loader2>} />
                            ) :
                                <Button className="text-cyan-50" onClick={submitData} text={<strong>Submit</strong>} />
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProjectForm;
