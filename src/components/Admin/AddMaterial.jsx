import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContextProvider";
import { SubjectContext } from "../../SubjectContextProvider";
import axios from "axios";
import "../../styles/AddMaterial.css";

function AddMaterial() {
  const { user } = useContext(UserContext);
  const { subjects, setSubjects } = useContext(SubjectContext);
  const [loading, setLoading] = useState(true);
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    console.log("Fetching data");
    axios.get(`https://learn-with-jkp-api.vercel.app/api/subject`).then((res) => {
      // console.log(res.data);
      setSubjects(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  //   console.log(user);
  //   console.log(subjects);

  if (user.accesstype !== "Administrator") {
    return <p>Unauthorized</p>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    axios
      .post(`https://learn-with-jkp-api.vercel.app/api/material`, {
        name: inputs.title,
        resource: inputs.resource,
        subject_id: inputs.subject_id,
      })
      .then((res) => {
        console.log(res);
        alert("Data saved!");
        window.location.href = `/learn/${inputs.subject_id}`;
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <>
      <h1>List of Subjects</h1>
      {subjects.map((subject) => {
        return (
          <>
            <p>
              {subject.name} ~ {subject._id}
            </p>
          </>
        );
      })}
      <form className="add-material-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Resource:
          <input
            type="text"
            name="resource"
            value={inputs.resource}
            onChange={handleChange}
          />
        </label>
        <label>
          Subject ID:
          <input
            type="text"
            name="subject_id"
            value={inputs.subject_id}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default AddMaterial;
