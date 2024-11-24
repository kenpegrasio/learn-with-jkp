import { Link } from "react-router-dom";
import "../../styles/MiniAbout.css";

function MiniAbout() {
  return (
    <div className="mini-about">
      <div className="text-display">
        <h1>About Me</h1>
        <p>
          I'm Jansen Ken Pegrasio, <br />
          an Electrical Engineering undergraduate <br />
          at the National University of Singapore. <br /> <br />
          I'm really fascinated with the beauty of technology <br />
          and longed to share and contribute to society <br />
        </p>
        <Link to="/about">
          <button className="button-18">About Me</button>
        </Link>
      </div>
      <div className="image-display"></div>
    </div>
  );
}

export default MiniAbout;
