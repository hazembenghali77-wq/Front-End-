import { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://back-end-8456.onrender.com/api/allusers")
        const data = await response.json()
        if (data.users) {
          setUsers(data.users)
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching users:", error)
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleDelete = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      try {
        const response = await fetch(`https://back-end-8456.onrender.com/api/deleteuser/${userId}`, {
          method: "DELETE"
        })
        if (response.ok) {
          setUsers(users.filter(user => user._id !== userId))
          alert("User deleted successfully")
        } else {
          alert("Failed to delete user")
        }
      } catch (error) {
        console.error("Error deleting user:", error)
        alert("Error deleting user")
      }
    }
  }

  if (loading) return <div className="dashboard-title">Loading users...</div>

  return (
    <div>
      <h1 className="dashboard-title">Users</h1>
      <table className="admin-table users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="table-cell">{user.username}</td>
              <td className="table-cell">{user.email}</td>
              <td className="table-cell table-actions-cell">
                <button className="btn-delete" onClick={() => handleDelete(user._id, user.username)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users