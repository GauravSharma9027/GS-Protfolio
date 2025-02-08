import Button from "../components/buttons/Button"

const Setting = () => {
    const goToAdminLoginPage = ()=>{
        let adminUrl = import.meta.env.VITE_ADMIN_URL;
        window.open(adminUrl + "login",'_blank')
    }
    return (
        <div className="h-screen  ml-72">
            <div className="w-full h-full flex justify-center items-center"><Button text="login for dashboard" onClick={goToAdminLoginPage}/></div>
        </div>
    )
}

export default Setting
