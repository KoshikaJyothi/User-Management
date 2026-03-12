import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-blue-600 text-white shadow">
      <h1 className="text-xl font-bold">User Manager</h1>
      <ul className="flex gap-6">
        <li><NavLink to="/" end className={({isActive}) => isActive ? 'font-bold underline' : 'hover:underline'}>Home</NavLink></li>
        <li><NavLink to="/add-user" className={({isActive}) => isActive ? 'font-bold underline' : 'hover:underline'}>Add User</NavLink></li>
        <li><NavLink to="/user-list" className={({isActive}) => isActive ? 'font-bold underline' : 'hover:underline'}>Users</NavLink></li>
      </ul>
    </nav>
  )
}

export default Header
