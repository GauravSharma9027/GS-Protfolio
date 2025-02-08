import { useState } from "react";
import Button from "../components/button/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";


const EducationForm = () => {
    let url = import.meta.env.VITE_API_URL;
    const EducationInputInfo = [
        { headingText: "Starting & Passing Year", inputName: "startToPassYear", typeText: "text", placeholderText: "Enter Starting & Passing Year" },
        { headingText: "Course Name", inputName: "QualificationName", typeText: "text", placeholderText: "Enter Course Name" },
        { headingText: "Short Description", inputName: "QualificationShortDescription", typeText: "text", placeholderText: "Enter Short Description" },
    ]
    const [loading, setLoading] = useState(false);
    const [sendData, setSendData] = useState({
        startToPassYear: "",
        QualificationName: "",
        QualificationShortDescription: ""
    });
    const changeEventHandler = async (e) => {
            setSendData({ ...sendData, [e.target.name]: e.target.value })
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
        
    //     console.log("FormData content:");
    // for (let pair of formData.entries()) {
    //     console.log(pair[0] + ": " + pair[1]);
    // }

        await axios({
            method: "post",
            url: url+"/api/v1/fill/user/education",
            data: formData,
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            toast.success(res.data.message);
            setSendData({
                startToPassYear: "",
                QualificationName: "",
                QualificationShortDescription: ""
            });
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
                    {EducationInputInfo.map((item, index) => {
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
                                    value={item.typeText === "file" ? undefined : sendData[item.inputName]}
                                    // value={item.inputName} //### Bind value for text inputs, avoid for file inputs
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

export default EducationForm;


