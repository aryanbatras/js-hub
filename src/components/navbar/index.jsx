import { IoIosArrowDown } from "react-icons/io";
import { FaSquareJs } from "react-icons/fa6";
import "./index.sass";
function Navbar() {
  return (
    <nav className="navbar__container">
      <FaSquareJs className="navbar__jsicon" />
      <div className="navbar__links">
        <a href="#">
          <span>Challenges</span>
          <IoIosArrowDown className="navbar__icon" />
        </a>
      </div>
    </nav>
  );
}
export default Navbar;
