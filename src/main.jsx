import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppLayout from './AppLayout.jsx'
import './index.css'
// Router
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
// Pages
import HomePage from './pages/HomePage.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <div>Error Page...</div>,
    children: [
      {
        path: '/',
        element: <HomePage />,
      }
    ],
  },
])
  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
