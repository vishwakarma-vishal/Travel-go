import { useEffect, useState } from "react";
import "../../style/List.css";
import Loader from "../../components/Loader/Loader";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../../redux/state";
import ListingCard from "../../components/ListingCard/ListingCard";
import Footer from "../../components/Footer/Footer";

const TripList = () => {
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const tripList = useSelector((state) => state.user.user.tripList);

    const dispatch = useDispatch();

    const userId = user.user._id;

    // Fetch all trips
    const getTripList = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_APP_API_URL}/users/${userId}/trips`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`, // Pass the token if required
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            dispatch(setTripList(data));
        } catch (err) {
            console.log("Fetch Trip List failed!", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            getTripList();
        }
    }, [userId]);

    return loading ? (
        <Loader />
    ) : (
        <div className="trip-list">
            <Navbar />

            <h1 className="title-list">Your Trip List</h1>
            <div className="list">
                {
                    tripList.length == 0 ?
                        <p>You don't have any active trip.</p> :
                        tripList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking = true }, index) => (
                            <ListingCard
                                key={index}
                                _id={listingId._id}
                                creator={hostId._id}
                                listingPhotoPaths={listingId.listingPhotoPaths}
                                city={listingId.city}
                                province={listingId.province}
                                country={listingId.country}
                                category={listingId.category}
                                startDate={startDate}
                                endDate={endDate}
                                totalPrice={totalPrice}
                                booking={booking}
                            />
                        ))
                }
            </div>

            <Footer />
        </div>
    );
};

export default TripList;
