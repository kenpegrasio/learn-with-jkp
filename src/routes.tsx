import App from "./App";
import Account from "./pages/Account";
import ChapterLists from "./pages/ChapterLists";
import ChapterPage from "./pages/ChapterPage";

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
  {
    path: "/chapter/:chapterId",
    element: <ChapterPage />,
  },
];

export default routes;
