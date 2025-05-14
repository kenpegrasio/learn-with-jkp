import Footer from "../components/Footer";
import UserInfo from "../components/Account/UserInfo";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Layout from "@/layout";

// Import client ID from .env
const clientId: string | undefined = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!clientId) {
  console.error(
    "Google Client ID is not defined in the environment variables."
  );
}

const Account: React.FC = () => {
  if (!clientId) {
    return <p>Error: Google Client ID is missing.</p>;
  }

  return (
    <Layout>
      <GoogleOAuthProvider clientId={clientId}>
        <main className="p-6">
          <UserInfo />
        </main>
        <Footer />
      </GoogleOAuthProvider>
    </Layout>
  );
};

export default Account;
