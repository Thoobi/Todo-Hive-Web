import image404 from '../../assets/404a.png'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div id='hi' className="w-full h-full bg-cover flex justify-center items-center flex-col font-inter gap-y-2">
      <h1 className='text-3xl max-md:text-xl text-center font-medium max-md:w-[90%] w-[60%]'>
        Task not found. But we did find your excuse... they are at home.
      </h1>
      <img src={image404} alt="" />
      <span>
        <Link to={"/Homescreen"}>
          <button className='bg-pale border-2 border-black max-md:border-zinc-200 h-12 w-32 rounded-xl max-md:text-white  font-medium'>
            Return home
          </button>
        </Link>

      </span>
    </div>
  )
}

export default NotFoundPage