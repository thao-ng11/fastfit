import { useToken } from './Authentication';
import { NavLink } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import fastfit from "./fastfit2.png"
// import './index.css'

function Nav() {
    let showLinks = 'flex items-center space-x-10 ml-30 d-none'
    const [token] = useToken()

    if (token) {
        showLinks = 'flex items-center space-x-10 ml-30'
    }

    return (
        // class="flex fixed justify-between items-center bg-white shadow-lg w-screen "
        <nav className='flex justify-between items-center py-3 px-4 shadow-xl bg-[#084255] '>
                
            <div>
                <NavLink to='/dashboard'>
                    <div className="flex">
                            <img src={fastfit} className="h-[50px] w-[50px] pr-0"/>
                            <h2 className="text-4xl italic text-[#fff2f1] font-bold"><span className="text-[#8e4162]">ast</span><span className="text-[#bf9aca]">FIT</span></h2>
                        </div></NavLink>
            </div>
            <div className={showLinks}>
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