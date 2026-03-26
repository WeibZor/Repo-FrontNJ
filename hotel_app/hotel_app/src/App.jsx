import Menu from "./Components/Menu"
import About from "./Components/About"
import Rooms from "./Components/Rooms"
import Banner from "./Components/Banner"
import Ours from "./Components/Ours"
import Contact from "./Components/Contact"
import Footer from "./Components/Footer"

export default function App() {
  return (
    <>
      <Menu />
      <Banner />
      <div className="w3-content" style={{maxWidth:"1532px"}}>
        <Rooms />
        <About />
        <Ours />
        <Contact />
      </div>
      <Footer />
    </>
  )
}
