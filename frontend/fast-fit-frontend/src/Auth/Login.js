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
        <form onSubmit={handleSubmit} id="login-form">
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 space-y-1">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Log in</h1>

                    <input
                        onChange={(event) => setData({ ...data, username: event.target.value })} 
                        type="text"
                        id="username"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        placeholder="Username" />
                    

                    <input 
                        onChange={(event) => setData({ ...data, password: event.target.value })}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" />


                    <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Log in</button>

                </div>

                <div className="text-grey-dark mt-6">
                    Need to create an account? 
                    <a className="no-underline border-b border-blue text-blue" href="../signup/" >
                        Sign up!
                    </a>.
                </div>
            </div>
        </div>
        </form>
    )
}

    