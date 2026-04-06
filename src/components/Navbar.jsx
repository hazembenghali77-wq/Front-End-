import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/slices/UserSlice'

const Navbar = () => {
  const { isAuth } = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
    <nav className="navbar">
      <div className="navbar-brand">SYLEZZ</div>
      <div className="navbar-links">
        {isAuth ? (
          <>
            <Link to="/">Home</Link>
            <button onClick={() => dispatch(logout())}>
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
