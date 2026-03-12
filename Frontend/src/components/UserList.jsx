import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function fetchUsers() {
    try {
      setLoading(true)
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(data.payload)
    } catch (err) {
      setError('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      const res = await fetch(`/api/user/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setUsers(users.filter(u => u._id !== id))
      }
    } catch (err) {
      setError('Failed to delete user')
    }
  }

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading users...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found. <Link to="/add-user" className="text-blue-600 underline">Add one</Link></p>
      ) : (
        <div className="grid gap-4">
          {users.map(user => (
            <div key={user._id} className="border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow">
              <Link to={`/user/${user._id}`} className="flex-1">
                <h2 className="text-lg font-semibold text-blue-700 hover:underline">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </Link>
              <div className="flex gap-2 ml-4">
                <Link
                  to={`/edit-user/${user._id}`}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserList
