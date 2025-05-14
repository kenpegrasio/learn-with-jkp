import Footer from "../components/Footer";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContextProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "@/layout";

interface Material {
  id: string;
  name: string;
  resource: string;
  subject_id: string;
  page: number;
}

function Learn() {
  // Define subject_map directly as before
  const subject_map: { [key: string]: string } = {
    "673db88214ca337631ef34c6": "competitiveProgramming",
    "673db9fec35410d043d65647": "computerVision",
    "673dba15c35410d043d65649": "arduino",
    "673dd45523150842ad2be2ac": "python",
    "675c927a0962f5564cc97029": "fastArithmetic",
  };

  const extractYouTubeVideoID = (url: string): string | null => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/v\/|embed\/|v=))([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const { user } = useContext(UserContext);

  const [checkedValues, setCheckedValues] = useState<{
    [key: string]: boolean;
  }>({
    competitiveProgramming: true,
    computerVision: true,
    arduino: true,
    python: true,
    fastArithmetic: true,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckedValues((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    setPage(1); // Reset page when filters change
    setLoading(true);
  };

  const handlePage = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
    axios.get("https://learn-with-jkp-api.vercel.app/api/material").then((res) => {
      let cnt = 4;
      let filtered = res.data.filter((material: Material) => {
        return checkedValues[subject_map[material.subject_id]];
      }).map((material: Material) => {
        return { ...material, page: Math.floor(cnt / 4) };
      });

      setMaterials(filtered);
      setLoading(false);
    });
  }, [checkedValues]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const options = Array.from({ length: Math.ceil(materials.length / 4) }, (_, i) => i + 1);

  return (
    <Layout>
      <div className="flex flex-col text-center md:flex-row">
        <div className="bg-customWhite p-5 flex flex-col md:w-1/4">
          <h1 className="text-xl font-bold my-3">Category</h1>
          {Object.keys(checkedValues).map((category) => (
            <div key={category}>
              <label>
                <input
                  type="checkbox"
                  name={category}
                  checked={checkedValues[category]}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                {category.replace(/([A-Z])/g, " $1").trim()}
              </label>
            </div>
          ))}
          <br />
          <div className="flex flex-col items-center justify-center space-y-2">
            <label htmlFor="page-select" className="text-sm font-medium text-gray-700">
              Select a page:
            </label>
            <select
              id="page-select"
              className="w-40 p-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={page}
              onChange={handlePage}
            >
              {options.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          {user && user.accesstype === "Administrator" && (
            <>
              <Link to="/add-material">
                <button className="my-3 inline-block justify-center align-center text-center text-white bg-customBlue border border-black rounded-3xl px-5 min-h-10 hover:bg-customWhite hover:text-customBlue hover:scale-110">
                  Add Material
                </button>
              </Link>
              <Link to="/delete-material">
                <button className="my-1 inline-block justify-center align-center text-center text-white bg-customBlue border border-black rounded-3xl px-5 min-h-10 hover:bg-customWhite hover:text-customBlue hover:scale-110">
                  Delete Material
                </button>
              </Link>
            </>
          )}
        </div>
        <div className="bg-customWhite h-fit p-5 md:w-3/4">
          <h1 className="font-bold text-xl text-center">Materials</h1>
          <div className="align-center justify-center md:flex md:flex-wrap">
            {materials
              .filter((material) => material.page === page)
              .map((material) => (
                <div
                  key={material.id}
                  className="flex flex-col align-center justify-center text-center m-5 md:w-2/5"
                >
                  <div className="flex align-center justify-center">
                    <iframe
                      className="w-full aspect-video"
                      src={`https://www.youtube.com/embed/${extractYouTubeVideoID(material.resource)}`}
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="font-bold">Video Title:</p>
                  <p>{material.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default Learn;
