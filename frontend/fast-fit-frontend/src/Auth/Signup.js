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
      usernames: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this)
    this.handleChangeLastName = this.handleChangeLastName.bind(this)
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleChangePasswordConfirm = this.handleChangePasswordConfirm.bind(this)
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
      return true
    }
    else
    {
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
    if (this.isEmailValid(value) === true)
    {
      this.setState({correct_format_email: "correct format"})
      console.log(this.state.correct_format_email)
    }
    else
    {
      this.setState({correct_format_email: "incorrect format"})
      console.log(this.state.correct_format_email)
    }
  }
  handleChangeUsername(event)
  {
    const value = event.target.value
    this.setState({username: value})
    let data = {...this.state}
    if (data.usernames.includes(this.username.value)=== true)
    {
      this.setState({username_unique: "not unique"})
      console.log(this.state.username_unique)
    }
    else
    {
      this.setState({username_unique: "unique"})
      console.log(this.state.username_unique)
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
    if (this.state.password == this.state.password_confirm)
    {
      this.setState({passwords_equal: "passwords match"})
    }
    else
    {
      this.setState({password_confirm: "passwords dont match"})
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

  render()
  {
    let uniqueUsername, passwordMatches

    if (this.state.username_unique == "unique")
    {
      
    }
    return(
    <div class="bg-grey-lighter min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                    <input
                        value={this.state.first_name}
                        onChange={this.handleChangeFirstName} 
                        type="text"
                        id="firstname"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="firstname"
                        placeholder="First Name" />
                    
                    <input
                        value={this.state.last_name}
                        onChange={this.handleChangeLastName} 
                        type="text"
                        id="lastname"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="lastname"
                        placeholder="Last Name" />

                    <input
                        value={this.state.email}
                        onChange={this.handleChangeEmail} 
                        type="text"
                        id="email"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" />

                    <input 
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" />
                    <input 
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password" />

                    <button
                        type="submit"
                        class="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                    >Create Account</button>

                </div>

                <div class="text-grey-dark mt-6">
                    Already have an account? 
                    <a class="no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>.
                </div>
            </div>
        </div>
    )
  }
}
  export default SignUp