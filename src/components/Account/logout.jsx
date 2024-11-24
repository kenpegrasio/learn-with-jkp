import { googleLogout } from "@react-oauth/google";
import { useContext } from "react";
import { UserContext } from "../../UserContextProvider";

function Logout() {
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    googleLogout();
    console.log("Log out successful");
    sessionStorage.clear();
    setUser({});
  };

  return (
    <div id="signOutButton">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
