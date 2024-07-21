import { useState } from "react";
import "./LoginPage.css";
import { setLogin } from "../../redux/state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { store } from "../../redux/store"
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');

      }

      const loggedIn = await response.json();

      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token
        })
      );

      console.log(loggedIn);
      toast.success("Login successful!");
      navigate("/");
      console.log("Login sucessful");
    } catch (err) {
      toast.error(`Login failed: ${err.message}`);
    }
  };

  return (<div className="login-page">
    <Navbar />
    <div className="login">
      <div className="login_content">
        <img className="logo" src="/assets/logo.png" alt="website identity" />
        <h1>Sign in to your account</h1>
        <span>Enter your email and password below to access your account.</span>

        <form className="login_content_form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign in</button>
        </form>

        <span className="signup-text">
          Don't have an account?
          <Link className="signup-link" to="/register">{" "} Sign Up Here</Link>
        </span>
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default LoginPage;
