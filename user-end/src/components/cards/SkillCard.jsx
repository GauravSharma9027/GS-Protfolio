const SkillCard = ({className, src, name, shortDescription="Description...", percentage}) => {
    return (
        <div className={`${className} sm:w-full md:w-[41vw] MD:w-[41vw] lg:w-[32vw] xl:w-[33vw] 2xl:w-[17rem] sm:mx-2 2xl:mx-0  my-8 bg-[rgb(37,35,42)] rounded-lg ring-4 ring-[rgb(57,54,62)] cursor-default  transition-transform duration-500 hover:scale-105`}>
            <div className="rounded-lg">
                <img src={src} alt="" className="bg-white w-20 h-20 rounded-full relative -top-10 left-8 ring-4 ring-[rgb(57,54,62)]"/>
                <div className="text-orange-400 relative -top-8 text-2xl font-semibold mx-3 mt-1 flex justify-between">
                    <h1 className="text-2xl font-semibold">{name}</h1>
                    <span>{percentage}%</span>
                </div>
                <meter value={percentage} min="0" max="100" className="px-3 mt-2 w-full h-8 relative -top-8"></meter>
                <p className="h-32 relative -top-7 mx-3 break-words overflow-hidden font-serif">{shortDescription}</p>
            </div>
        </div>
    )
}

export default SkillCard;

// const SkillCard = ({ className, src, name, shortDescription = "Description...", percentage }) => {
//     return (
//         <div className={`${className} w-full sm:w-[90%] md:w-[45%] lg:w-72 xl:w-80 2xl:w-72 mx-auto sm:mx-2 2xl:mx-0 my-6 bg-[rgb(37,35,42)] rounded-lg ring-4 ring-[rgb(57,54,62)] cursor-default transition-transform duration-500 hover:scale-105`}>            
//             <div className="rounded-lg p-4">
//                 <div className="flex items-center gap-4">
//                     <img src={src} alt={name} className="bg-white w-16 h-16 sm:w-20 sm:h-20 rounded-full ring-4 ring-[rgb(57,54,62)]"/>
//                     <div className="flex flex-col flex-grow">
//                         <h1 className="text-orange-400 text-xl sm:text-2xl font-semibold">{name}</h1>
//                         <span className="text-orange-400 text-lg sm:text-xl font-semibold">{percentage}%</span>
//                     </div>
//                 </div>
//                 <meter value={percentage} min="0" max="100" className="w-full h-4 mt-3"></meter>
//                 <p className="text-sm sm:text-base mt-3 break-words overflow-hidden font-serif h-24 sm:h-32">{shortDescription}</p>
//             </div>
//         </div>
//     );
// };

// export default SkillCard;
