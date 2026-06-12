import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import '../admin.css'

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Sidebar />
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout