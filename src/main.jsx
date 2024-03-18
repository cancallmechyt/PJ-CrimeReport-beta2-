import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './compunents/Home.jsx'
import About from './compunents/About.jsx'
import Guide from './compunents/Guide.jsx'
import Profile from './compunents/Profile.jsx'
import LostItem from './compunents/LostItem.jsx'
import FindItem from './compunents/FindItem.jsx'
import Register1 from './compunents/Register1.jsx'
import FormIncidence from './Incidence/FormIncidence.jsx'
import ListIncidence from './Incidence/ListIncidence.jsx'
import StaffHome from './Police/StaffHome.jsx'
import SingleForm from './Incidence/SingleForm.jsx'
import FormLostItem from './Incidence/FormLostItem.jsx'
import EditForm from './Incidence/EditForm.jsx'
import CheckList from './Police/CheckList.jsx'

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
    path: "/formlostitem",
    element: <FormLostItem />,
  },
  {
    path: "/list",
    element: <ListIncidence />,
  },
  {
    path: "/lostitem",
    element: <LostItem />,
  },
  {
    path: "/finditem",
    element: <FindItem />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/guide",
    element: <Guide />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/staffhome",
    element: <StaffHome />,
  },
  {
    path: "/checklist",
    element: <CheckList />,
  },
  {
    path: "/post/incident/:Post_id",
    element: <SingleForm />,
  },
  {
    path: "/post/incident/edit/:Post_id",
    element: <EditForm />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>,
)
