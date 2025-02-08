import { Download } from "lucide-react";
import { NavLink } from "react-router-dom";
import { saveAs } from "file-saver";
const DownloadButton = ({ className, text = "Download", href}) => {
    
        // const handleDownload=(e)=>{
        //     e.preventDefault(); // Default navigation behavior ko prevent karein
        //     // const link = document.createElement('a');
        //     // link.href = href;
        //     // link.download = "Gaurav sharma Resume";// Download hone waale file ka naam(jo user chahata hai)
        //     // link.click();
        // }

        const handleDownload=(e)=>{
            e.preventDefault(); // Default navigation behavior ko prevent karein
            saveAs(href,"GauravSharma_Resume");
        }
    return (
        <div>
            <NavLink
                onClick={handleDownload}
                className={`w-48 lg:h-12 mx-4  cursor-pointer ring-2  ring-white bg-green-500  flex lg:text-3xl font-semibold  gap-2 justify-center items-center rounded-3xl transform transition-transform duration-500 active:scale-125  ${className}`}
            >
                {text} <Download />
            </NavLink>
        </div>
    );
};

export default DownloadButton;
