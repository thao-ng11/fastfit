import{ useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export default function Login({login})
{
    let navigate = useNavigate()
    let [data, setData] = useState({
        username:'',
        password:'',
        error:'',
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await login(data.username, data.password, () => navigate("/"))
        setData({error: error})
        setData({
            username: "",
            password: '',
        })
    }

    return(
        <form onSubmit={this.handleSubmit} id="login-form">
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 space-y-1">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Log in</h1>

                    <input
                        value={this.state.username}
                        onChange={this.handleChangeUsername} 
                        type="text"
                        id="username"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        placeholder="Username" />
                    

                    <input 
                        value={this.state.password}
                        onChange={this.handleChangePassword}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded"
                        name="password"
                        placeholder="Password" />


                    <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Create Account</button>

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

    