import { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/allusers")
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
        const response = await fetch(`http://localhost:5000/api/deleteuser/${userId}`, {
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
      <table className="admin-table">
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
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
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