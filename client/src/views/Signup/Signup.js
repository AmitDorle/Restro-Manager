import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

import SignUp from './signup.png'
import { currentUser } from "./../../util/currentUser";
import "./Signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  useEffect(() => {
    if (currentUser) {
      window.location.href = "/";
    }
  }, []);

  async function signupUser() {
    const response = await axios.post("/signup", {
      name: name,
      email: email,
      phone: phone,
      password: password,
      role: role,
    });
    console.log(response.data);
    if (response.data.success) {
      await swal({
        title: "Success",
        text: response.data.message,
        icon: "success",
        button: "Aww yiss!",
      });
      window.location.href = "/login";
    } else {
      swal({
        title: "Error",
        text: response.data.message,
        icon: "error",
        button: "Try Again!",
      });
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
    }
  }

  return (
    <div>
      <h1 className="text-center">Signup</h1>
      <div className="row">
        <div className="col-md-6"></div>

        <div className="col-md-6">
          <div className="Main-signup-container">
            <div className="signup-container">
            <div className="text-center">
                    <img src={SignUp} height="90px"/>
                </div>
                <div className="m-3">
                    <h2 className="Signup-head">
                        Sign
                        Up and Run For Food</h2>
                </div>
                <div className="m-1">
                    <p className="text-center">Let's signed up and go straight to the food.</p>
                </div>
              <form>
                <div className="form-containerr">
                <div>
                  <h6>Full Name: </h6>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter Name"
                    className="user-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <h6>Email: </h6>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    className="user-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <h6>Phone: </h6>
                  <input
                    type="text"
                    id="phone"
                    placeholder="Enter Phone"
                    className="user-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <h6>Password: </h6>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    className="user-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                </div>

                <div className="sign-up-button-container">
                  <button
                    type="button"
                    className="sign-up-button"
                    onClick={signupUser}
                  >
                    <b>Signup</b>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
