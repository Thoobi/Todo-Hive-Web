import logo from "../assets/Logo.svg"
import { TiArrowRight } from "react-icons/ti";
import background from '../assets/gradient-mesh.png'
import { Link } from "react-router-dom";
import vector1 from '../assets/vecA.svg'
import vector2 from '../assets/vecB.svg'
import vector3 from '../assets/vecC.svg'


const WelcomeScreen = () => {

    return (
        <div className="w-full h-scren bg-cover flex flex-col justify-center items-center font-urbanist" style={{ backgroundImage: `url(${background})`, height: "100vh" }}>
            <span className="absolute top-0 left-0">
                <img src={vector1} alt="a vector image of a line" />
            </span>
            <span className="absolute left-0 top-60 max-md:top-40">
                <img src={vector2} alt="a vector image of a line" />
            </span>
            <div className="flex flex-col justify-center items-center gap-y-2">
                <img src={logo} alt="The Todo hive logo" />
                <h4 className="italic">
                    Innovative, user-friendly, and easy.
                </h4>
                <Link to={"/Signup"}>
                    <button className="flex flex-row border-[2px] rounded-[8px] border-[#757575]  h-[50px] w-[160px] justify-center items-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }} >
                        Get started <TiArrowRight className="self-center size-6" />
                    </button>
                </Link>
            </div>

            <span className="absolute bottom-0 right-0">
                <img src={vector3} alt="a vector image of a line" />
            </span>
        </div>
    )
}

export default WelcomeScreen
