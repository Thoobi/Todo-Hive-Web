import logo2 from '../assets/logo2.svg'
import profile from '../assets/Group7.png'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { GoProjectRoadmap, GoTasklist } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { IoBriefcaseOutline, IoTrashOutline, IoAddOutline } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import axios from 'axios'
import { useUser } from '../hooks/useUser';
import { toast } from 'react-toastify';

const HomeScreen = () => {
    const [checkedTaskId, setCheckedTaskId] = useState(false);
    const [taskData, setTaskData] = useState([])
    const [work, setWork] = useState(0)
    const [school, setSchool] = useState(0)
    const [other, setOther] = useState(0)
    const [userName, setUserName] = useState(null)
    const [userProfile, setUserProfile] = useState("")
    const [completed, setCompleted] = useState("")
    const { userId } = useUser();
    const { authToken } = useUser();


    const handleTaskClick = async (id) => {
        const taskId = id;
        setCheckedTaskId(taskId);
        try {
            const res = await axios.patch(`https://todobackend-top5.onrender.com/api/updateCompletedTask/${userId}/${taskId}`)
            console.log(res);
            setCompleted(res.data.task.completed);
            console.log(completed);
        } catch (err) {
            console.error("Error updating or deleting the task:", err);
        }
    };


    const handleDelete = (taskId) => {
        axios.delete(`https://todobackend-top5.onrender.com/api/deleteTask/${userId}/${taskId}`)
            .catch(err => {
                console.log(err);
            })
    }

    const fetchUser = async () => {
        const token = authToken
        try {
            const response = await axios.get(`https://todobackend-top5.onrender.com/api/getuser/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserName(response.data.user.username)
            setUserProfile(response.data.user.avatar)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchWorkCategory = async () => {
        const token = authToken
        try {
            const response = await axios.get(`https://todobackend-top5.onrender.com/api/get-user-taskCategoryId/${userId}/Work`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setWork(response.data.tasks.length)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchEducationCategory = async () => {
        const token = authToken
        try {
            const response = await axios.get(`https://todobackend-top5.onrender.com/api/get-user-taskCategoryId/${userId}/Education`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setSchool(response.data.tasks.length)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchOtherCategory = async () => {
        const token = authToken
        try {
            const response = await axios.get(`https://todobackend-top5.onrender.com/api/get-user-taskCategoryId/${userId}/Others`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            setOther(response.data.tasks.length)

        } catch (error) {
            console.log(error);
        }
    }

    const fetchTasks = async () => {
        try {
            axios.get(`https://todobackend-top5.onrender.com/api/get-user-taskbyuserId/${userId}`)
                .then(res => {
                    const tasks = res.data.tasks; // Access tasks
                    setTaskData(tasks);
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (userId) {
            fetchTasks();
            fetchUser();
            fetchWorkCategory();
            fetchEducationCategory();
            fetchOtherCategory();
        }
    }, [handleDelete]);

    useEffect(() => {
        if (userId) {
            fetchTasks();
            fetchUser();
            fetchWorkCategory();
            fetchEducationCategory();
            fetchOtherCategory();
        }
    }, []);

    return (
        <>
            <div className="bg-contain w-full h-full bg-no-repeat font-urbanist">
                <img src={logo2} alt="" className='absolute top-0 left-0 h-[150px] max-md:h-[84.5px] z-[-10]' />
                <div className='w-[90%] mx-auto flex flex-row justify-between items-center py-6 z-0'>
                    <div className='w-[70%] cursor-pointer'>
                        <h2 className='text-2xl font-bold max-md:text-lg'>Hello {userName},</h2>
                        <p className='font-normal max-md:text-sm max-md:font-light'>{taskData.length === 0 ? "You dont have work to do today" : "You have work today"}
                        </p>
                    </div>
                    <Link to="/profile">
                        {userProfile ?
                            <img src={userProfile} alt="" className='size-[60px]  max-md:size-[50px] cursor-pointer border-2 rounded-[50%] border-gray-700' /> : <img src={profile} alt="" className='size-[60px]  max-md:size-[50px] cursor-pointer border-2 rounded-[50%] border-gray-700' />}
                    </Link>
                </div>

                <div className='w-[90%] mx-auto grid grid-cols-4 grid-rows-1 mb-5 gap-4 py-2 rounded-xl max-lg:grid-cols-2 max-lg:grid-rows-2'>
                    <div className='h-[180px] max-md:h-[90px] max-lg:h-[130px]  bg-[#B4C4FF] text-center rounded-xl p-4 flex justify-center items-start flex-col gap-6 max-md:gap-3'>
                        <div className='bg-white rounded-full size-[50px] max-md:size-[35px] flex justify-center items-center py-4 px-2'>
                            <GoProjectRoadmap className='size-[20px] max-md:size-5' />
                        </div>
                        <div className='flex flex-row w-full justify-between'>
                            <h2 className='text-2xl font-bold max-md:text-xl'>My Tasks</h2>
                            <h2 className='text-2xl font-bold max-md:text-lg'>{taskData.length}</h2>
                        </div>
                    </div>
                    <div className='h-[180px] max-md:h-[90px] max-lg:h-[130px]  bg-[#CFF3E9] text-center rounded-xl p-4 flex justify-center items-start flex-col gap-6 max-md:gap-3'>
                        <div className='bg-white rounded-full size-[50px] flex justify-center items-center max-md:size-[35px] py-4 px-2'>
                            <IoBriefcaseOutline className='size-[20px] max-md:size-7' />
                        </div>
                        <div className='flex flex-row w-full justify-between'>
                            <h2 className='text-2xl font-bold max-md:text-xl'>Work</h2>
                            <h2 className='text-2xl font-bold max-md:text-lg'>{work}</h2>
                        </div>
                    </div>
                    <div className='h-[180px] max-md:h-[90px] max-lg:h-[130px]  bg-[#9747FF] bg-opacity-[60%] text-center rounded-xl p-4 flex justify-center items-start flex-col gap-6 max-md:gap-3'>
                        <div className='bg-white rounded-full size-[50px] flex justify-center items-center max-md:size-[35px] py-4 px-2'>
                            <GoTasklist className='size-[20px] max-md:size-5' />
                        </div>
                        <div className='flex flex-row w-full justify-between'>
                            <h2 className='text-2xl font-bold max-md:text-xl'>Education</h2>
                            <h2 className='text-2xl font-bold max-md:text-lg'>{school}</h2>
                        </div>
                    </div>
                    <div className='h-[180px] max-md:h-[90px] max-lg:h-[130px]  bg-[#EDBE7D] bg-opacity-[60%] text-center rounded-xl p-5 flex justify-center items-start flex-col gap-6 max-md:gap-3'>
                        <div className='bg-white rounded-full size-[50px] flex justify-center items-center max-md:size-[35px] py-4 px-2'>
                            <MdOutlineLocalGroceryStore className='size-[20px]' />
                        </div>
                        <div className='flex flex-row w-full justify-between'>
                            <h2 className='text-2xl font-bold max-md:text-xl'>Others</h2>
                            <h2 className='text-2xl font-bold max-md:text-lg'>{other}</h2>
                        </div>
                    </div>
                </div>

                <div className='w-[90%] mx-auto gap-y-5 my-8'>
                    <h1 className='text-xl font-semibold max-md:text-lg'>Today&apos;s Task</h1>
                    {taskData.length === 0 ? (
                        <div className={`mt-[10px] h-32 flex flex-row justify-between items-center rounded-2xl px-10 max-md:px-3 max-md:h-[110px] w-full cursor-pointer text-center`}>
                            <p className="text-2xl max-lg:text-7xl max-md:text-lg font-urbanist text-center text-black font-bold w-full">No Task available. Create Task</p>
                        </div>) :
                        (<div className='flex flex-col'>
                            {taskData.map((item) => (
                                <div
                                    key={item._id}
                                    className={`mt-[10px] border-[2px] border-zinc-300 h-32 flex flex-row justify-between items-center rounded-2xl px-10 max-md:px-3 max-md:h-[110px] w-full cursor-pointer  ${checkedTaskId === item._id ? 'bg-green-200' : ''}`}
                                >
                                    <span
                                        onClick={() => {
                                            handleTaskClick(item._id);
                                        }}
                                        className={`w-[5%] max-lg:w-[12%] max-md:w-[12%] text-zinc-500 flex justify-center items-center`}
                                    >
                                        {checkedTaskId === item._id ? (
                                            <FaCircleCheck className={`size-[40px] max-lg:size-[35px] text-green-500 border-[6px] max-lg:border-[6px] max-md:border-[6px] rounded-full border-green-300`} />
                                        ) : (
                                            <FaRegCircle
                                                className='size-[26px] max-md:size-[26px] text-zinc-500' />
                                        )}
                                    </span>
                                    <div className='w-[50%] max-md:w-[50%] flex flex-col justify-center'>
                                        <h1 className='text-2xl font-semibold max-md:text-xl max-md:overflow-hidden whitespace-nowrap overflow-hidden text-ellipsis'>
                                            {item.title}
                                        </h1>
                                        <p className='text-lg font-bold text-zinc-600 max-md:text-sm'>
                                            {item.startTime} to {item.endTime}
                                        </p>
                                    </div>
                                    <div className='flex flex-row justify-center gap-4 w-[10%] max-md:gap-3 max-md:w-[25%]'>
                                        <Link to={`/EditTask/${item._id}`} >
                                            <CiEdit className='text-zinc-600 size-[30px] cursor-pointer max-md:size-[27px]' />
                                        </Link>

                                        <IoTrashOutline
                                            className={`text-red-600 size-[25px] cursor-pointer max-md:size-[25px]`} onClick={() => handleDelete(item._id)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        )}
                </div>


                <div className='flex justify-center items-center'>
                    <Link className=" fixed bottom-1 max-lg:bottom-8 flex justify-center items-center text-center z-10" to={"/CreateTask"}>
                        <button className='h-[55px] max-md:h-[50px] max-md:w-[50px] w-[150px] max-lg:w-[250px] mx-auto rounded-lg flex justify-center items-center text-center max-md:rounded-full bg-[#9747FF] text-white max-md:text-lg text-lg font-medium max-md:left-[405] max-md:fixed max-md:bottom-7 md:bottom-10'>
                            <h1 className='max-md:hidden'>Create Task</h1>
                            <IoAddOutline className='lg:hidden md:hidden max-md:size-[30px]' />
                        </button>
                    </Link>
                </div>
            </div >
        </>
    )
}

export default HomeScreen
