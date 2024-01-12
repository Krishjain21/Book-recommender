"use client";
import LoginEmail from "@/components/loginEmail/LoginEmail";
import React, { useState } from "react";
import styles from "./login.module.css";
import SignUp from "@/components/signup/Signup";

const Signin = () => {
  const [toggles, setToggles] = useState({
    login: true,
    signup: false,
  });
  const handleSignUp = () =>{
    setToggles({...toggles, login: false, signup: true});
  }
  const handleLogin = () =>{
    setToggles({...toggles, signup: false, login: true});
  }
  return (
    <div className={styles.hi}>
      <div className={styles.loginEmail}>
        {toggles.login && <LoginEmail handleSignUp={handleSignUp}/>}
        {toggles.signup && <SignUp handleLogin={handleLogin}/>}
      </div>
    </div>
  );
};

export default Signin;
