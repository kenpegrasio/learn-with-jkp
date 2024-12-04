import Login from "./login";
import Logout from "./logout";
import { useContext } from "react";
import { UserContext } from "../../UserContextProvider";
import { Link } from "react-router-dom";

function UserInfo() {
  const { user } = useContext(UserContext);
  if (Object.keys(user).length === 0) {
    return (
      <div class="flex flex-col align-center justify-center text-center bg-customWhite h-screen p-24">
        <h1 class="text-2xl font-bold">User Information</h1>
        <br />
        <p>Not registered yet</p> <br />
        <div>
          <Login />
        </div>
      </div>
    );
  } else {
    return (
      <div class="h-full">
        <div class="flex flex-col align-center justify-center text-center bg-customWhite h-4/5 p-24">
          {user.accesstype === "Administrator" ? (
            <Link to="/users-list">
              <button class="inline-block justify-center align-center text-center text-white bg-customBlue border border-black rounded-3xl px-5 min-h-10 hover:bg-customWhite hover:text-customBlue hover:scale-110">
                Users List
              </button>
            </Link>
          ) : (
            <></>
          )}
          <h1 class="text-2xl font-bold py-5">User Information</h1>
          <div class="flex align-center justify-center m-3">
            <img
              src={user.picture}
              alt="User Profile"
              class="max-w-24 rounded-full"
            />
          </div>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Access Type:</strong> {user.accesstype}
          </p>
          <p>
            <strong>Points:</strong> {user.point}
          </p>
          <br />
          <div>
            <Logout />
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
