import App from "./App";
import Account from "./pages/Account";
import ChapterLists from "./pages/ChapterLists";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/chapters/:topicId",
    element: <ChapterLists />,
  },
];

export default routes;
