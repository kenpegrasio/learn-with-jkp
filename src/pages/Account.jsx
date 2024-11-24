import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import UserInfo from "../components/Account/UserInfo";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; 

function Account() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Navbar />
      <UserInfo />
      <Footer />
    </GoogleOAuthProvider>
  );
}

export default Account;
