import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes.jsx";
import UserContextProvider from "./UserContextProvider.jsx";
import SubjectContextProvider from "./SubjectContextProvider.jsx";
import "./input.css";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SubjectContextProvider>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </SubjectContextProvider>
  </StrictMode>
);
