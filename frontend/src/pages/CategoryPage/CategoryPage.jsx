import { useState, useEffect } from "react";
import "../../style/List.css";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../../redux/state";
import Loader from "../../components/Loader/Loader";
import ListingCard from "../../components/ListingCard/ListingCard";
import Footer from "../../components/Footer/Footer";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.user.listings);

  // Get all category listings
  const getFeedListings = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/properties?category=${category}`,
        {
          method: "GET",
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }
  
      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [category]); // Dependency on category ensures the effect runs when category changes

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">{category} listings</h1>
      <div className="list">
        {listings.length === 0 ? (
          <p>No listings for this category</p>
        ) : (
          listings.map(
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
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
