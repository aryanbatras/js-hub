import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Section1 from "./section1";
import Section3 from "./section3";
// import Section4 from "./section4";
import SectionMacBook from "./section-macbook";
import SectionThreeJs from "./section-threejs";
import PhysicsSection from "./section-physics";
function Homepage({insideMac = false}) {
  return (
    <>
    {insideMac === false && <Navbar/>}
      <Section1 insideMac={insideMac}/>
      {insideMac === false && <SectionThreeJs/>}
      {insideMac === true && <Section3 insideMac={insideMac}/>}
      {insideMac === false && <SectionMacBook/>}
      {insideMac === false && <Footer/>}
      {insideMac === false && <PhysicsSection/>}
    </>
  );
}
export default Homepage;
