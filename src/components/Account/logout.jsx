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
    <button onClick={handleLogout} class="inline-block justify-center align-center text-center text-white bg-customBlue border border-black rounded-3xl px-5 min-h-10 hover:bg-customWhite hover:text-customBlue hover:scale-110">
      Logout
    </button>
  );
}

export default Logout;
