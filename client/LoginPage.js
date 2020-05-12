import React, {
	useEffect,
	useState,
} from "react";
import styles from "./LoginPage.module.scss";
import Navbar from "./components/navbar";
import loginHook from "./api/login";

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const [submit, setSubmit] = useState(false);

  const { loading, error, result } = loginHook(email, password, submit);

  const validateEmail = (mail) => {
    if (mail === '') {
      return (true);
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true);
    }
    return (false);
  }

  const hasUpperCase = (str) => {
    return (/[A-Z]/.test(str));
}

  useEffect(() => {
    const emailValidation = validateEmail(email);
    if (!emailValidation) {
      setErrorEmail("Enter valid email.");
    } else {
      setErrorEmail("");
    }
    if ((password.length < 7 && password.length !== 0) && !hasUpperCase(password)) {
      setErrorPassword("Enter valid password")
    } else {
      setErrorPassword("");
    }
    if (errorEmail === '' &&  errorPassword === '') {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [email, password]);


  const handleSubmit = (state) => (e) => {
    e.preventDefault();
    setSubmit(state);
  }

  useEffect(() => {
    if (result) {
      setSubmit(false);
      setEmail('');
      setPassword('');
    }
  }, [result])


	return (
		<div className={styles.page}>
      {loading && <div className={styles.loading}><div className={styles.loader}></div></div>}
			<Navbar />
			<div className={styles.content}>
				<div className={`${styles.card} ${styles.center}`}>
					<div className={styles.headerCard}>
						<img src="https://assets.website-files.com/5dd518f89fa9b1baf86daeac/5dd7a6684e896a459748ee09_HealthifyMe%20Black%20Logo%402x.png" alt="logo" />
					</div>
          <div className={styles.contentCard}>

              <h2 className={styles.h2}>Sign In</h2>
              <div className={styles.description}>Use your Healthify Me Account</div>
              
              <form className={styles.form} onSubmit={handleSubmit(true)}>

                <div className={styles.formField}>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>setEmail(e.target.value)}
                    required={true}
                    className={errorEmail !== '' ? styles.inputError : ''}
                    autoComplete="false"
                  />
                  {errorEmail !== '' ? <div className={styles.error}>{errorEmail}</div> : null}
                </div>

                <div className={styles.formField}>
                  <input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                    className={errorPassword !== '' ? styles.inputError : ''}
                    autoComplete="false"
                  />
                  {errorPassword !== '' ? <div className={styles.error}>{errorPassword}</div> : null}
                </div>

                <div className={styles.formField}>
                  <button className={styles.button} disabled={!buttonState}>
                    Login
                  </button>
                </div>

              </form>
            </div>
            
    
				</div>
			</div>
		</div>
	);
}

export default App;
