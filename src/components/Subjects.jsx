import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SubjectContext } from "../SubjectContextProvider";

function Subjects() {
  const { subjects, setSubjects } = useContext(SubjectContext);
  const [loading, setLoading] = useState(true);

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
  return (
    <div class="flex flex-wrap align-center justify-center bg-customWhite">
      {subjects.map((subject) => {
        return (
          <div class="justify-center align-center text-center py-10 p-3 mx-5 md:basis-2/5">
            <h1>
              <Link class="font-bold text-2xl" to={`/learn/${subject._id}`}>
                {subject.name}
              </Link>
            </h1> <br/>
            <img class="rounded-2xl" src={subject.path} /> <br/>
            <p>{subject.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Subjects;
