import logo2 from '../assets/logo2.svg'
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import axios from 'axios';


function TaskEdit() {
    const { userId } = useUser()
    const navigate = useNavigate()
    const { id } = useParams();
    console.log(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchTask = async () => {
        try {
            const response = await axios.get(`https://todobackend-top5.onrender.com/api/get-user-taskbyuserId/${userId}`);
            const tasks = response.data.tasks; // Assuming tasks are in response.data.tasks

            // Find the task that matches the ID
            const matchedTask = tasks.find(task => task._id === id);

            if (matchedTask) {
                console.log("Matched Task:", matchedTask); // Log the matched task
                setTaskData(matchedTask); // Set the matched task in state
            } else {
                console.log(`No task found with id: ${id}`);
            }
        } catch (err) {
            console.error("Error fetching tasks:", err.message);
        }
    };

    useEffect(() => {
        fetchTask();
    }, [id]);

    const [taskData, setTaskData] = useState({
        title: "",
        catergory: "",
        DateandTime: "",
        startTime: "",
        endTime: "",
        priority: '',
        description: "",
    });


    console.log(taskData);

    const handleCategory = type => {
        const selectedCategory = type;
        setTaskData({
            ...taskData,
            catergory: selectedCategory,
        })
    };

    const handleSelect = (level) => {
        setTaskData((prevTask) => ({
            ...prevTask,
            priority: level
        }));
    };

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value
        });
    };

    const convertTo24HourFormat = (time12h) => {
        const [time, modifier] = time12h.split(' ');

        let [hours, minutes] = time.split(':');

        if (hours === '12') {
            hours = '00';
        }

        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }

        return `${hours}:${minutes}`;
    };

    const handleName = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value
        });
    };

    const inputChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value
        });
    }

    const finalData = {
        title: taskData.title,
        catergory: taskData.catergory,
        DateandTime: taskData.date,
        startTime: taskData.startTime,
        endTime: taskData.endTime,
        description: taskData.description,
        priority: taskData.priority
    }
    console.log(finalData);

    const convertTo12HourFormat = (time24h) => {
        let [hours, minutes] = time24h.split(':');
        const modifier = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        hours = hours % 12 || 12; // If hours = 0 or 12, set to 12
        return `${hours}:${minutes} ${modifier}`;
    };

    const formattedTaskData = {
        ...finalData,
        DateandTime: taskData.date,
        startTime: convertTo24HourFormat(taskData.startTime),
        endTime: convertTo24HourFormat(taskData.endTime),
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const taskId = id
        Object.keys(finalData).reduce((acc, key) => {
            // Compare against taskData (the original fetched data)
            if (finalData[key] !== taskData[key]) {
                acc[key] = finalData[key];  // Add only modified fields
            }
            return acc;
        }, {});

        if (formattedTaskData.startTime) {
            formattedTaskData.startTime = convertTo12HourFormat(formattedTaskData.startTime);
        }
        if (formattedTaskData.endTime) {
            formattedTaskData.endTime = convertTo12HourFormat(formattedTaskData.endTime);
        }
        console.log(formattedTaskData);

        await axios.patch(`https://todobackend-top5.onrender.com/api/editTask/${userId}/${taskId}`, formattedTaskData)
            .then(res => {
                console.log(res);
                setTimeout(() => {
                    console.log(formattedTaskData);
                    navigate("/HomeScreen")
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className='w-[90%] max-md:w-[95%] mx-auto font-urbanist my-5'>
            <img src={logo2} alt="" className='absolute top-0 left-0 h-[150px] z-0 max-md:h-[84.5px]' />

            <Link to={"/Homescreen"}>
                <IoMdArrowBack className="absolute top-6 left-10  max-md:left-7 size-7 max-md:size-6" />
            </Link>
            <div>
                <h1 className='font-semibold text-2xl max-md:text-xl text-center'>Edit Task</h1>
            </div>

            <form onSubmit={handleSave} className='flex flex-col justify-center items-start w-[90%] mx-auto mt-[30px] gap-y-4 max-md:gap-y-4 mb-2'>
                <div className='flex flex-col gap-y-3 w-full'>
                    <label htmlFor="Taskname" className='text-xl font-semibold max-md:text-xl'>Task Name</label>
                    <input type="text"
                        name="title"
                        onChange={handleName}
                        value={taskData.title || ""}
                        placeholder='Enter title'
                        className='border-2 text-lg border-zinc-300 w-[60%] h-14 rounded-lg px-3 font-medium max-md:w-full max-md:h-[50px]' />
                </div>

                <div className='flex flex-col gap-y-2'>
                    <label htmlFor="Category" className='text-xl font-semibold max-md:text-xl'>Category</label>
                    <div className='grid grid-cols-4 grid-rows-1 max-lg:grid-cols-2 max-lg:grid-rows-2 max-lg:gap-y-3 gap-x-10 max-md:gap-x-2 w-full'>
                        {['Work', 'Education', 'Others'].map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                className={`text-lg font-medium h-[50px] w-[130px] max-md:h-[45px] max-md:w-[125px] rounded-lg ${taskData.catergory === cat ? 'bg-purple-700 text-white' : 'bg-purple-300 text-black'}`}
                                onClick={() => handleCategory(cat)}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='flex flex-col w-full gap-y-3'>
                    <div className='flex flex-col gap-y-2'>
                        <label htmlFor="date" className='text-xl font-semibold max-md:text-xl'>Date</label>
                        <input
                            name="DateandTime"
                            type="date" onChange={inputChange}
                            value={taskData.DateandTime || ""} className='text-lg border-2 border-zinc-300 w-[40%] max-md:w-full h-14 rounded-lg px-3 max-md:h-12 font-medium' />
                    </div>

                    <div className='flex flex-row w-full'>
                        <div className='flex flex-col gap-y-2 gap-x-2 w-[20%] max-lg:w-[45%] max-md:w-full'>
                            <label htmlFor="Start time" className='text-xl font-semibold max-md:text-xl'>Start time</label>
                            <input type="time" name="startTime" id="" onChange={handleChange} value={convertTo24HourFormat(taskData.startTime) || ""} className='border-2 text-lg font-medium  border-zinc-300 w-[70%] max-md:w-[95%] max-md:h-12 h-14 rounded-lg px-3 max-lg:w-[60%] max-md:text-lg' />
                        </div>
                        <div className='flex flex-col gap-y-2 w-[20%] max-md:w-full max-lg:w-[50%]'>
                            <label htmlFor="End time" className='text-xl max-md:text-xl font-semibold'>End time</label>
                            <input type="time" name="endTime" onChange={handleChange} id="" value={convertTo24HourFormat(taskData.endTime) || ""}
                                className='border-2 text-lg font-medium border-zinc-300 w-[70%] max-md:w-[95%] max-md:h-12 h-14 rounded-lg px-3 max-md:text-lg cursor-pointer max-lg:w-[60%]' />
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
                                className={`text-lg font-semibold h-[50px] w-[130px] rounded-lg ${taskData.priority === level ? 'bg-purple-700 text-white' : 'bg-purple-300 text-black'}`}
                                onClick={() => handleSelect(level)}
                            >
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='flex flex-col w-full'>
                    <label htmlFor="description" className='text-xl font-semibold max-md:text-xl'>Description</label>
                    <textarea
                        name="description"
                        type="text"
                        onChange={handleChange}
                        value={taskData.description || ""}
                        placeholder='Enter the task description' className='border-2 text-lg font-medium border-zinc-400 w-[50%] max-lg:w-[70%] max-md:w-full h-24 p-3  rounded-lg max-md:p-2 max-md:text-lg'></textarea>
                </div>

                <button type="submit" className='text-lg  font-medium h-12 w-[150px] max-md:w-[140px] bg-purple-600 text-white hover:bg-purple-700 rounded-lg'>
                    Save changes
                </button>
            </form>
        </div>
    );
}

export default TaskEdit
