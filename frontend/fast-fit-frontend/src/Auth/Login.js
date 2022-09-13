import{ useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useToken } from '../Authentication'

export default function Login()
{
    let navigate = useNavigate()
    const [,login] = useToken();
    let[data, setData] = useState({
        username:'',
        password:'',
        error:'',
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(data.username, data.password)
        // setData({error: error})
        setData({
            username: "",
            password: '',
        })
        navigate('/')
    }

    return(
        
        <section className="w-full h-1000px px-8 py-16 bg-[#073b4c] xl:px-8 tails-selected-element">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col items-center md:flex-row">

                    <div className="w-full space-y-5 md:w-3/5 md:pr-16">
                        <p className="font-medium text-[#f1f1f1] uppercase" data-primary="blue-500">Building A Healthier You</p>
                        <h2 className="text-7xl text-[#fff2f1] font-bold">F<span className="text-[#8e4162]">a</span>s<span className="text-[#fff2f1]">t</span><span className="text-[#bf9aca]">FIT</span></h2>
                        <p className="text-xl text-[#f1f1f1] md:pr-16">Interactable new way to track and plan your fitness and nutrition!</p>
                    </div>
                    <form onSubmit={handleSubmit} id="login-form">
                        <div className="w-full mt-16 md:mt-0">
                        <div className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-[#c7e8f3] border-b-2 border-gray-300 rounded-lg shadow-2xl px-7 tails-selected-element" data-rounded="rounded-lg" data-rounded-max="rounded-full" >
                            <h3 className="mb-6 text-2xl font-medium text-center">Log in</h3>
                            <input
                                onChange={(event) => setData({ ...data, username: event.target.value })} 
                                type="text"
                                id="username"
                                className="block border border-grey-light w-full p-3 rounded mb-4 bg-[#f1f1f1]"
                                name="username"
                                placeholder="Username" />
                            

                            <input 
                                onChange={(event) => setData({ ...data, password: event.target.value })}
                                type="password"
                                className="block border border-grey-light w-full p-3 rounded mb-4 bg-[#f1f1f1]"
                                name="password"
                                placeholder="Password" />


                            <div className="block">
                                <button className="w-full px-3 py-4 font-medium text-white bg-blue-600 rounded-lg" data-primary="blue-600" data-rounded="rounded-lg">Log Me In</button>
                            </div>
                            <p className="w-full mt-4 text-sm text-center text-gray-500">Don't have an account? <a href="../signup" className="text-blue-500 underline">Sign up here</a></p>
                        </div>
                    </div>
                    </form>

                    </div>

            <div className="container px-8 mx-auto sm:px-12 lg:px-20 justify-center">
                <h1 className="text-sm pt-20 font-bold tracking-wide text-center text-[#f1f1f1] uppercase mb-7">Built on</h1>
                <div className="flex grid items-center justify-center grid-cols-2 gap-y-8">
                    
                    <div className="flex items-center justify-center col-span-1 row-span-1">
                        <img src="https://upload.wikimedia.org/wikiversity/en/8/8c/FastAPI_logo.png" alt="Hubspot" className="block object-contain h-9"/>
                    </div>
                    <div className="flex items-center justify-center col-span-1 row-span-1">
                        <img src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png" alt="Youtube" className="block object-contain h-7 lg:h-8"/>
                    </div>
                    
                </div>
            </div>
            </div>
        </section>

    )
}

    