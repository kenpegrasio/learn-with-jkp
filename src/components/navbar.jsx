import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <img src="/Icon.jpg" id="logo" />
        <h1 className="white">Learn With JKP</h1>
      </div>
      <div className="menu">
        <Link to="/">
          <h3 className="white">Home</h3>
        </Link>
      </div>
      <div className="menu">
        <Link to="/learn">
          <h3 className="white">Learn</h3>
        </Link>
      </div>
      <div className="menu">
        <Link to="/about">
          <h3 className="white">About Me</h3>
        </Link>
      </div>
      <div className="menu">
        <Link to="/account">
          <h3 className="white">Account</h3>
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;
