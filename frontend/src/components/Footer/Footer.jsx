import "./Footer.css";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_left">
        <Link to="/">
          <img src="/assets/logo.png" alt="logo" />
        </Link>
      </div>

      <div className="footer_center">
        <h3>Useful Links</h3>
        <ul>
          <li>Privacy</li>
          <li>Terms and Conditions</li>
          <li>Sitemap</li>
          <li>Company details</li>
        </ul>
      </div>

      <div className="footer_right">
        <h3>Get in touch</h3>
        <div className="footer_right_info">
          <FaPhoneAlt />
          <p>0123456789</p>
        </div>
        <div className="footer_right_info">
          <FaEnvelope />
          <p>Travelgo@support.com</p>
        </div>

        <div className="social-icons">
          <a href="#" className="social-icon" target="_blank">
            <FaFacebookF />
          </a>
          <a href="#" className="social-icon" target="_blank">
            <FaTwitter />
          </a>
          <a href="#" className="social-icon" target="_blank">
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
