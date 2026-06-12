import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar-body">
      <h1 className="sidebar-title">Admin Panel</h1>

      <nav className="sidebar-nav">
       <NavLink to="/admin/overview" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Overview</NavLink>
       <NavLink to="/admin/products" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Products</NavLink>
       <NavLink to="/admin/orders" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Orders</NavLink>
       <NavLink to="/admin/users" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}>Users</NavLink>
      </nav>
    </div>
  )
}

export default Sidebar