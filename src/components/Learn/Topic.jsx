import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../UserContextProvider";
import Navbar from "../navbar";
import Footer from "../Footer";
import "../../styles/Topic.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Topic() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [name, setName] = useState("");

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const extractYouTubeVideoID = (url) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/v\/|embed\/|v=))([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  useEffect(() => {
    console.log("Fetching Materials");
    axios.get(`https://learn-with-jkp-api.vercel.app/api/material/${id}`).then((res) => {
      console.log("Res.data: ", res.data);
      setMaterials(res.data);
    });
    axios.get(`https://learn-with-jkp-api.vercel.app/api/subject/${id}`).then((res) => {
      console.log("Res.data: ", res.data);
      setName(res.data.name);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="topic">
        <h1>{name}</h1>
        {user.accesstype === "Administrator" ? (
          <Link to="/add-material">
            <button className="button-18">Add Material</button>
          </Link>
        ) : (
          <></>
        )}
        {user.accesstype === "Administrator" ? (
          <Link to="/delete-material">
            <button className="button-18">Delete Material</button>
          </Link>
        ) : (
          <></>
        )}
        <div className="material-list">
          {materials.map((material) => {
            return (
              <div className="material">
                <iframe
                  src={`https://www.youtube.com/embed/${extractYouTubeVideoID(
                    material.resource
                  )}`}
                  frameborder="0"
                  allowfullscreen
                ></iframe>
                <p>Video Title: {material.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Topic;
