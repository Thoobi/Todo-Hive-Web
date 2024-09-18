import { useState } from 'react'
import logo2 from '../assets/logo2.svg'
import { IoMdArrowBack } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import { useUser } from '../hooks/useUser';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateTask = () => {
    const { userId } = useUser();
    const navigate = useNavigate()
    const [taskData, setTaskData] = useState({
        title: "",
        catergory: "",
        date: "",
        startTime: "",
        endTime: "",
        priority: "",
        description: "",
    });


    const inputChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value
        });
    }

    const handleStartTime = (e) => {
        e.preventDefault()
        let { value } = e.target
        setTaskData((prevTask) => ({
            ...prevTask,
            startTime: value,
        }));
    }

    const handleEndTime = (e) => {
        e.preventDefault()
        let { value } = e.target
        setTaskData((prevTask) => ({
            ...prevTask,
            endTime: value,
        }));
    }

    const formatTimeWithAmPm = (time) => {
        let [hours, minutes] = time.split(':').map(Number);
        let amPm = 'AM';

        if (hours >= 12) {
            amPm = 'PM';
            if (hours > 12) {
                hours -= 12;
            }
        } else if (hours === 0) {
            hours = 12;
        }

        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${amPm}`;
    };

    const handleCategory = (type) => {
        const selectedCategory = type;
        setTaskData({
            ...taskData,
            catergory: selectedCategory,
        });
    };

    const handleSelect = (level) => {
        setTaskData({
            ...taskData,
            priority: level
        })
    };

    const finalData = {
        title: taskData.title,
        catergory: taskData.catergory,
        dateAndTime: taskData.date,
        startTime: taskData.startTime,
        endTime: taskData.endTime,
        description: taskData.description,
        priority: taskData.priority
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formattedTaskData = {
            ...finalData,
            startTime: formatTimeWithAmPm(taskData.startTime),
            endTime: formatTimeWithAmPm(taskData.endTime),
        };
        try {
            axios.post(`https://todobackend-top5.onrender.com/api/createTask/${userId}`, formattedTaskData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        } catch (error) {
            console.log(error.data.message);
        }
        setTaskData({
            title: "",
            category: "",
            date: "",
            startTime: "",
            endTime: "",
            priority: "",
            description: "",
        })
        toast.success("Task created")
        setTimeout(() => {
            navigate("/homescreen")
        }, 1000)
    }

    return (
        <div className='w-[90%] max-md:w-[95%] mx-auto font-urbanist my-5'>
            <img src={logo2} alt="" className='absolute top-0 left-0 h-[150px] z-0 max-md:h-[84.5px]' />
            <ToastContainer position='top-right' className="font-urbanist text-black" />
            <Link to={"/Homescreen"}>
                <IoMdArrowBack className="absolute top-6 left-10  max-md:left-7 size-7 max-md:size-6" />
            </Link>
            <div >
                <h1 className='font-semibold text-3xl max-md:text-xl text-center'>Create Task</h1>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-start w-[90%] mx-auto mt-[30px] gap-y-4 max-md:gap-y-4 mb-2'>
                <div className='flex flex-col gap-y-3 w-full'>
                    <label htmlFor="Taskname" className='text-xl font-semibold max-md:text-xl'>Task Name</label>
                    <input type="text"
                        onChange={inputChange}
                        value={taskData.title}
                        name='title'
                        placeholder='Enter task title'
                        required
                        className='border-2 text-lg border-zinc-300 w-[60%] h-14 rounded-lg px-3 font-medium max-md:w-full max-md:h-[50px] ' />
                </div>

                <div className='flex flex-col gap-y-2'>
                    <label htmlFor="Category" className='text-xl font-semibold max-md:text-xl pb-2'>Category</label>
                    <div className='grid grid-cols-3 grid-rows-1 max-lg:grid-cols-3 max-l:grid-cols-1 max-md:grid-cols-2 max-md:grid-rows-2 max-lg:gap-y-2 gap-x-10 max-lg:gap-x-6 max-md:gap-x-2 w-full'>

                        {['Work', 'Education', 'Others'].map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                className={`text-lg font-medium h-[50px] max-md:h-[45px] max-md:w-[125px] w-[130px] rounded-lg ${taskData.catergory === cat ? 'bg-purple-700 text-white' : 'bg-purple-300 text-black'}`}
                                onClick={() => handleCategory(cat)}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='flex flex-col w-full gap-y-3'>
                    <div className='flex flex-col gap-y-2'>
                        <label htmlFor="date" className='text-xl font-semibold max-md:text-xl'>Date & Time</label>
                        <input type="date" className='border-2 border-zinc-300 w-[60%] max-md:w-full h-14 rounded-lg px-3 max-md:h-12 text-lg font-medium'
                            onChange={inputChange}
                            value={taskData.date}
                            name='date'
                            required
                        />
                    </div>

                    <div className='flex flex-row w-full'>
                        <div className='flex flex-col gap-y-2 gap-x-2 w-[35%] max-md:w-full'>
                            <label htmlFor="Start time" className='text-xl font-semibold max-md:text-xl'>Start time</label>
                            <input type="time" className='border-2 text-lg font-medium  border-zinc-300 w-[70%] max-md:w-[95%] max-md:h-12 h-14 rounded-lg px-3 max-md:text-lg'
                                onChange={handleStartTime}
                                value={taskData.startTime}
                                name='startTime'
                                required />
                        </div>
                        <div className='flex flex-col gap-y-2 w-[35%] max-md:w-full'>
                            <label htmlFor="End time" className='text-xl font-semibold max-md:text-xl'>End time</label>
                            <input type="time"
                                onChange={handleEndTime}
                                value={taskData.endTime}
                                name='endTime'
                                required
                                className='border-2 text-lg font-medium border-zinc-300 w-[70%] max-md:w-[95%] max-md:h-12 h-14 rounded-lg px-3 max-md:text-lg' />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col max-md:gap-y-3'>
                    <label htmlFor="priority" className='text-xl font-semibold max-md:text-xl pb-2'>Priority</label>
                    <div className=" grid grid-cols-3 max-lg:grid-cols-3 max-lg:grid-rows-1 grid-rows-1 max-md:grid-cols-2 max-md:grid-rows-2 max-md:gap-y-2 max-md:gap-x-5 gap-x-10 w-[90%]">
                        {['Low', 'Medium', 'High'].map((level) => (
                            <button
                                key={level}
                                type="button"
                                className={`text-lg font-medium h-[50px] w-[130px] max-md:h-[45px] max-md:w-[125px] rounded-lg ${taskData.priority === level ? 'bg-purple-700 text-white' : 'bg-purple-300 text-black'}`}
                                onClick={() => handleSelect(level)}
                            >
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='flex flex-col w-full'>
                    <label htmlFor="description" className='text-xl font-semibold max-md:text-xl'>Description</label>
                    <textarea placeholder='Research design path'
                        onChange={inputChange}
                        value={taskData.description}
                        name='description'
                        className='border-2 border-zinc-400 w-[50%] max-lg:w-[70%] max-md:w-full h-24 p-3 rounded-lg max-md:p-2 max-md:text-base text-lg font-medium'></textarea>
                </div>

                <button type='submit' className='text-lg font-medium h-12 w-[160px] max-md:w-[140px] bg-purple-500 text-white hover:bg-purple-700 rounded-lg' >
                    Create Task
                </button>
            </form >
        </div >
    )
}

export default CreateTask