import React from 'react'
import { createBrowserRouter, Form } from 'react-router-dom'
import UserLayout from '../components/layouts/UserLayout'
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import DetailsForm from '../pages/DetailsForm';
import UserList from '../pages/UserList';
import CompanyList from '../pages/CompanyList';

const router = createBrowserRouter([

     {
          path: "/",
          element: <UserLayout />,
          children: [
               {
                    index: true,
                    element: <Home />
               },
               {
                    path: "cart",
                    element: <Cart />
               },
               {
                    path: "form",
                    element: <DetailsForm />
               },
               {
                    path: "user",
                    element: <UserList />
               },
               {
                    path: "company",
                    element: <CompanyList />
               }
          ]
     }
]);

export default router
