import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/slices/UserSlice'

const Navbar = ({ onCartToggle }) => {
  const { products } = useSelector(state => state.panier)
  const { isAuth, username } = useSelector(state => state.user)

  const totalItems = products.reduce((sum, p) => sum + p.quantity, 0)

  const [menuOpen, setMenuOpen] = useState(false)
  const [open, setOpen] = useState(false) 

  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <>
      <nav className="navbar">

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(prev => {
            if (prev) setOpen(false)
            return !prev
          })}
          aria-label="Menu"
        >
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
        </button>

        {/* LINKS */}
        <div className="navbar-links">

          {/* USER DROPDOWN */}
          {isAuth && username && (
            <div className="navbar-account">

              <button
                onClick={() => setOpen(!open)}
                type="button"
                className={`navbar-account-btn ${open ? 'open' : ''}`}
                aria-expanded={open}
              >
                <span className="navbar-welcome-icon">•</span>
                <span>Welcome {username}</span>
                <span className="navbar-account-caret">▾</span>
              </button>

              <div className={`account-dropdown ${open ? 'open' : ''}`}>
                <a   onClick={(e) => {e.preventDefault();setOpen(false);navigate("/userorder");}}>Your Orders</a>
              </div>

            </div>
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

        {/* BRAND */}
        <span className="navbar-brand">Sylezz</span>

        {/* CART */}
        <button className="cart-toggle-btn" onClick={onCartToggle}>
          <span className="cart-toggle-icon">⌖</span>
          <span className="cart-toggle-label">Bag</span>
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>

        {isAuth && username && (
          <div className="mobile-menu-account">
            <button
              type="button"
              className={`mobile-menu-welcome-btn ${open ? 'open' : ''}`}
              onClick={() => setOpen(prev => !prev)}
            >
              <span className="mobile-menu-welcome-icon">•</span>
              <span>Welcome {username}</span>
              <span className="mobile-menu-welcome-caret">▾</span>
            </button>

            {open && (
              <div className="mobile-menu-dropdown">
                <button onClick={() => navigate("/userorder")
                }
                  type="button"
                  className="mobile-menu-dropdown-item"                >
                  Your Orders
                </button>
              </div>
            )}
          </div>
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

      {/* BACKDROP */}
      {menuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Navbar