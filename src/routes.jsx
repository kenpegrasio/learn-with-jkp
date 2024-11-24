import App from "./App";
import About from "./pages/about";
import Learn from "./pages/learn";
import Account from "./pages/Account";
import Topic from "./components/Learn/Topic";
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
    path: "/about",
    element: <About />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/learn/:id",
    element: <Topic />
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
