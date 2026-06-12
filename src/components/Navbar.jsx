import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/slices/UserSlice'

const Navbar = ({ onCartToggle }) => {
  const { products } = useSelector(state => state.panier)
  const { isAuth, username } = useSelector(state => state.user)
  const totalItems = products.reduce((sum, p) => sum + p.quantity, 0)
  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
          {isAuth && username && (
            <span className="navbar-welcome">Welcome, {username}</span>
          )}
          <Link to="/">Home</Link>
          {!isAuth ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button
              type="button"
              className="navbar-logout-btn"
              onClick={() => {
                dispatch(logout())
                navigate('/', { replace: true })
              }}
            >
              Logout
            </button>
          )}
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

      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        {isAuth && username && (
          <span className="mobile-menu-welcome">Welcome, {username}</span>
        )}
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        {!isAuth ? (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
          </>
        ) : (
          <button
            type="button"
            className="mobile-menu-logout-btn"
            onClick={() => {
              dispatch(logout())
              setMenuOpen(false)
              navigate('/', { replace: true })
            }}
          >
            Logout
          </button>
        )}
      </div>

      {menuOpen && (
        <div className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)} />
      )}
    </>
  )
}

export default Navbar