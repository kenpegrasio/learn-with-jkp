import { useEffect, useState } from "react";
import axios from "axios";

function DeleteMaterial() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputs, setInputs] = useState({});
  useEffect(() => {
    console.log("Fetching data");
    axios.get(`https://learn-with-jkp-api.vercel.app/api/material`).then((res) => {
      setMaterials(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .delete(`https://learn-with-jkp-api.vercel.app/api/material/${inputs.id}`)
      .then(() => {
        alert("Data deleted successfully");
        window.location.href = `/learn`;
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="text-center pt-5">
      <h1 className="font-bold text-xl pb-2">List of Materials</h1>
      {materials.map((material) => {
        return (
          <p key={material._id}>
            <strong>{material.name}</strong> ~ {material._id}
          </p>
        );
      })}
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input
            type="text"
            name="id"
            value={inputs.id || ""}
            onChange={handleChange}
            className="border border-black my-2 rounded-lg p-1"
          />
        </label>
        <br />
        <button className="inline-block justify-center align-center text-center text-white bg-customBlue border border-black rounded-3xl px-5 min-h-10 hover:bg-customWhite hover:text-customBlue hover:scale-110" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default DeleteMaterial;
