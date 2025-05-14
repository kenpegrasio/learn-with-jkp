import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../UserContextProvider";

// Define types for User and the response from the API
interface User {
  email: string;
  name: string;
  accesstype?: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get<User[]>("https://learn-with-jkp-api.vercel.app/api/user");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user && user.accesstype !== "Administrator") {
    return <p>Unauthorized</p>;
  }

  return (
    <div>
      <h1>Users List</h1>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <p key={user.email}>
            {user.email} ~ {user.name} ~ {user.accesstype}
          </p>
        ))
      )}
    </div>
  );
};

export default UsersList;
