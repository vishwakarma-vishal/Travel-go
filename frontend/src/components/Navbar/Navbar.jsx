import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaBars } from "react-icons/fa";
import { setLogout } from "../../redux/state";
import { toast } from "react-toastify";
import "./Navbar.css";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  // Directly access user and token from state
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login"); // Redirect to login page after logout
  };

  const handleClick = (e) => {
    if (!token) {
      e.preventDefault(); // Prevent the default link action
      toast.warning("Log in to add a property");
      navigate("/login");
    }
  };

  return (
    <div className="navbar">
      {/* Navbar left - logo */}
      <Link to="/">
        <img className="logo" src="/assets/logo.png" alt="logo" />
      </Link>

      {/* Navbar center - search */}
      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="search_button"
          disabled={search === ""}
          onClick={() => navigate(`/properties/search/${search}`)}
        >
          <FaSearch />
        </button>
      </div>

      {/* Navbar right - user controls */}
      <div className="navbar_right">
        <Link to={token ? "/create-listing" : "/login"} className="host" onClick={handleClick}>
          Become A Host
        </Link>

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <FaBars className="icon_menu" />
          {!token ? (
            <FaUser className="icon_user" />
          ) : (
            user.profileImagePath ? (
              <img
                src={`${user.profileImagePath.replace(
                  "public",
                  ""
                )}`}
                alt="profile icon"
                className="profile_image"
              />
            ) : (
              <FaUser className="icon_user" />
            )
          )}
        </button>

        {/* Menu when user isn't logged in */}
        {dropdownMenu && !token && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}

        {/* Menu when user is logged in */}
        {dropdownMenu && token && (
          <div className="navbar_right_accountmenu">
            <Link to={`/${user._id}/trips`}>Trip List</Link>
            <Link to={`/${user._id}/wishList`}>Wish List</Link>
            <Link to={`/${user._id}/properties`}>Property List</Link>
            <Link to="/create-listing">Become A Host</Link>

            <Link
              to="/login"
              onClick={handleLogout}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
