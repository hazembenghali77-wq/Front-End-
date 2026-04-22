import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = ({ onCartToggle }) => {
  const { products } = useSelector(state => state.panier)
  const totalItems = products.reduce((sum, p) => sum + p.quantity, 0)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        {/* Hamburger — mobile only */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Menu"
        >
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
        </button>

        {/* Desktop links — hidden on mobile */}
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <span className="navbar-brand">Sylezz</span>

        <button className="cart-toggle-btn" onClick={onCartToggle}>
          <span className="cart-toggle-icon">⌖</span>
          <span className="cart-toggle-label">Bag</span>
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <Link to="/"        onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/login"   onClick={() => setMenuOpen(false)}>Login</Link>
        <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
      </div>

      {/* Backdrop to close menu */}
      {menuOpen && (
        <div className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)} />
      )}
    </>
  )
}

export default Navbar