import { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../../redux/state";
import "./ListingCard.css";

const ListingCard = ({
  listingId,
  _id,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
}) => {
  let propertyId;
  if (_id) {
    propertyId = _id;
  } else {
    propertyId = listingId;
  }

  /* SLIDER FOR IMAGES */
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ADD TO WISHLIST */
  const user = useSelector((state) => state.user.user);
  const wishList = user?.wishList || [];

  const isLiked = wishList.find((item) => item?._id === _id);

  const patchWishList = async () => {
    if (!user?._id) {
      alert("Login to add this to your wishlist");
      return;
    }

    if (user._id === creator._id) {
      alert("This is your own property");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/users/${user._id}/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setWishList(data.wishList));
    } catch (err) {
      console.error("Failed to update wishlist:", err.message);
    }
  };

  return (
    <div
      className="listing-card"
      onClick={() => {
        navigate(`/properties/${propertyId}`);
      }}
    >
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {/* render all the images of property */}
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`${photo?.replace("public", "")}`}
                alt={`img ${index + 1}`}
              />
              <div
                className="prev-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide();
                }}
              >
                <FaArrowLeft size="20px" />
              </div>
              <div
                className="next-button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide();
                }}
              >
                <FaArrowRight size="20px" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="content">
        <h3>
          {city}, {province}, {country}
        </h3>
        {/* <p>{category}</p> */}

        {!booking ? (
          <>
            <p>{type}</p>
            <p>
              <span>${price}</span> per night
            </p>
          </>
        ) : (
          <>
            <p>
              {startDate} - {endDate}
            </p>
            <p>
              <span>${totalPrice}</span> total
            </p>
          </>
        )}

        <button
          className="favorite"
          onClick={(e) => {
            e.stopPropagation();
            patchWishList();
          }}
          disabled={!user}
        >
          <FaHeart color={isLiked ? "red" : "white"} />
        </button>
      </div>
    </div>

  );
};

export default ListingCard;
