import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import UserInfo from "../components/Account/UserInfo";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GOOGLE_CLIENT_ID from "../../config";

const clientId = GOOGLE_CLIENT_ID;

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
