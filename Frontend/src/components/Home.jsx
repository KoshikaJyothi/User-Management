import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="max-w-2xl mx-auto text-center p-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to User Management</h1>
      <p className="text-gray-600 mb-8">Manage your users — add, view, edit, and delete with ease.</p>
      <div className="flex justify-center gap-4">
        <Link to="/add-user" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Add User</Link>
        <Link to="/user-list" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium">View Users</Link>
      </div>
    </div>
  )
}

export default Home
