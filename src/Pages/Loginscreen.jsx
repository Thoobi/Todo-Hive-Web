import background from '../assets/gradient-mesh.png'
import { useState, useEffect } from 'react'
import logo from "../assets/Logo.svg"
import art1 from '../assets/Group.svg'
import { Link } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { ClipLoader } from 'react-spinners'
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";
import { useUser } from '../hooks/useUser'

const Loginscreen = () => {
    const { handleLogin } = useUser()
    const { loading } = useUser()
    const { message } = useUser()
    const { errorMessage } = useUser()
    const { clearMessage } = useUser()
    const [hidePassword, setHidePassword] = useState(true)
    const [formData, setformData] = useState({
        email: "",
        password: "",
    })

    const inputChange = (e) => {
        const { name, value } = e.target;
        setformData({
            ...formData,
            [name]: value,
        });
    }

    const handlePasswordClick = () => {
        setHidePassword(!hidePassword)
    }

    const finalData = {
        email: formData.email,
        password: formData.password
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(finalData);
    };

    useEffect(() => {
        if (message) {
            toast.success(message);
            clearMessage();
        }

        if (errorMessage) {
            toast.error(errorMessage);
            clearMessage();  // Clear the error message after showing
        }
    }, [message, errorMessage, clearMessage]);

    return (
        <div id="him" className='flex flex-row justify-between h-full w-full font-urbanist max-md:bg-cover' >
            <ToastContainer position='top-right font-urbanist' />
            <div className='bg-cover w-[40%] max-lg:w-[35%] flex flex-col justify-center items-center max-md:hidden' style={{ backgroundImage: `url(${background})`, height: "100vh" }}>
                <img src={art1} alt=" the logo for the todo hive project" className='absolute top-0 left-0' />
                <img src={logo} alt=" the logo for the todo hive project" />
                <img src={art1} alt=" the logo for the todo hive project" className='absolute bottom-0 right-[60%] max-lg:right-[65%] scale-x-[-1]' />
            </div>

            <div id='login' className='flex flex-col justify-center items-center max-md:w-full max-lg:w-[65%] w-[60%] gap-5'>

                <img src={art1} alt=" the logo for the todo hive project" className='absolute top-0 left-0 lg:hidden md:hidden size-[120px] z-[0]' />
                <img src={logo} alt=" the logo for the todo hive project" className='lg:hidden md:hidden w-[95px] h-[19px] absolute top-[23px] left-[20px] z-10' />
                <img src={art1} alt=" the logo for the todo hive project" className='absolute bottom-0 right-0 lg:hidden md:hidden size-[120px] z-[0] scale-y-[-1]' />

                <h1 className='text-black text-3xl font-bold max-md:text-[26px]'>Welcome Back!</h1>
                <form onSubmit={handleSubmit} className='flex flex-col w-[500px] gap-5 max-md:w-[90%] max-md:mx-auto'>
                    <input type="text"
                        onChange={inputChange}
                        name='email'
                        placeholder='Email'
                        value={formData.email}
                        className='w-full h-[50px] ps-3 border border-black rounded-md outline-none focus-within:border-[2px]'
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }} />

                    <div className='flex flex-row w-full h-[50px] justify-start items-center border border-black focus-within:border-[2px] focus:borde-black rounded-md gap-2' style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}>
                        <input
                            type={hidePassword ? "password" : "text"}
                            name='password'
                            value={formData.password}
                            placeholder="Password"
                            onChange={inputChange}
                            className='w-[90%] h-[80%] ps-3 focus:outline-none active:border-none max-md:bg-transparent max-md:focus:outline-none' />
                        {hidePassword ? (
                            <FaRegEye
                                onClick={handlePasswordClick}
                                className="cursor-pointer"
                            />
                        ) : (
                            <FaRegEyeSlash
                                onClick={handlePasswordClick}
                                className="cursor-pointer"
                            />
                        )}
                    </div>


                    <button className='w-full h-[50px] rounded text-white bg-black text-lg max-md:text-base max-md:font-semibold' type='submit' disabled={loading}>
                        {loading ? <ClipLoader color='white' size={15} /> : "Login"}
                    </button>
                </form>
                <Link className='w-[450px] max-md:w-full max-md:mx-auto'>
                    <div className='flex flex-row justify-center items-center gap-3 w-full max-md:w-[90%] max-md:mx-auto h-[45px] bg-slate-200 rounded'>
                        <FcGoogle size={'25px'} />
                        <p className='font-medium text-md'>Sign in with Google</p>
                    </div>
                </Link>

                <p className='text-base max-md:text-sm'>Don&apos;t have an account? <Link to='/Signup' className='underline font-bold max-md:text-base'>Sign up</Link></p>
            </div>
        </div>
    )
}

export default Loginscreen