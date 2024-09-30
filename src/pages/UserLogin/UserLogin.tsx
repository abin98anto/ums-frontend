import { useState } from "react";
import "./UserLogin.css";

const UserLogin = () => {
  const [signState, setSignState] = useState("Sign In");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const user_auth = (e: React.FormEvent) => {
    e.preventDefault();
    if (signState === "Sign Up") {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      // Handle sign up logic
    } else {
      // Handle sign in logic
    }
  };

  return (
    <>
      <div className="login">
        <div className="login-form">
          <img src="/vite.svg" alt="logo" className="login-logo" />
          <h1>{signState}</h1>
          <form onSubmit={user_auth}>
            {signState === "Sign Up" && (
              <>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Your name"
                />
                <input type="file" accept="image/*" />
              </>
            )}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            {signState === "Sign Up" && (
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm Password"
              />
            )}
            <button type="submit">{signState}</button>
          </form>
          <div className="form-switch">
            {signState === "Sign In" ? (
              <p>
                New to the platform?{" "}
                <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span onClick={() => setSignState("Sign In")}>Login</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
