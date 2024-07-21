import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./RegisterPage.css";
import { toast } from "react-toastify";

const RegisterPage = () => {
  // Object to store the form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  // Update the form data
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  // Password matching
  const [passwordMatch, setPasswordMatch] = useState(true);
  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "");
  }, [formData.password, formData.confirmPassword]);

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerForm = new FormData();

      for (const key in formData) {
        registerForm.append(key, formData[key]);
      }

      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/auth/register`, {
        method: "POST",
        body: registerForm,
      });

      if (response.ok) {
        toast.success("Account created successfully, you can login now.");
        navigate("/login");
      } else {
        toast.error("Registration failed. Please try again.", response.json());
      }
    } catch (err) {
      toast.error(`Registration failed: ${err.message}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="register">
        <div className="register_content">
          <h1>Sign Up</h1>
          <p>Create your account to get started.</p>

          <form className="register_content_form" onSubmit={handleSubmit}>
            <div className="form_grid">
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {!passwordMatch && (
              <p>Passwords do not match!</p>
            )}

            <input
              id="image"
              type="file"
              name="profileImage"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleChange}
              required
            />
            <label htmlFor="image" className="profile_image_upload">
              <IoCloudUploadOutline className="icon" />
              <p className="upload-text"><b>Click to upload</b> or drag and drop<br />
                SVG, PNG, JPG or GIF</p>
            </label>

            {formData.profileImage && (
              <img
                src={URL.createObjectURL(formData.profileImage)}
                alt="profile pic"
                style={{ maxWidth: "80px" }}
              />
            )}
            <button type="submit" disabled={!passwordMatch}>Sign Up</button>
          </form>
          <span className="login-text">
            Already have an account?
            <Link className="login-link" to="/login">Log In Here</Link>
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
