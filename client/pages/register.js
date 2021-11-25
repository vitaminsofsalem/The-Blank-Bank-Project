import IntroSideContainer from "../components/IntroSideContainer";
import styles from "../styles/RegisterLogin.module.css";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirm_password") {
      setPasswordConfirm(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "id") {
      setId(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className={`${styles.parentContainer}`}>
      <IntroSideContainer forSignIn={false} />

      <div className={styles.loginButtonContainer}>
        <div className={`${styles.loginButton} unselectable`}>Sign up</div>
      </div>

      <div className={styles.rightContainer}>
        <h1 className={styles.signInTitle}>Sign up</h1>

        <Form className={styles.form} onSubmit={handleSubmit}>
          <FormGroup>
            <Label className={styles.label} for="email">
              GIU Email
            </Label>

            <Input
              className={styles.input}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label className={styles.label} for="email">
              GIU ID
            </Label>

            <Input
              className={styles.input}
              type="text"
              name="id"
              id="id"
              placeholder="Enter your ID"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label className={styles.label} for="email">
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
            <Label className={styles.label} for="email">
              Name
            </Label>

            <Input
              className={styles.input}
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label className={styles.label} for="email">
              Phone
            </Label>

            <Input
              className={styles.input}
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter your phone"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label className={styles.label} for="email">
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

          <FormGroup>
            <Label className={styles.label} for="email">
              Confirm Password
            </Label>

            <Input
              className={styles.input}
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder="Re-enter your password"
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>
    </div>
  );
}
