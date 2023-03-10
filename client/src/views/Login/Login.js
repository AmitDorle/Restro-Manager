import React, {useState,useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

import {currentUser} from './../../util/currentUser'
import "./Login.css"


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if(currentUser){
     window.location.href="/"
    }
  }, [])

  async function loginUser() {
   const response = await axios.post('/login', {
      email: email,
      password: password,
   })
   console.log(response.data)
   if(response.data.success){
    await swal({
      title: "Success",
      text: response.data.message,
      icon: "success",
      button: "Aww yiss!",
    });
      localStorage.setItem('currentUser', JSON.stringify(response.data.data));
      window.location.href="/"
   }
   else
   {
    await swal({
      title: "Error",
      text: response.data.message,
      icon: "error",
      button: "Try Again!",
    });
     setEmail("")
     setPassword("")
     localStorage.removeItem('currentUser');
   }
  }

  return (
    <div>
      <h1 className='text-center'>Login</h1>
      <div className='row'>
       <div className='col-md-6'>

       </div>

       <div className='col-md-6'>
       <div className="Main-login-container">
        <div>
            <div className="login-container">
                <div>
                    <p className="welcome-text">WELCOME BACK</p>
                </div>
                <span className="text-center emoji">
                    😃
                </span>
                <div className="m-4">
                    <h2 className="Signin-head">
                        Sign In to
                        Your Account</h2>
                </div>
                {/* <div>
                    <p className="text-center">Let's get you signed in and straight to the Food.</p>
                </div> */}
                <div className="form-container m-3">
                    <form>
                    <h6>Email: </h6>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    className="user-input form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                        <h6>Password: </h6>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    className="user-input form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                    </form>
                </div>
                <div className="for-pass-container m-3">
                    <div>
                        <input type="checkbox" />Remember me
                    </div>
                    <div> <a href="/pages/forget-password.html">Forgot your password?</a></div>
                </div>
                <div className="sign-in-button-container">
                    <button type="button" class="sign-in-button" onClick={loginUser}><b>Login</b></button>
                </div>
                <div className="sign-up-link-section">
                <div>
                    <p>Don;t have an account?</p>
                </div>
                <div><Link to="/Signup">Sign up and get started!</Link></div>
            </div>
            </div>
            
        </div>
    </div>
      </div>
      </div>
    </div>
  )
}

export default Login