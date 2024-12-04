import { useContext } from "react";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { UserContext } from "../../UserContextProvider";
import axios from "axios";

function Login() {
  const { setUser } = useContext(UserContext);

  const handleLoginSuccess = async (tokenResponse) => {
    console.log("Login Success!", tokenResponse);
    try {
      const { data: userProfile } = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );
      // console.log("user profile: ", userProfile);
      // console.log("user profile ID: ", userProfile.id);
      const user = await axios.get(
        `https://learn-with-jkp-api.vercel.app/api/user/${userProfile.id}`
      );
      // console.log("User.data is ", user.data);
      // console.log("User.data.length is ", Object.keys(user.data).length);
      if (Object.keys(user.data).length === 0) {
        await axios
          .post(`https://learn-with-jkp-api.vercel.app/api/user/`, {
            name: userProfile.name,
            email: userProfile.email,
            picture: userProfile.picture,
            google_id: userProfile.id
          })
          .then((res) => {
            // console.log(res.data);
            sessionStorage.setItem("user", JSON.stringify(res.data));
            sessionStorage.setItem("accessToken", tokenResponse.access_token);
            setUser(res.data)
          });
      } else {
        sessionStorage.setItem("user", JSON.stringify(user.data));
        sessionStorage.setItem("accessToken", tokenResponse.access_token);
        setUser(user.data)
      }
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: (error) => {
      console.error("Login Failed", error);
    },
  });

  return (
    <button onClick={login} class="inline-block justify-center align-center text-center text-white bg-customBlue border border-black rounded-3xl px-5 min-h-10 hover:bg-customWhite hover:text-customBlue hover:scale-110">
      Login with Google
    </button>
  );
}

export default Login;
