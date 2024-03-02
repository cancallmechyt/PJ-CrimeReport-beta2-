import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './compunents/Home.jsx'
import Register1 from './compunents/Register1.jsx'
import FormIncidence from './Incidence/FormIncidence.jsx'
import ListIncidence from './Incidence/ListIncidence.jsx'

import './index.css'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register1 />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/form",
    element: <FormIncidence />,
  },
  {
    path: "/list",
    element: <ListIncidence />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>,
)
