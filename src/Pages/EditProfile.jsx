import pics from "../assets/backg.png"
import profile from "../assets/Group7.png"
import { FaRegEdit } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useUser } from '../hooks/useUser';
import axios from 'axios'
import { ClipLoader } from 'react-spinners'

const EditedProfile = () => {
    const { authToken } = useUser();
    const { userId } = useUser()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { handleLogout } = useUser()
    const [userProfile, setUserProfile] = useState(null)
    const [userName, setUserName] = useState(null)
    const fileInputRef = useRef(null);

    const handleIconClick = () => {
        fileInputRef.current.click();
    };


    const handleFileChange = (event) => {
        setIsSubmitting(true)
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const base64Image = reader.result;
                setUserProfile(base64Image);

                const formData = new FormData()
                formData.append("image", file)
                const updateImage = async () => {
                    try {
                        const response = await axios.patch(
                            `https://todobackend-top5.onrender.com/api/changeImage/${userId}`,
                            formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                                "Authorization": `Bearer ${authToken}`
                            }
                        }
                        )
                        setIsSubmitting(false)
                        // console.log("Image uploaded successfully:", response.data);
                        setUserProfile(response.data.user.avatar); // Update the user profile with the new avatar from the response
                    } catch (error) {
                        console.error("Error uploading the image:", error);
                    }
                };

                // Call the function to upload the image after previewing it
                updateImage();
            };

            // Read the file as a Data URL (Base64) to update the preview and later send it to the server
            reader.readAsDataURL(file);
        }
    };

    const fetchUser = async () => {
        const token = authToken
        try {
            const response = await axios.get(`https://todobackend-top5.onrender.com/api/getuser/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log(response.data);
            setUserProfile(response.data.user.avatar)
            setUserName(response.data.user.username)
            // console.log(token);
        } catch (error) {
            // console.log(error);
        }
    }
    useEffect(() => {
        fetchUser();
    }, [userId]);

    return (
        <div className="w-full h-full font-urbanist">
            <div className="w-full bg-cover flex justify-center items-center h-80 max-md:h-[250px] p-2 bg-no-repeat " style={{ backgroundImage: `url(${pics})` }}>
                <Link to={"/Homescreen"}>
                    <IoMdArrowBack className="absolute top-10 left-14 max-md:top-6 max-md:left-6 size-7" />
                </Link>

                {/* Profile Holder */}
                <div className="flex flex-col items-center mt-[50px] mr-[20px] relative">
                    <div className="w-[150px] h-[150px] max-md:h-[120px] max-md:w-[120px] rounded-full">
                        {userProfile ?
                            <img src={userProfile} className="w-full h-full rounded-full object-center" /> : <img src={profile} className="w-full h-full rounded-full object-center" />}
                    </div>
                    <span className="text-[30px] font-medium max-md:text-[20px]">{userName}</span>
                    {/* Edit Image */}
                    <div className="rounded-[50%] flex justify-center items-center text-white text-lg absolute right-4 bottom-[20%] w-[40px] h-[40px] bg-black/70">
                        <input type="file" accept='image/png, image/jpg, image/jpeg' ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                        <FaRegEdit onClick={handleIconClick} />
                    </div>
                </div>

            </div>
            {/* Field Input */}
            <div>
                <div className="flex w-full items-center flex-col mt-[20px]">
                    <div className="w-[90%] lg:w-[50%] flex flex-col">
                        <label className="text-[17px] font-medium mb-[15px]">Email</label>
                        <div className="flex p-[12px] justify-between items-center rounded-lg w-full max-md:h-[55px] border-2 border-gray-400">
                            <input placeholder="johnwick@gmail.com" className="flex flex-1 p-[10px] outline-none caret-red-700 " />
                            {isSubmitting ? <CiEdit size={24} /> : <ClipLoader color='white' size={15} />}

                        </div>
                    </div>

                    {/* Phone */}
                    <div className="w-[90%] lg:w-[50%] mt-[30px] flex flex-col">
                        <label className="text-[17px] font-medium mb-[15px]">Phone </label>
                        <div className="flex p-[12px] justify-between items-center rounded-lg w-full max-md:h-[55px] border-2 border-gray-400">
                            <input placeholder="+234-7032810292" className="flex flex-1 p-[10px] outline-none caret-red-700 " />
                            <CiEdit size={24} />
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center my-10 '>
                    <button className='h-[55px] max-md:w-[150px] w-[160px] bg-[#FF5757] text-white text-lg font-semibold rounded-xl' onClick={handleLogout}>
                        Log Out
                    </button>
                </div>

            </div>


        </div>
    )
}

export default EditedProfile