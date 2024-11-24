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
    <>
      <h1>List of Materials</h1>
      {materials.map((material) => {
        return (
          <p key={material._id}>
            {material.name} ~ {material._id}
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
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default DeleteMaterial;
