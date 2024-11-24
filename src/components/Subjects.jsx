import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContextProvider";
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
    <div className="subjects">
      {subjects.map((subject) => {
        return (
          <div className="subject">
            <h1>
              <Link to={`/learn/${subject._id}`}>
                {subject.name}
              </Link>
            </h1>
            <img className="subject-image" src={subject.path} />
            <p>{subject.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Subjects;
