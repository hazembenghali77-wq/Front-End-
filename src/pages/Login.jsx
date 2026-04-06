import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { LoginUser, clearMessage } from '../redux/slices/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { isAuth, message } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuth) {
      setTimeout(() => navigate("/"), 2000)
    }
  }, [isAuth])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => dispatch(clearMessage()), 1500)
      return () => clearTimeout(timer)
    }
  }, [message])

  const { register, handleSubmit } = useForm()
  const onSubmit = data => dispatch(LoginUser(data))

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              className="form-input"
              type="email"
              placeholder="Email address"
              {...register("email", { required: true })}
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </div>
          <input className="form-submit" type="submit" value="Sign In" />
          {message && <div className="success-message">{message}</div>}
        </form>
      </div>
    </div>
  )
}

export default Login