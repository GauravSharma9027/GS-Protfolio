const EducationCard = ({year, courseName, shortDescription}) => {
    return (
        <div className="bg-[rgb(37,35,42)] px-3 2xl:mb-8 w-full xl:w-[35vw]  2xl:w-[45%] p-2 sm:m-2 lg:m-0 rounded-lg ring-4 ring-[rgb(57,54,62)] cursor-default  transition-transform duration-300 hover:scale-105 ">
            <div className="text-2xl font-serif">{year}</div>
            <div className="text-2xl font-bold text-orange-400">{courseName}</div>
            <div className="font-serif mt-1 lg:h-20 sm:h-24 break-words overflow-hidden">{shortDescription}</div>
        </div>
    )
}

export default EducationCard