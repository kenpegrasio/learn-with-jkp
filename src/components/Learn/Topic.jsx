import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../UserContextProvider";
import Navbar from "../navbar";
import Footer from "../Footer";
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
    axios
      .get(`https://learn-with-jkp-api.vercel.app/api/material/${id}`)
      .then((res) => {
        console.log("Res.data: ", res.data);
        setMaterials(res.data);
      });
    axios
      .get(`https://learn-with-jkp-api.vercel.app/api/subject/${id}`)
      .then((res) => {
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
      <br />
      <div class="flex justify-center align-center">
        {user.accesstype === "Administrator" ? (
          <Link to="/add-material">
            <button class="inline-block justify-center align-center text-center text-white bg-customBlue border border-black rounded-3xl px-5 min-h-10 hover:bg-customWhite hover:text-customBlue hover:scale-110">
              Add Material
            </button>
          </Link>
        ) : (
          <></>
        )}
        {user.accesstype === "Administrator" ? (
          <Link to="/delete-material">
            <button class="inline-block justify-center align-center text-center text-white bg-customBlue border border-black rounded-3xl px-5 min-h-10 hover:bg-customWhite hover:text-customBlue hover:scale-110">
              Delete Material
            </button>
          </Link>
        ) : (
          <></>
        )}
      </div>
      <br />
      <h1 class="text-center text-2xl font-bold">{name}</h1>
      <div class="flex-wrap justify-center align-center">
        {materials.map((material) => {
          return (
            <div class="flex flex-col align-center justify-center text-center m-5">
              <div class="flex align-center justify-center m-3">
                <iframe
                  class="basis-1/2 aspect-video"
                  src={`https://www.youtube.com/embed/${extractYouTubeVideoID(
                    material.resource
                  )}`}
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
              <p class="font-bold">Video Title:</p>
              <p>{material.name}</p>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default Topic;
