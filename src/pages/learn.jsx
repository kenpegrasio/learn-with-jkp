import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContextProvider";
import axios from "axios";
import { Link } from "react-router-dom";

function Learn() {
  const subject_map = {
    "673db88214ca337631ef34c6": "competitiveProgramming",
    "673db9fec35410d043d65647": "computerVision",
    "673dba15c35410d043d65649": "arduino",
    "673dd45523150842ad2be2ac": "python",
    "675c927a0962f5564cc97029": "fastArithmetic",
  };

  const extractYouTubeVideoID = (url) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/v\/|embed\/|v=))([\w-]{11})/
    );
    return match ? match[1] : null;
  };
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { user } = useContext(UserContext);

  const [checkedValues, setCheckedValues] = useState({
    competitiveProgramming: true,
    computerVision: true,
    arduino: true,
    python: true,
    fastArithmetic: true,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedValues((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    setPage(1);
  };

  const handlePage = (event) => {
    const selectedValue = event.target.value;
    const parsedValue = parseInt(selectedValue, 10);
    if (!isNaN(parsedValue)) {
      setPage(parsedValue);
    } else {
      console.log("Invalid input:", selectedValue);
    }
  };

  useEffect(() => {
    console.log("Fetching Materials");
    axios
      .get(`https://learn-with-jkp-api.vercel.app/api/material`)
      .then((res) => {
        // console.log("Res.data: ", res.data);
        let cnt = 4;
        let filtered = [];
        for (let idx = 0; idx < res.data.length; idx++) {
          if (checkedValues[subject_map[res.data[idx].subject_id]]) {
            filtered.push(
              Object.assign({}, res.data[idx], { page: Math.floor(cnt / 4) })
            );
            cnt++;
          }
        }
        setMaterials(filtered);
      });
    setLoading(false);
  }, [checkedValues]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const options = Array.from(
    { length: Math.ceil(materials.length / 4) },
    (_, i) => i + 1
  );

  return (
    <>
      <Navbar />
      <div className="flex flex-col text-center md:flex-row">
        <div className="bg-customWhite p-5 flex flex-col md:w-1/4">
          <h1 className="text-xl font-bold my-3">Category</h1>
          <div>
            <label>
              <input
                type="checkbox"
                name="competitiveProgramming"
                checked={checkedValues.competitiveProgramming}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Competitive Programming
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="computerVision"
                checked={checkedValues.computerVision}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Computer Vision
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="arduino"
                checked={checkedValues.arduino}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Arduino
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="python"
                checked={checkedValues.python}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Python
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="fastArithmetic"
                checked={checkedValues.fastArithmetic}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Fast Arithmetic
            </label>
          </div>
          <br />
          <div className="flex flex-col items-center justify-center space-y-2">
            <label
              htmlFor="page-select"
              className="text-sm font-medium text-gray-700"
            >
              Select a page:
            </label>
            <select
              id="page-select"
              className="w-40 p-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={page} // Controlled select
              onChange={handlePage}
            >
              {options.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          {user.accesstype === "Administrator" ? (
            <Link to="/add-material">
              <button className="my-3 inline-block justify-center align-center text-center text-white bg-customBlue border border-black rounded-3xl px-5 min-h-10 hover:bg-customWhite hover:text-customBlue hover:scale-110">
                Add Material
              </button>
            </Link>
          ) : (
            <></>
          )}
          {user.accesstype === "Administrator" ? (
            <Link to="/delete-material">
              <button className="my-1 inline-block justify-center align-center text-center text-white bg-customBlue border border-black rounded-3xl px-5 min-h-10 hover:bg-customWhite hover:text-customBlue hover:scale-110">
                Delete Material
              </button>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className="bg-customWhite h-fit p-5 md:w-3/4">
          <h1 className="font-bold text-xl text-center">Materials</h1>
          <div className="align-center justify-center md:flex md:flex-wrap">
            {materials
              .filter((material) => {
                const isChecked =
                  checkedValues[subject_map[material.subject_id]];
                return isChecked && material.page == page;
              })
              .map((material) => {
                return (
                  <div
                    key={material.id}
                    className="flex flex-col align-center justify-center text-center m-5 md:w-2/5"
                  >
                    <div className="flex align-center justify-center">
                      <iframe
                        className="w-full aspect-video"
                        src={`https://www.youtube.com/embed/${extractYouTubeVideoID(
                          material.resource
                        )}`}
                        allowFullScreen
                      ></iframe>
                    </div>
                    <p className="font-bold">Video Title:</p>
                    <p>{material.name}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Learn;
