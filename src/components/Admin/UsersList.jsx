import { useEffect, useState } from "react";
import axios from "axios";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`https://learn-with-jkp-api.vercel.app/api/user`).then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  });
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>Users List</h1>
      {users.map((user) => {
        return (
          <p>
            {user.email} ~ {user.name} ~ {user.accesstype}
          </p>
        );
      })}
    </>
  );
}

export default UsersList;
