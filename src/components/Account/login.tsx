import { useContext } from "react";
import { useGoogleLogin, TokenResponse } from "@react-oauth/google";
import { UserContext } from "../../UserContextProvider";
import axios from "axios";

export interface User {
  id?: string;
  name?: string;
  email?: string;
  picture?: string;
  google_id?: string;
}

const Login: React.FC = () => {
  const { setUser } = useContext(UserContext);

  const handleLoginSuccess = async (tokenResponse: TokenResponse) => {
    console.log("Login Success!", tokenResponse);

    try {
      const { data: userProfile } = await axios.get<User>(
        "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );

      const { data: user } = await axios.get(
        `https://learn-with-jkp-api.vercel.app/api/user/${userProfile.id}`
      );

      const isNewUser = Object.keys(user).length === 0;

      const finalUser = isNewUser
        ? (
            await axios.post(
              `https://learn-with-jkp-api.vercel.app/api/user/`,
              {
                name: userProfile.name,
                email: userProfile.email,
                picture: userProfile.picture,
                google_id: userProfile.id,
              }
            )
          ).data
        : user;

      sessionStorage.setItem("user", JSON.stringify(finalUser));
      sessionStorage.setItem("accessToken", tokenResponse.access_token);
      setUser(finalUser);
    } catch (error) {
      console.error("Failed to fetch or create user profile", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: (error) => {
      console.error("Login Failed", error);
    },
  });

  return (
    <button
      onClick={() => login()}
      className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-xl transition hover:bg-blue-700 hover:scale-105"
    >
      Login With Google
    </button>
  );
};

export default Login;
