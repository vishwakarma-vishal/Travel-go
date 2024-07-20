import "../../style/List.css";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import ListingCard from "../../components/ListingCard/ListingCard";
import Footer from "../../components/Footer/Footer"

const WishList = () => {
  const wishList = useSelector((state) => state.user.user.wishList);

  return (
    <>
      <Navbar />
      <h1 className="title-list">Your Wish List</h1>
      <div className="list">
        {
          wishList.length == 0 ?
            <p>There is nothing in your wishlist.</p> :
            wishList?.map(
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
              }) => (
                <ListingCard
                  key={_id}
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

export default WishList;
