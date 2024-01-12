import { useState } from "react";
import styles from "./login.module.css";
import LoginEmail from "@/components/loginEmail/LoginEmail";

const Login = (props) => {
  const [showLogin, setsShowLogin] = useState(false);


  return (
    // <div className={`col-md-8 ${styles.col_md_8}`}>
    <div>

      <LoginEmail
        onSaveData={props.emailLogin}
        showForgotPass={props.showForgotPass}
      />

      </div>
  );
};

export default Login;
