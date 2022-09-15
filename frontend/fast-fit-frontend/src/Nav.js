import { NavLink } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
// import './index.css'

function Nav() {
    return (
        // class="flex fixed justify-between items-center bg-white shadow-lg w-screen "
        <nav className='flex justify-between items-center py-3 px-4 shadow-xl bg-[#084255]'>
            <div>
                <NavLink to='/dashboard'><h2 className="text-3xl text-[#fff2f1] font-bold italic">F<span className="text-[#8e4162]">a</span>s<span className="text-[#fff2f1]">t</span><span className="text-[#bf9aca]">FIT</span></h2></NavLink>
            </div>
            <div className="flex items-center space-x-10">
                <NavLink to="/workout/plan"><h2 className='text-l text-[#fff2f1] shadow font-bold'>Workout Plan</h2></NavLink>
                <NavLink to="/meals/user"><h2 className='text-l text-[#fff2f1] shadow font-bold'>Meal Plans</h2></NavLink>
                <NavLink to="/journals"><h2 className='text-l text-[#fff2f1] shadow font-bold'>Your Journal</h2></NavLink>   
                <NavLink to="/health"><h2 className='text-l text-[#fff2f1] shadow font-bold'>Track Health</h2></NavLink>   
            </div>
            <div className='px-4'>
                <NavLink to='/logout'><FontAwesomeIcon className=" text-white text-xl"icon={faRightFromBracket} /></NavLink>
            </div>
        </nav>
    )
}

export default Nav