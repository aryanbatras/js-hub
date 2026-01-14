import { FaSquareJs } from "react-icons/fa6";
import "./index.sass";
function Section1({insideMac = false}) {
  return (
    <div className={`homepage__section1 ${insideMac ? 'homepage__section1--insideMac' : ''}`}>
        <div className="homepage__section1__content">
          <FaSquareJs className={`homepage__jsicon ${insideMac ? 'homepage__jsicon--insideMac' : ''}`} />
          <span>
            The <span>challenging</span> <br /> 
            way to learn <span>JavaScript</span>
          </span>
        </div>
      </div>
  );
}
export default Section1;
