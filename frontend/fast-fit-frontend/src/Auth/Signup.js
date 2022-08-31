import React, { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { Marginer } from "./marginer"
import Dashboard from './Dashboard'

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
      password_confirm: ""
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
      password_confirm: ""
    })
  }

  }
  handleChangeFirstName(event)
  {
    const value = event.target.value
    this.setState({first})
  }
}
  