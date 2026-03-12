import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import AddUser from './components/AddUser'
import UserList from './components/UserList'
import User from './components/User'
import EditUser from './components/EditUser'

function App() {
  const routerobj = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'add-user',
          element: <AddUser />
        },
        {
          path: 'user-list',
          element: <UserList />
        },
        {
          path: 'user/:id',
          element: <User />
        },
        {
          path: 'edit-user/:id',
          element: <EditUser />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={routerobj} />
  )
}

export default App
