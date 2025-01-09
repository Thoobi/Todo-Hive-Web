import { createContext, useState, useEffect } from 'react';
import axios from "axios"
import { jwtDecode } from 'jwt-decode';
const UserContext = createContext();
import { useNavigate } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(() => {
        return localStorage.getItem("userId") || null;
    });
    const [authToken, setAuthToken] = useState(() => {
        return localStorage.getItem("authToken") || null;
    });
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState(""); // Add this to manage messages
    const [errorMessage, setErrorMessage] = useState(""); // For error messages

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            // Update the image preview as soon as the file is read
            reader.onload = () => {
                const base64Image = reader.result;
                setUserProfile(base64Image); // Show the image immediately in the UI

                // Now, send the base64Image to the backend to update the user's profile image
                const updateImage = async () => {
                    try {
                        const response = await axios.patch(
                            `https://todobackend-top5.onrender.com/api/changeImage/66e024c43de04187ad625b1e`,
                            { avatar: base64Image }, // Assuming the backend expects "avatar"
                            {
                                headers: {
                                    Authorization: `Bearer ${authToken}`,
                                    'Content-Type': 'application/json',
                                },
                            } // Assuming the API expects the image as "avatar"
                        );

                        console.log("Image uploaded successfully:", response.data);
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

    useEffect(() => {
        if (userId) {
            localStorage.setItem("userId", userId);
        } else {
            localStorage.removeItem("userId");
        }
    }, [userId]);

    useEffect(() => {
        if (authToken) {
            localStorage.setItem("authToken", authToken);
        } else {
            localStorage.removeItem("authToken");
        }
    }, [authToken]);

    const handleLogin = async (finalData) => {
        if (finalData.email && finalData.password) {
            try {
                setLoading(true);
                await axios.post('https://todobackend-top5.onrender.com/api/login', finalData)
                    .then(res => {
                        const { token } = res.data;
                        localStorage.setItem("authToken", token);
                        console.log(token);
                        setAuthToken(token);
                        const decodedToken = jwtDecode(token);
                        const userId = decodedToken?.id;
                        localStorage.setItem("userId", userId);
                        setUserId(userId);
                        console.log(userId);
                        setMessage(res.data.message);
                        setTimeout(() => {
                            navigate("/HomeScreen");
                        }, 5000);
                        setLoading(false)
                    })
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    setErrorMessage(err.response.data.message);

                }
                setLoading(false);

            }
        } else {
            setErrorMessage('Please provide both email and password');
        }
    };

    const clearMessage = () => {
        setMessage("");
        setErrorMessage("");
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        setUserId(null);
        setAuthToken(null);
        setUserProfile(null);
        // console.log("Logged out successfully!");
    };

    const value = {
        userId,
        authToken,
        userProfile,
        handleFileChange,
        handleLogin,
        handleLogout,
        loading,
        message,
        errorMessage,
        clearMessage,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
