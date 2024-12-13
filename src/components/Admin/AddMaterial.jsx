import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContextProvider";
import { SubjectContext } from "../../SubjectContextProvider";
import axios from "axios";

function AddMaterial() {
  const { user } = useContext(UserContext);
  const { subjects, setSubjects } = useContext(SubjectContext);
  const [loading, setLoading] = useState(true);
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    console.log("Fetching data");
    axios
      .get(`https://learn-with-jkp-api.vercel.app/api/subject`)
      .then((res) => {
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
        window.location.href = `/learn`;
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div class="flex flex-col justify-center align-center p-10 text-center">
      <h1 class="text-2xl font-bold">List of Subjects</h1>
      <br />
      {subjects.map((subject) => {
        return (
          <>
            <p>
              <strong>{subject.name}</strong> ~ {subject._id}
            </p>
          </>
        );
      })}
      <div class="pb-10"></div>
      <form
        class="flex flex-col align-center justify-center"
        onSubmit={handleSubmit}
      >
        <label>
          Title:
          <input
            class="mx-2 px-2 rounded-md border-2 border-black"
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Resource:
          <input
            class="mx-2 px-2 rounded-md border-2 border-black"
            type="text"
            name="resource"
            value={inputs.resource}
            onChange={handleChange}
          />
        </label>
        <label>
          Subject ID:
          <input
            class="mx-2 px-2 rounded-md border-2 border-black"
            type="text"
            name="subject_id"
            value={inputs.subject_id}
            onChange={handleChange}
          />
        </label>
        <br />
        <div>
          <button class="inline-block justify-center align-center text-center text-white bg-customBlue border border-black rounded-3xl px-5 min-h-10 hover:bg-customWhite hover:text-customBlue hover:scale-110">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMaterial;
