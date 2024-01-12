import { useState} from "react";
import Link from "next/link";
import styles from "./signUp.module.css";

const SignUp = (props) => {
	const userMobile = props?.userData?.mobile;
	const [nameError, setNameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [phoneError, setPhoneError] = useState("");
	const [names, setName] = useState("");
	const [intlLogin, setIntlLogin] = useState(false);
	const [dialCode, setDialCode] = useState("91");
	const validateName = (inputValue) => {
		if (!inputValue) {
			setNameError("Name is required *");
			return false;
		} else {
			setNameError("");
			return true;
		}
	};
	const handleNameChange = (event) => {
		setName(event.target.value.replace(/[^a-zA-Z\s]+/, ""));
		validateName(event.target.value);
	};

	const [email, setEmail] = useState("");

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
	const handleEmailChange = (event) => {
		setEmail(event.target.value);
		validateEmail(event.target.value);
	};

	const [password, setPassword] = useState("");

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
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
		validatePassword(event.target.value);
	};



	const handleSubmit = async (event) => {
		event.preventDefault();
		if (
			validateName(names) &&
			validateEmail(email) &&
			validatePassword(password)
		) {
			const data = { name: names, email: email, password: password };
			await fetch(`/api/signup`, {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			  })
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					if (data.message === "OK") {
						console.log("user created");
					}
					else{
						console.log(data.message);
					}
				})
				.catch((error) => {
					console.error("Fetch error:", error);
				});
		}
	};
	return (
		
				<div
					className={`${styles.login_now_user} ${styles.tabcontent_1}`}
					id={styles.tab3}
				>
					<p className={styles.login_text1}>Signup Now</p>
					<p className={styles.login_text2}>
						Already have an account?{" "}
						<Link href="#" onClick={props.handleLogin}>
							Login
						</Link>
					</p>
					<form className={styles.login_form} id="registerForm" name="registerForm" onSubmit={handleSubmit}>
						<div className={styles.input_form_new}>
							<input
								id="name"
								type="text"
								name="name"
								value={names}
								onChange={handleNameChange}
								placeholder="Name"
							/>
							{nameError && (
								<p className={styles.regform_error_field}>{nameError}</p>
							)}
						</div>

						<div className={styles.input_form_new}>
							<input
								id="email"
								type="text"
								name="email"
								value={email}
								onChange={handleEmailChange}
								placeholder="Company Email"
							/>
							{emailError && (
								<p className={styles.regform_error_field}>{emailError}</p>
							)}
						</div>

						<div className={styles.input_form_new}>
							<input
								id="password"
								type="password"
								name="password"
								value={password}
								onChange={handlePasswordChange}
								placeholder="Password"
							/>
							{passwordError && (
								<p className={styles.regform_error_field}>{passwordError}</p>
							)}
						</div>

						{/* <div className={`${styles.input_form} ${styles.input_form_mobile}`}>
							<div className={styles.mobile_code}>
								<div
									className={styles.country_code}
								>
									<input
										type="tel"
										id="dial_code"
										name="dial_code"
										ref={inputRef}
										defaultValue="+91"
										onChange={handleDialCodeChange}
									/>
								</div>
								<div className={styles.input_filled_form}>
									<input
										placeholder="Mobile no."
										type="text"
										name="number"
										id="number"
										value={phoneNumber}
										onChange={handlePhoneNumberChange}
										onInput={(e) => {
											if (e.target.value.length > 15) {
												e.target.value = e.target.value.slice(0, 15);
											}
										}}
									/>
								</div>
							</div>
							{phoneError && (
								<p className={styles.regform_error_field}>{phoneError}</p>
							)}
						</div> */}
						
						<div className={styles.email_btns_dv1}>
							<button type="submit" className={styles.continue_btn_user}>
								Continue
							</button>
						</div>
					</form>
					
					</div>
			
	);
};

export default SignUp;
