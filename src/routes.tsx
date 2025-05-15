import App from "./App";
import Account from "./pages/Account";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/account",
    element: <Account />,
  },
];

export default routes;
