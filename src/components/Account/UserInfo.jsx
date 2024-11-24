import Login from "./login";
import Logout from "./logout";
import "../../styles/UserInfo.css";
import { useContext } from "react";
import { UserContext } from "../../UserContextProvider";
import { Link } from "react-router-dom";

function UserInfo() {
  const { user } = useContext(UserContext);
  if (Object.keys(user).length === 0) {
    return (
      <div className="user-info">
        <h1>User Information</h1>
        <p>Not registered yet</p>
        <Login />
      </div>
    );
  } else {
    return (
      <div className="user-info">
        <h1>User Information</h1>
        {user.accesstype === "Administrator" ? (
          <Link to="/users-list">
            <button className="button-18">Users List</button>
          </Link>
        ) : (
          <></>
        )}
        <img
          src={user.picture}
          alt="User Profile"
          className="profile-picture"
        />
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Access Type: {user.accesstype}</p>
        <p>Points: {user.point}</p>
        <Logout />
      </div>
    );
  }
}

export default UserInfo;
