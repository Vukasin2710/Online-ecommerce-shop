import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppLayout from "./AppLayout.jsx";
import "./index.css";
// Redux
import { Provider } from "react-redux";
import store from './store/store.js';

// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Pages
import HomePage from "./pages/HomePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <div>Error Page...</div>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
