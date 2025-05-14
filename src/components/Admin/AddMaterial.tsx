import { useContext, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { UserContext } from "../../UserContextProvider";
import { SubjectContext, Subject } from "../../SubjectContextProvider";
import axios from "axios";

interface Inputs {
  title: string;
  resource: string;
  subject_id: string;
}

const AddMaterial: React.FC = () => {
  const userContext = useContext(UserContext);
  const subjectContext = useContext(SubjectContext);

  if (!userContext || !subjectContext) {
    return <p>Context not available</p>;
  }

  const { user } = userContext;
  const { subjects, setSubjects } = subjectContext;

  const [loading, setLoading] = useState<boolean>(true);
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    resource: "",
    subject_id: "",
  });

  useEffect(() => {
    axios
      .get<Subject[]>("https://learn-with-jkp-api.vercel.app/api/subject")
      .then((res) => {
        setSubjects(res.data);
        setLoading(false);
      });
  }, [setSubjects]);

  if (!user || user.accesstype !== "Administrator") {
    return <p>Unauthorized</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    axios
      .post("https://learn-with-jkp-api.vercel.app/api/material", {
        name: inputs.title,
        resource: inputs.resource,
        subject_id: inputs.subject_id,
      })
      .then((res) => {
        alert("Data saved!");
        window.location.href = "/learn";
      })
      .catch((err) => {
        console.error("Failed to submit material:", err);
        alert("Error submitting data");
      });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col justify-center align-center p-10 text-center">
      <h1 className="text-2xl font-bold">List of Subjects</h1>
      <br />
      {subjects.map((subject) => (
        <p key={subject._id}>
          <strong>{subject.name}</strong> ~ {subject._id}
        </p>
      ))}
      <div className="pb-10" />
      <form
        className="flex flex-col align-center justify-center"
        onSubmit={handleSubmit}
      >
        <label>
          Title:
          <input
            className="mx-2 px-2 rounded-md border-2 border-black"
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Resource:
          <input
            className="mx-2 px-2 rounded-md border-2 border-black"
            type="text"
            name="resource"
            value={inputs.resource}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Subject ID:
          <input
            className="mx-2 px-2 rounded-md border-2 border-black"
            type="text"
            name="subject_id"
            value={inputs.subject_id}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <div>
          <button
            type="submit"
            className="inline-block justify-center align-center text-center text-white bg-customBlue border border-black rounded-3xl px-5 min-h-10 hover:bg-customWhite hover:text-customBlue hover:scale-110"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMaterial;
