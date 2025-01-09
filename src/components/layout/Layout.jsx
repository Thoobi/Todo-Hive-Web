import { Outlet } from "react-router-dom"
// import Header from "../Static/Header"
// import Footer from '../Static/Footer'

const Layout = () => {
    return (
        <div className="w-full">
            {/* <Header /> */}
            <Outlet />
            {/* <Footer /> */}
        </div>

    )
}

export default Layout