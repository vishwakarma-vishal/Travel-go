import Navbar from "../../components/Navbar/Navbar"
import Slide from "../../components/Slide/Slide"
import Categories from "../../components/Categories/Categories"
import Listings from "../../components/Listings/Listings"
import Footer from "../../components/Footer/Footer"

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Slide />
      <Categories />
      <Listings />
      <Footer />
    </>
  )
}

export default HomePage