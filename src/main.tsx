import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import UserContextProvider from "./UserContextProvider";
import SubjectContextProvider from "./SubjectContextProvider";
import "./input.css";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserContextProvider>
      <SubjectContextProvider>
        <RouterProvider router={router} />
      </SubjectContextProvider>
    </UserContextProvider>
  </StrictMode>
);
