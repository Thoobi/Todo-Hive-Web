import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout"
import WelcomeScreen from "../Pages/Welcomescreen.jsx"
import NotFoundPage from "../Pages/Error/NotFoundPage"
import Loginscreen from "../Pages/Loginscreen"
import Signupscreen from "../Pages/SignupScreen"
import HomeScreen from "../Pages/HomeScreen"
import EditProfile from "../Pages/EditProfile"
import CreateTask from "../Pages/CreateTask"
import TaskEdit from "../Pages/EditTask"
import { UserProvider } from "../context/userContext";
import PrivateRoute from "./privateRoutes";


export const mainRoute = createBrowserRouter(
    [
        {
            element: (
                <UserProvider>
                    <Layout />
                </UserProvider>
            ),
            children: [
                {
                    path: "/",
                    element: <WelcomeScreen />
                },
                {
                    path: "/Login",
                    element: <Loginscreen />
                },
                {
                    path: "/Signup",
                    element: <Signupscreen />
                },
                {
                    path: "/homescreen",
                    element: (
                        <PrivateRoute element={<HomeScreen />} />
                    )
                },
                {
                    path: "/profile",
                    element: (
                        <PrivateRoute element={<EditProfile />} />
                    )
                },
                {
                    path: "/CreateTask",
                    element: (
                        <PrivateRoute element={<CreateTask />} />
                    )
                },
                {
                    path: "/EditTask/:id",
                    element: (
                        <PrivateRoute element={<TaskEdit />} />
                    )
                },

            ]
        },
        {
            path: "*",
            element: <NotFoundPage />
        }

    ])
