import { useState } from "react";
import styles from "./loginEmail.module.css";
import { useRouter } from "next/router";

const LoginEmail = (props) => {
  // const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (inputValue) => {
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!inputValue) {
      setEmailError("Email is required *");
      return false;
    } else if (!emailPattern.test(inputValue)) {
      setEmailError("Email format is not correct");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (inputValue) => {
    if (!inputValue) {
      setPasswordError("Password is required *");
      return false;
    } else if (inputValue.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { email: email, password: password};
    if (validateEmail(email) && validatePassword(password)) {
      await fetch(`/api/try`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        // .then((response) => response.json())
        // .then((data) => {
        //   if (data.message === "OK") {
        //     console.log("logged in");
        //     // router.push("/")
        //   }
        //   else{
        //     console.log(data.message);
        //   }
        // });
    }
  };
  return (
    <div
      className={`${styles.login_now_user} ${styles.tabcontent_1}`}
      id={styles.tab2}
    >
      <p className={styles.login_text1}>Login Now</p>
      <p className={`${styles.login_text2} ${styles.tablinks}`}>
        Don’t have an account?{" "}
        <a onClick={props.handleSignUp} className={styles.signupText}>
          Signup
        </a>
      </p>
      <form
        className={styles.login_form}
        name="loginByEmailForm"
        id="loginByEmailForm"
        onSubmit={handleSubmit}
      >
        <div className={styles.input_email}>
          <div className={styles.mobile_code}>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email ID"
                className={styles.no_outline}
              />
            </div>
          </div>
          {emailError && (
            <p className={styles.regform_error_field}>{emailError}</p>
          )}
        </div>

        <div className={styles.input_password}>
          <div className={styles.mobile_code}>
            <div>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
              />
            </div>
          </div>
          {passwordError && (
            <p className={styles.regform_error_field}>{passwordError}</p>
          )}
        </div>

        <div className={styles.email_btns_dv1}>
          <button
            className={`${styles.continue_btn_user} ${styles.tablinks}`}
            type="submit"
          >
            Continue
          </button>
        </div>
      </form>
      <div>
        {errorMessage && toast.error(errorMessage) && setErrorMessage("")}
        {successMessage &&
          toast.success(successMessage) &&
          setSuccessMessage("")}
      </div>
    </div>
  );
};

export default LoginEmail;
