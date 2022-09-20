import React from "react";
import { Navigate } from "react-router-dom";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      password_confirm: "",
      passwords_equal: "",
      correct_format_email: "",
      username_unique: "",
      form_valid: "",
      redirect: false,
      usernames: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePasswordConfirm =
      this.handleChangePasswordConfirm.bind(this);
    this.formValid = this.formValid.bind(this);
    // this.handleRedirect = this.handleRedirect.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault();
    let data = { ...this.state };
    delete data.password_confirm;
    delete data.passwords_equal;
    delete data.correct_format_email;
    delete data.username_unique;
    delete data.usernames;
    const userUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/users`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(userUrl, fetchConfig);
    if (response.ok) {
      // const newUser = await response.json();
      this.setState({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        password_confirm: "",
        passwords_equal: "",
        correct_format_email: "",
        username_unique: "",
        redirect: true,
        usernames: [],
      });
    }
  }
  isEmailValid(email) {
    const valid =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.value.match(valid)) {
      return true;
    } else {
      return false;
    }
  }

  handleChangeFirstName(event) {
    const value = event.target.value;
    this.setState({ firstname: value });
  }

  handleChangeLastName(event) {
    const value = event.target.value;
    this.setState({ lastname: value });
  }

  handleChangeEmail(event) {
    const value = event.target.value;
    this.setState({ email: value });
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      this.setState({ correct_format_email: true });
    } else {
      this.setState({ correct_format_email: false });
    }
  }
  handleChangeUsername(event) {
    const value = event.target.value;
    this.setState({ username: value });
    let data = { ...this.state };
    if (data.usernames.includes(value) === true) {
      this.setState({ username_unique: false });
    } else {
      this.setState({ username_unique: true });
    }
  }

  handleChangePassword(event) {
    const value = event.target.value;
    this.setState({ password: value });
  }
  handleChangePasswordConfirm(event) {
    const value = event.target.value;
    this.setState({ password_confirm: value });
    if (this.state.password === value) {
      this.setState({ passwords_equal: true });
    } else {
      this.setState({ passwords_equal: false });
    }
  }
  async componentDidMount() {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/users`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ usernames: data.usernames });
    }
  }
  formValid(event) {
    if (
      this.state.passwords_equal &&
      this.state.username_unique &&
      this.state.correct_format_email
    ) {
      this.setState({ form_valid: true });
      return true;
    } else {
      this.setState({ form_valid: false });
      return false;
    }
  }
  // handleRedirect(event)
  // {
  //   this.setState({redirect: true})
  //   handleSubmit()
  // }
  render() {
    let uniqueUsername = <br></br>;
    let passwordMatches = <br></br>;
    let emailValidFormat = <br></br>;

    if (this.state.username_unique === false) {
      uniqueUsername = (
        <div className="text-red-500 text-xs">
          <p className="font-bold">*pick a different username</p>
        </div>
      );
    }

    if (this.state.passwords_equal === false) {
      passwordMatches = (
        <div className="text-red-500 text-xs">
          <p className="font-bold">*passwords dont match</p>
        </div>
      );
    }

    if (this.state.correct_format_email === false) {
      emailValidFormat = (
        <div className="text-red-500 text-xs">
          <p className="font-bold">*use a valid email format</p>
        </div>
      );
    }

    if (this.state.redirect) {
      return <Navigate to="/" userInput={this.state.userInput} />;
    }
    return (
      <form onSubmit={this.handleSubmit} id="signup-form">
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 space-y-1">
            <div className="bg-[#c7e8f3] px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center font-bold font-sans tracking-wide text-[#8e4162]">
                Sign up
              </h1>
              <input
                value={this.state.first_name}
                onChange={this.handleChangeFirstName}
                type="text"
                id="firstname"
                className="block border border-grey-light w-full p-3 rounded mb-4 bg-[#f1f1f1]"
                name="firstname"
                placeholder="First Name"
              />

              <input
                value={this.state.last_name}
                onChange={this.handleChangeLastName}
                type="text"
                id="lastname"
                className="block border border-grey-light w-full p-3 rounded bg-[#f1f1f1]"
                name="lastname"
                placeholder="Last Name"
              />
              {emailValidFormat}
              <input
                value={this.state.email}
                onChange={this.handleChangeEmail}
                type="text"
                id="email"
                className="block border border-grey-light w-full p-3 rounded bg-[#f1f1f1]"
                name="email"
                placeholder="Email"
              />

              {uniqueUsername}
              <input
                value={this.state.username}
                onChange={this.handleChangeUsername}
                type="text"
                id="username"
                className="block border border-grey-light w-full p-3 rounded mb-4 bg-[#f1f1f1]"
                name="username"
                placeholder="Username"
              />

              <input
                value={this.state.password}
                onChange={this.handleChangePassword}
                type="password"
                className="block border border-grey-light w-full p-3 rounded bg-[#f1f1f1]"
                name="password"
                placeholder="Password"
              />
              {passwordMatches}
              <input
                value={this.state.password_confirm}
                onChange={this.handleChangePasswordConfirm}
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4 bg-[#f1f1f1]"
                name="confirm_password"
                placeholder="Confirm Password"
              />

              <button
                type="submit"
                className="w-full bg-[#8e4162] hover:bg-[#722f37] text-white font-bold py-2 px-4 rounded"
              >
                Create Account
              </button>
            </div>

            <div className="mt-6 text-[#f1f1f1]">
              <p className="pr-2">Already have an account?</p>
              <a
                className="grid place-items-center max-w-70px hover:text-[#722f37]"
                href="../"
              >
                <p className="no-underline border-b">Log in</p>
              </a>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
export default SignUp;
