const Button = ({className,text="Click",type, onClick}) => {

    return (
        <>
                {/* <button type={type} onClick={onClick} className={`bg-green-400 cursor-pointer hover:border-2 hover:border-green-900 flex justify-center items-center h-10 w-32 rounded-lg ${className} active:bg-green-700 border-2 border-light-green-300 `}> {text} </button> */}
                <button type={type} onClick={onClick} className={`h-10 p-2 bg-green-400  font-semibold cursor-pointer hover:border-2 hover:border-green-900 flex justify-center items-center  ${className} active:bg-green-700 border-2 border-light-green-300 `}> {text} </button>
        </>
    )
}

export default Button;