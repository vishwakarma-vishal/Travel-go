import { useParams } from "react-router-dom";
import "../../style/List.css";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../../redux/state";
import { useEffect, useState, useCallback } from "react";
import Loader from "../../components/Loader/Loader";
import Navbar from "../../components/Navbar/Navbar";
import ListingCard from "../../components/ListingCard/ListingCard";
import Footer from "../../components/Footer/Footer";

const SearchPage = () => {
    const [loading, setLoading] = useState(true);
    const { search } = useParams();
    const listings = useSelector((state) => state.user.listings);
    const dispatch = useDispatch();

    const getSearchListings = useCallback(async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/properties/search/${search}`, {
                method: "GET"
            });

            const data = await response.json();
            dispatch(setListings({ listings: data }));
            setLoading(false);
        } catch (err) {
            console.log("Fetch Search List failed!", err.message);
        }
    }, [search, dispatch]);

    useEffect(() => {
        getSearchListings();
    }, [getSearchListings]);

    return loading ? <Loader /> : (
        <>
            <Navbar />
            <h1 className="title-list">Search result for: {search}</h1>
            <div className="list">
                {listings?.length ? (
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
                ) : (
                    <p>Opps! No results found.</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default SearchPage;
