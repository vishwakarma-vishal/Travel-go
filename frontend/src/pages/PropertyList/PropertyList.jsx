import { useEffect, useState } from "react";
import "../../style/List.css";
import Navbar from "../../components/Navbar/Navbar";
import ListingCard from "../../components/ListingCard/ListingCard";
import { useDispatch, useSelector } from "react-redux";
import { setPropertyList } from "../../redux/state";
import Loader from "../../components/Loader/Loader";
import Footer from "../../components/Footer/Footer";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const propertyList = useSelector((state) => state.user.user.propertyList);
  const dispatch = useDispatch();

  const userId = user.user._id;

  // Get the property list from server of logged in user
  const getPropertyList = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/users/${userId}/properties`, {
        method: "GET",
      });
      const data = await response.json();
      dispatch(setPropertyList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch all properties failed", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, [userId]); // Dependency array with userId

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />

      <h1 className="title-list">Your Property List</h1>
      <div className="list">
        {
          propertyList.length == 0 ?
            <p>You haven't added any property yet.</p> :
            propertyList?.map(
              ({
                _id,
                creator,
                listingPhotoPaths,
                city,
                province,
                country,
                category,
                type,
                price,
                booking = false,
              }, index) => (
                <ListingCard
                  key={index}
                  listingId={_id}
                  creator={creator}
                  listingPhotoPaths={listingPhotoPaths}
                  city={city}
                  province={province}
                  country={country}
                  category={category}
                  type={type}
                  price={price}
                  booking={booking}
                />
              )
            )}
      </div>

      <Footer />
    </>
  );
};

export default PropertyList;
