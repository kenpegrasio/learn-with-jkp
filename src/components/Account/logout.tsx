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
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white font-semibold px-6 py-2 rounded-xl transition hover:bg-red-700 hover:scale-105"
    >
      Logout
    </button>
  );
}

export default Logout;
