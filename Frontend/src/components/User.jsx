import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

function User() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/user/${id}`)
        if (!res.ok) throw new Error('User not found')
        const data = await res.json()
        setUser(data.payload)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [id])

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      const res = await fetch(`/api/user/${id}`, { method: 'DELETE' })
      if (res.ok) {
        navigate('/user-list')
      }
    } catch (err) {
      setError('Failed to delete user')
    }
  }

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="border rounded-lg p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Age:</span> {user.age || 'N/A'}</p>
          <p><span className="font-semibold">Date of Birth:</span> {user.dateofbirth ? new Date(user.dateofbirth).toLocaleDateString() : 'N/A'}</p>
          <p><span className="font-semibold">Mobile:</span> {user.mobileNumber || 'N/A'}</p>
          <p><span className="font-semibold">Status:</span> {user.status ? 'Active' : 'Inactive'}</p>
          <p><span className="font-semibold">Created:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-3 mt-6">
          <Link
            to={`/edit-user/${user._id}`}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
          <Link
            to="/user-list"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Back to List
          </Link>
        </div>
      </div>
    </div>
  )
}

export default User
