import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CreateListing from "./pages/CreateListing/CreateListing";
import ListingDetails from "./pages/ListingDetails/ListingDetails";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import TripList from "./pages/TripList/TripList";
import WishList from "./pages/WishList/WishList";
import PropertyList from "./pages/PropertyList/PropertyList";
import SearchPage from "./pages/SearchPage/SearchPage";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './style/ToastifyCustom.css'

const ProtectedRoute = ({ element }) => {
  const user = useSelector((state) => state.user.user);
  return user && user._id ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer
          position="bottom-right" // Set the default position for all toasts
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/properties/category/:category" element={<CategoryPage />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route path="/properties/search/:search" element={<SearchPage />} />
          {/* ProtectedRoutes */}
          <Route path="/create-listing" element={<ProtectedRoute element={<CreateListing />} />} />
          <Route path="/:userId/trips" element={<ProtectedRoute element={<TripList />} />} />
          <Route path="/:userId/wishList" element={<ProtectedRoute element={<WishList />} />} />
          <Route path="/:userId/properties" element={<ProtectedRoute element={<PropertyList />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
