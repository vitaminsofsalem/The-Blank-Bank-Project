import IntroSideContainer from "../components/IntroSideContainer";
import styles from "../styles/RegisterLogin.module.scss";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { useState } from "react";

/*

After login do this: 
localStorage.setItem("jwt", JSON.stringify(token));  
router.replace("/");

*/
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className={`${styles.parentContainer}`}>
      <IntroSideContainer forSignIn={true} />

      <div className={styles.loginButtonContainer}>
        <div className={`${styles.loginButton} unselectable`}>Sign in</div>
      </div>

      <div className={styles.rightContainer}>
        <h1 className={styles.signInTitle}>Sign in</h1>

        <Form className={styles.form} onSubmit={handleSubmit}>
          <FormGroup>
            <Label className={styles.label} for="username">
              Username
            </Label>

            <Input
              className={styles.input}
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label className={styles.label} for="password">
              Password
            </Label>

            <Input
              className={styles.input}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>
    </div>
  );
}
