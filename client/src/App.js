//LIBRARY
import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import { useContext } from 'react';
//COMPONENTS
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
//PAGES
import ProductInfo from "./pages/ProductInfo";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllProducts from "./pages/AllProducts";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Orders from "./pages/Orders";
//CONTEXT
import AuthContext from './context/authContext';

const Layout = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return (
      <div className="Container">
        <Sidebar />
        <div className="Pages">
          <Navbar />
          <div className="Page">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
  else {
    return <Register />
  }

};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AllProducts />,
      },
      {
        path: "/product/:id",
        element: <ProductInfo />,
      },
      {
        path: "/createProduct",
        element: <CreateProduct />
      },
      {
        path: "/updateProduct/:id",
        element: <UpdateProduct />
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/orders/:id",
        element: <Orders />
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App
