import App from "./App";
import Learn from "./pages/learn";
import Account from "./pages/Account";
import AddMaterial from "./components/Admin/AddMaterial";
import DeleteMaterial from "./components/Admin/DeleteMaterial";
import UsersList from "./components/Admin/UsersList";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/learn",
    element: <Learn />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "add-material",
    element: <AddMaterial />
  },
  {
    path: "delete-material",
    element: <DeleteMaterial />
  },
  {
    path: "users-list",
    element: <UsersList />
  }
];
export default routes;
