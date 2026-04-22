import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = ({ onCartToggle }) => {
  const { products } = useSelector(state => state.panier)
  const totalItems = products.reduce((sum, p) => sum + p.quantity, 0)

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>

      <span className="navbar-brand">SYLEZZ</span>

      <button className="cart-toggle-btn" onClick={onCartToggle}>
        <span className="cart-toggle-icon">⌖</span>
        <span className="cart-toggle-label">Bag</span>
        {totalItems > 0 && (
          <span className="cart-badge">{totalItems}</span>
        )}
      </button>
    </nav>
  )
}

export default Navbar