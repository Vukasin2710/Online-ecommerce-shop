import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppLayout from "./AppLayout.jsx";
import "./index.css";
// Redux
import { Provider } from "react-redux";
import store from "./store/store.js";
// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Pages
import HomePage from "./pages/HomePage.jsx";
import SingleProductPage from "./pages/SingleProductPage.jsx";
import CartPage from "./pages/CartPage.jsx"
import FavoritePage from "./pages/FavoritePage.jsx"
// Clerk
import { ClerkProvider } from "@clerk/clerk-react";


// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

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
      {
        path: "/singleProduct/:id",
        element: <SingleProductPage />,
      },
      {
        path: '/cart',
        element: <CartPage />
      },
      {
        path: '/favorite',
        element: <FavoritePage />
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router} />
      </ClerkProvider>
    </Provider>
  </StrictMode>
);
