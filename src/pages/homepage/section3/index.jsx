import { FaBook, FaCode, FaLightbulb, FaCertificate } from "react-icons/fa6";
import {FaProjectDiagram,FaMobileAlt} from "react-icons/fa";
import {FaArrowRight} from "react-icons/fa6";
import "./index.sass";

function Section3({insideMac}) {
  return (
    <div className={`homepage__section3 ${insideMac ? 'homepage__section3--insideMac' : ''}`}>
      <div className="homepage__section3__content">


        <h1 className="homepage__section3__heading">
          <span className="homepage__section3__line">Learn JavaScript</span>
          <span className="homepage__section3__subline">The modern way</span>
        </h1>

        <div className="homepage__section3__approach">
          <div className="homepage__section3__item">
            <FaBook />
            <span>Interactive Lessons</span>
            <span className="homepage__section3__detail">
              Short, focused lessons in your browser
            </span>
          </div>
          <div className="homepage__section3__item">
            <FaCode />
            <span>Practice Challenges</span>
            <span className="homepage__section3__detail">
              Real-world inspired problems
            </span>
          </div>
          <div className="homepage__section3__item">
            <FaProjectDiagram/>
            <span>Build Projects</span>
            <span className="homepage__section3__detail">
              17 real-life applications
            </span>
          </div>
        </div>

        <div className="homepage__section3__topics">
          <div className="homepage__section3__column">
            <FaLightbulb />
            <span>Modern ES6+</span>
            <span className="homepage__section3__detail">
              Arrow functions, destructuring, async/await
            </span>
          </div>
          <div className="homepage__section3__column">
            <FaMobileAlt />
            <span>DOM & APIs</span>
            <span className="homepage__section3__detail">
              Events, forms, fetch, real APIs
            </span>
          </div>
          <div className="homepage__section3__column">
            <FaCertificate />
            <span>Best Practices</span>
            <span className="homepage__section3__detail">
              Industry-standard patterns
            </span>
          </div>
        </div>

        <button className={`homepage__section3__button ${insideMac ? 'homepage__section3__button--insideMac' : ''}`}>
          <span>Get Started</span>
          <FaArrowRight className="homepage__section3__button__icon"/>
        </button>

      </div>
    </div>
  );
}

export default Section3;
