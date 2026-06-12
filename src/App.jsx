import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Checkout from "./pages/Checkout"
import Navbar from "./components/Navbar"
import AdminLayout from "./admin/Pages/AdminLayout"
import Overview from "./admin/Pages/Overview"
import Orders from "./admin/Pages/Orders"
import Users from "./admin/Pages/Users"
import AddProduct from './admin/Pages/AddProduct'
import { Routes, Route, useLocation } from "react-router-dom"
import './App.css'
import Products from "./admin/Pages/Products"
import WelcomeAdmin from "./admin/Pages/WelcomeAdmin"
import ProtectedRoute from "./admin/ProtectedRoute"

function App() {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')
  return (
    <>
      {!isAdminPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<WelcomeAdmin />} />
            <Route path="overview" element={<Overview />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="edit-product/:id" element={<AddProduct />} />
          </Route>
        </Route>

      </Routes>
    </>
  )
}

export default App