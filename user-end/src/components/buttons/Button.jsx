const Button = ({ className, text = "Click", type, onClick }) => {

    return (
        <>
            <button type={type} onClick={onClick} className={`lg:h-10 p-2 bg-green-400  font-semibold cursor-pointer hover:border-2 hover:border-green-900 flex justify-center items-center  ${className} active:bg-green-700 border-2 border-light-green-300 `}> {text} </button>
        </>
    )
}


export default Button;