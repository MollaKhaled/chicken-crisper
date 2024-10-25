import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Main from './Layout/Main.jsx';
import OrderReview from './components/OrderReview/OrderReview.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
          path: "/",
          element: <Home></Home>,
          loader:() => fetch('menu.json')
      },
      {
          path: "/review",
          element: <OrderReview></OrderReview>
      },
    ]
  }
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <RouterProvider router={router} />
  </StrictMode>,
)
