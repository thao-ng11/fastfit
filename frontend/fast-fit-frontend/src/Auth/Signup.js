import React, { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'


class SignUp extends React.Component
{
  constructor(props){
    super(props)
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      password_confirm: "",
      passwords_equal:"",
      correct_format_email: "",
      username_unique: "",
      form_valid: "",
      usernames: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this)
    this.handleChangeLastName = this.handleChangeLastName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangePasswordConfirm = this.handleChangePasswordConfirm.bind(this)
    this.formValid = this.formValid.bind(this)
  }

  async handleSubmit(event){
    event.preventDefault()
    const data = {...this.state}
    delete data.password_confirm
    delete data.passwords_equal
    delete data.correct_format_email
    delete data.username_unique
    delete data.usernames
    const userUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/users`
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json',
      }
    }
  const response = await fetch(userUrl, fetchConfig)
  if (response.ok){
    const newUser = await response.json()
    this.setState({
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      password_confirm: "",
      passwords_equal:"",
      correct_format_email: "",
      username_unique: "",
      usernames: []

    })
  }
  
  }
  isEmailValid(email)
  {
    const valid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (email.value.match(valid)){
      console.log("email valid true")
      return true
    }
    else
    {
      console.log("emailvalid false")
      return false
    }

  }

  handleChangeFirstName(event)
  {
    const value = event.target.value
    this.setState({first_name: value})
  }
  
  handleChangeLastName(event)
  {
    const value = event.target.value
    this.setState({last_name: value})
  }

  handleChangeEmail(event)
  {
    const value = event.target.value
    this.setState({email: value})
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
    {
      this.setState({correct_format_email: true})
      console.log(this.state.correct_format_email)
    }
    else
    {
      this.setState({correct_format_email: false})
      console.log(this.state.correct_format_email)
    }
  }
  handleChangeUsername(event)
  {
    const value = event.target.value
    this.setState({username: value})
    let data = {...this.state}
    if (data.usernames.includes(value) === true)
    {
      console.log("unique state set to not unique")
      this.setState({username_unique: false})
      console.log(value)
    }
    else
    {
      console.log("unique state set to unique")
      this.setState({username_unique: true})
      console.log(value)
    }
  }
  
  
  handleChangePassword(event)
  {
    const value = event.target.value
    this.setState({password: value})
  }
  handleChangePasswordConfirm(event)
  {
    const value = event.target.value
    this.setState({password_confirm: value})
    if (this.state.password === value)
    {
      console.log("password_equal set to match")
      this.setState({passwords_equal: true})
    }
    else
    {
      console.log("password_equal dont match")
      this.setState({passwords_equal: false})
    }
  }
  async componentDidMount()
  {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/users`
    const response = await fetch(url)
    if (response.ok)
    {
      const data = await response.json()
      console.log("usernames fetched")
      console.log(data)
      this.setState({usernames: data.usernames})
      console.log(this.state.usernames)
    }
  }
formValid(event)
{
  if(this.state.passwords_equal && this.state.username_unique && this.state.correct_format_email)
  {
    console.log("returning true")
    this.setState({form_valid: true})
    return true
  }
  else
  {
    console.log("returning false")
    this.setState({form_valid: false})
    return false
  }
}

  render()
  {
    let uniqueUsername = <br></br>
    let passwordMatches = <br></br>
    let emailValidFormat = <br></br>
    let button 
    if (this.state.username_unique === false)
    {
      uniqueUsername = <div className="text-red-500 text-xs"><p className= "font-bold">*pick a different username</p></div>
    }
    
    if (this.state.passwords_equal === false)
    {
      passwordMatches = <div className="text-red-500 text-xs"><p className= "font-bold">*passwords dont match</p></div>
    }
    
    if (this.state.correct_format_email === false)
    {
      emailValidFormat = <div className="text-red-500 text-xs"><p className= "font-bold">*use a valid email format</p></div>
    }
    
    console.log(this.state)
    return(
    <form onSubmit={this.handleSubmit} id="signup-form">
    <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 space-y-1">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <input
                        value={this.state.first_name}
                        onChange={this.handleChangeFirstName} 
                        type="text"
                        id="firstname"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="firstname"
                        placeholder="First Name" />
                    
                    <input
                        value={this.state.last_name}
                        onChange={this.handleChangeLastName} 
                        type="text"
                        id="lastname"
                        className="block border border-grey-light w-full p-3 rounded"
                        name="lastname"
                        placeholder="Last Name" />
                    {emailValidFormat}
                    <input
                        value={this.state.email}
                        onChange={this.handleChangeEmail} 
                        type="text"
                        id="email"
                        className="block border border-grey-light w-full p-3 rounded"
                        name="email"
                        placeholder="Email" />

                    {uniqueUsername}
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
                    {passwordMatches}
                    <input 
                        value={this.state.password_confirm}
                        onChange={this.handleChangePasswordConfirm}
                        type="confirm_password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password" />

                    <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                      Create Account</button>

                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account? 
                    <a className="no-underline border-b border-blue text-blue" href="../login/" >
                        Log in
                    </a>.
                </div>
            </div>
        </div>
        </form>
    )
  }
}
  export default SignUp