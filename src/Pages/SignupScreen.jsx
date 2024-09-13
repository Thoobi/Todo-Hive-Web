import background from '../assets/gradient-mesh.png'
import logo from "../assets/Logo.svg"
import art1 from '../assets/Group.svg'
import profile from '../assets/Group7.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signupscreen = () => {
    const [hidePassword, setHidePassword] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [Confirmpassword, setConfirmPassword] = useState(true)
    const [formData, setformData] = useState({
        username: "",
        email: "",
        password: "",
        Confirmpassword: "",
    })
    const navigate = useNavigate()


    const finalData = {
        email: formData.email,
        username: formData.username,
        password: formData.password
    }

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

    const handleConfirmPasswordClick = () => {
        setConfirmPassword(!Confirmpassword)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (!finalData.email && !finalData.password || finalData.username) {
            await axios.post('https://todobackend-top5.onrender.com/api/register', finalData)
                .then(res => {
                    setLoading(false)
                    toast(res.data.message)
                    setTimeout(() => {
                        navigate("/Login")
                    }, 5000)
                })
                .catch(err => {
                    setLoading(false)
                    toast(err.response.data.message)
                    console.log(err);
                });
        }
    }

    return (
        <div id='him' className='flex flex-row justify-between w-full h-full font-urbanist bg-cover'>
            <ToastContainer position='top-right' />
            <div className='bg-cover w-[40%] max-lg:w-[35%] flex flex-col justify-center items-center max-md:hidden' style={{ backgroundImage: `url(${background})`, height: "100vh" }}>
                <img src={art1} alt="The logo for todohive" className='absolute top-0 left-0' />
                <img src={logo} alt="The logo for TodoHive" />
                <img src={art1} alt="The logo for todohive" className='absolute bottom-0 right-[60%] max-lg:right-[65%] scale-x-[-1]' />
            </div>

            <div className='flex flex-col justify-center items-center max-lg:w-[60%] max-lg:mx-auto w-[60%] max-md:w-[90%] max-md:mx-auto gap-5'>

                <img src={art1} alt=" the logo for the todo hive project" className='absolute top-0 right-0 scale-x-[-1] scale-y-[-1] lg:hidden md:hidden size-[120px] z-[0]' />
                <img src={logo} alt=" the logo for the todo hive project" className='lg:hidden md:hidden w-[95px] h-[19px] absolute top-[23px] left-[14.63px] z-[0]' />
                <img src={art1} alt=" the logo for the todo hive project" className='absolute bottom-0 left-0 lg:hidden md:hidden size-[129px] scale-y-[1] z-[-1]' />

                <h1 className='text-black text-3xl font-bold max-md:text-[24px] '>Sign up</h1>
                <img src={profile} alt="The profile svg" className='max-md:size-[100px]' />
                <form onSubmit={handleSubmit} className='flex flex-col w-[500px] max-md:w-full gap-5 max-md:gap-3'>
                    <input type="text" placeholder='Username' name='username' onChange={inputChange} value={FormData.username} required className='w-full h-[50px] ps-3 border-[1px] border-black rounded-md outline-none focus-within:border-[2px]' style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }} />
                    <label htmlFor="email">
                        <input type="email" name="email" placeholder='Email' onChange={inputChange} value={formData.email} required className='w-full h-[50px] ps-3 border-[1px] border-black rounded-md outline-none focus-within:border-[2px]' style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }} />
                    </label>

                    <div className={`flex flex-row w-full h-[50px] justify-start items-center border border-black focus-within:border-[2px] focus:border-black rounded-md gap-2`} style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}>
                        <input
                            type={hidePassword ? "password" : "text"}
                            name='password'
                            value={formData.password}
                            placeholder="Password"
                            required
                            onChange={inputChange} className='w-[90%] h-[80%] ps-3 focus:outline-none active:border-none bg-transparent' />
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

                    <div className='flex flex-row w-full h-[50px] justify-start items-center border border-black focus-within:border-[2px] focus:border-black rounded-md gap-2' >
                        <input
                            type={Confirmpassword ? "password" : "text"}
                            required
                            name='Confirmpassword'
                            onChange={inputChange}
                            value={formData.Confirmpassword}
                            placeholder="confirm Password" className='w-[90%] h-[80%] ps-3 focus:outline-none active:border-none bg-transparent' />
                        {Confirmpassword ? (
                            <FaRegEye
                                onClick={handleConfirmPasswordClick}
                                className="cursor-pointer"
                            />
                        ) : (
                            <FaRegEyeSlash
                                onClick={handleConfirmPasswordClick}
                                className="cursor-pointer"
                            />
                        )}
                    </div>

                    <button type='submit' className='w-full h-[50px] rounded text-white bg-black text-lg max-md:text-base max-md:font-semibold'
                        onSubmit={handleSubmit}
                    >
                        {isLoading ? <ClipLoader color='white' size={15} /> : "Sign Up"}
                    </button>
                </form>
                <Link className='w-[450px] max-md:w-full max-md:mt-[-5px]'>
                    <div className='flex flex-row justify-center items-center gap-3 w-full h-[45px] bg-slate-200 rounded'>
                        <FcGoogle size={'25px'} />
                        <h1 className='font-medium text-md'>Sign in with Google</h1>
                    </div>
                </Link>

                <p className='text-base max-md:text-sm z-10'>Already have an account? <Link to="/Login" className='underline font-bold max-md:text-base'>Sign in</Link></p>
            </div>
        </div>
    )
}

export default Signupscreen