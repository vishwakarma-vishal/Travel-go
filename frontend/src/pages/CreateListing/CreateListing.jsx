import "./CreateListing.css"; // Use simple CSS
import Navbar from "../../components/Navbar/Navbar";
import { categories, types, facilities } from "../../data"; // Get the data from data.js

import { IoRemoveCircleOutline, IoAddCircleOutline } from "react-icons/io5";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { toast } from "react-toastify";

const CreateListing = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  /* LOCATION */
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  /* BASIC COUNTS */
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  /* AMENITIES */
  const [amenities, setAmenities] = useState([]);

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  /* DESCRIPTION */
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  const creatorId = useSelector((state) => state.user.user._id);

  // In a component or a Redux selector
  const user = useSelector((state) => state.user);


  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      /* Create a new FormData onject to handle file uploads */
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("type", type || "");
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      // listingForm.append("amenities", amenities);
      listingForm.append("amenities", amenities.join(", ") || "");
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDesc", formDescription.highlightDesc);
      listingForm.append("price", formDescription.price);

      /* Append each selected photos to the FormData object */
      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });


      /* Send a POST request to server */
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/properties/create`, {
        method: "POST",
        body: listingForm,
      });


      const result = await response.json(); // Parse response as JSON

      if (response.ok) {
        toast.success("Listing created successfully!");
        navigate("/");
      } else {
        toast.error(result.message || "Failed to create listing");
      }
    } catch (err) {
      console.log("Publish Listing failed", err.message);
      toast.error("An error occurred while creating the listing");
    }
  };

  return (
    <>
      <Navbar />

      {/* form to create listing */}
      <div className="create-listing">
        <h1>Publish Your Place</h1>

        <form onSubmit={handlePost}>
          {/* step-1  */}
          <div className="create-listing_step1">
            <h2>Step 1: Tell us about your place</h2>
            <hr />

            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${category === item.label ? "selected" : ""
                    }`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                  required
                >
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <h3>What type of place will guests have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  className={`type ${type === item.name ? "selected" : ""}`}
                  key={index}
                  onClick={() => setType(item.name)}
                  required
                >
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>

            <h3>Where's your place located?</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Apartment, Suite, etc. (if applicable)</p>
                <input
                  type="text"
                  placeholder="Apt, Suite, etc. (if applicable)"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Province</p>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <h3>Share some basics about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guests</p>
                <div className="basic_count">
                  <IoRemoveCircleOutline
                    onClick={() => {
                      guestCount > 1 && setGuestCount(guestCount - 1);
                    }}
                    style={{
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  />
                  <p>{guestCount}</p>
                  <IoAddCircleOutline
                    onClick={() => {
                      setGuestCount(guestCount + 1);
                    }}
                    style={{
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <IoRemoveCircleOutline
                    onClick={() => {
                      bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                    }}
                    style={{
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  />
                  <p>{bedroomCount}</p>
                  <IoAddCircleOutline
                    onClick={() => {
                      setBedroomCount(bedroomCount + 1);
                    }}
                    style={{
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <IoRemoveCircleOutline
                    onClick={() => {
                      bedCount > 1 && setBedCount(bedCount - 1);
                    }}
                    style={{
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  />
                  <p>{bedCount}</p>
                  <IoAddCircleOutline
                    onClick={() => {
                      setBedCount(bedCount + 1);
                    }}
                    style={{
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <IoRemoveCircleOutline
                    onClick={() => {
                      bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
                    }}
                    style={{
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  />
                  <p>{bathroomCount}</p>
                  <IoAddCircleOutline
                    onClick={() => {
                      setBathroomCount(bathroomCount + 1);
                    }}
                    style={{
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* step-2 */}
          <div className="create-listing_step2">
            <h2>Step 2: Make your place stand out</h2>
            <hr />

            <h3>What amenities do you offer?</h3>
            <div className="amenities">
              {facilities?.map((facility, index) => (
                <div
                  className={`facility ${amenities.includes(facility.name) ? "selected" : ""
                    }`}
                  key={index}
                  onClick={() => handleSelectAmenities(facility.name)}
                >
                  <div className="facility_icon">{facility.icon}</div>
                  <p>{facility.name}</p>
                </div>
              ))}
            </div>

            <h3>Upload some photos of your place</h3>
            <div className="photo-upload">
              <input
                type="file"
                multiple
                name = "listingPhotos"
                accept="image/*"
                onChange={handleUploadPhotos}
                id="upload-photos"
                style={{ display: "none" }}
              />
              <label htmlFor="upload-photos" className="photo-upload_label">
                <IoIosImages style={{ fontSize: "30px", color: "#7d7d7d" }} />
                <p>Upload Photos</p>
              </label>
            </div>

            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos-list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos?.map((photo, index) => (
                      <Draggable
                        key={index}
                        draggableId={`photo-${index}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="photo-item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <img
                              src={URL.createObjectURL(photo)}
                              alt="upload-preview"
                            />
                            <BiTrash
                              className="remove-photo"
                              onClick={() => handleRemovePhoto(index)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          {/* step-3 */}
          <div className="create-listing_step3">
            <h2>Step 3: Provide a description</h2>
            <hr />

            <h3>Create a title for your listing</h3>
            <div className="description">
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                required
              />
            </div>

            <h3>Create a description for your listing</h3>
            <div className="description">
              <textarea
                placeholder="Description"
                name="description"
                value={formDescription.description}
                onChange={handleChangeDescription}
                rows="6"
                required
              ></textarea>
            </div>

            <h3>Highlight your listing</h3>
            <div className="highlight">
              <input
                type="text"
                placeholder="Highlight (optional)"
                name="highlight"
                value={formDescription.highlight}
                onChange={handleChangeDescription}
              />
              <textarea
                placeholder="Highlight Description (optional)"
                name="highlightDesc"
                value={formDescription.highlightDesc}
                onChange={handleChangeDescription}
                rows="3"
              ></textarea>
            </div>

            <h3>Set a price for your listing</h3>
            <div className="price">
              <input
                type="number"
                placeholder="$ Price"
                name="price"
                value={formDescription.price}
                onChange={handleChangeDescription}
                required
              />
            </div>
          </div>

          {/* submit button */}
          <div className="create-listing_submit">
            <button className="submit_btn" type="submit">Create Your Listing</button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default CreateListing;
