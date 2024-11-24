import "../../styles/TopicList.css";
import { Link } from "react-router-dom";
import Subjects from "../Subjects";

function TopicList() {
  return (
    <div className="topic-list">
      <Subjects />
      <div className="topic-description">
        <h1>Let's Learn Together</h1>
        <Link to="/learn">
          <button className="button-18">Dive Deeper</button>
        </Link>
      </div>
    </div>
  );
}

export default TopicList;
