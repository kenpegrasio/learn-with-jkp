import App from "./App";
import Account from "./pages/Account";
import ChapterLists from "./pages/ChapterLists";
import ChapterPage from "./pages/ChapterPage";
import CompletedChapters from "./pages/CompletedChapters";
import FavouriteChapters from "./pages/FavouriteChapters";

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
  {
    path: "/account/:userId/favourites",
    element: <FavouriteChapters />
  },
  {
    path: "/account/:userId/completed",
    element: <CompletedChapters />
  }
];

export default routes;
