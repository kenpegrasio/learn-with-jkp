import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface Material {
  _id: string;
  name: string;
}

interface Inputs {
  id: string;
}

const DeleteMaterial: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [inputs, setInputs] = useState<Inputs>({ id: "" });

  useEffect(() => {
    console.log("Fetching data");
    axios
      .get<Material[]>(`https://learn-with-jkp-api.vercel.app/api/material`)
      .then((res) => {
        setMaterials(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching materials:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!inputs.id) {
      alert("Please provide a valid ID");
      return;
    }

    axios
      .delete(`https://learn-with-jkp-api.vercel.app/api/material/${inputs.id}`)
      .then(() => {
        alert("Data deleted successfully");
        window.location.href = "/learn";
      })
      .catch((err) => {
        console.error("Error deleting material:", err);
        alert("Error deleting the material");
      });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div className="text-center pt-5">
      <h1 className="font-bold text-xl pb-2">List of Materials</h1>
      {materials.map((material) => (
        <p key={material._id}>
          <strong>{material.name}</strong> ~ {material._id}
        </p>
      ))}
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input
            type="text"
            name="id"
            value={inputs.id}
            onChange={handleChange}
            className="border border-black my-2 rounded-lg p-1"
          />
        </label>
        <br />
        <button
          type="submit"
          className="inline-block justify-center align-center text-center text-white bg-customBlue border border-black rounded-3xl px-5 min-h-10 hover:bg-customWhite hover:text-customBlue hover:scale-110"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DeleteMaterial;
