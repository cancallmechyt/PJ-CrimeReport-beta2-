import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Layout from './Bar/Layout.jsx'
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
import CheckFindItem from './Police/CheckFindItem.jsx'
import EditStaff from './Police/EditStaff.jsx'
import Emergency from './Police/Emergency.jsx'
import Login from './compunents/Login.jsx'

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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Layout><Home /></Layout>,
  },
  {
    path: "/form",
    element: <Layout><FormIncidence /></Layout>,
  },
  {
    path: "/formlostitem",
    element: <Layout><FormLostItem /></Layout>,
  },
  {
    path: "/list",
    element: <Layout><ListIncidence /></Layout>,
  },
  {
    path: "/lostitem",
    element: <Layout><LostItem /></Layout>,
  },
  {
    path: "/finditem",
    element: <Layout><FindItem /></Layout>,
  },
  {
    path: "/about",
    element: <Layout><About /></Layout>,
  },
  {
    path: "/guide",
    element: <Layout><Guide /></Layout>,
  },
  {
    path: "/profile",
    element: <Layout><Profile /></Layout>,
  },
  {
    path: "/staffhome",
    element: <Layout><StaffHome /></Layout>,
  },
  {
    path: "/checklist",
    element: <Layout><CheckList /></Layout>,
  },
  {
    path: "/checkfinditem",
    element: <Layout><CheckFindItem /></Layout>,
  },
  {
    path: "/emergency",
    element: <Layout><Emergency /></Layout>,
  },
  {
    path: "/posts/:pid",
    element: <Layout><SingleForm /></Layout>,
  },
  {
    path: "/posts/edit/:pid",
    element: <Layout><EditForm /></Layout>,
  },
  {
    path: "/posts/editstaff/:pid",
    element: <Layout><EditStaff /></Layout>,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>,
)
