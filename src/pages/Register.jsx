import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RegisterUser, clearMessage } from '../redux/slices/UserSlice'

const Register = () => {
  const { message } = useSelector(state => state.user)
  const [formError, setFormError] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setFormError('Passwords do not match')
      return
    }

    setFormError(null)

    const result = await dispatch(RegisterUser(data))

    if (result.meta.requestStatus === "fulfilled") {
      setFormError(null)
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    }
  }

  useEffect(() => {
    if (message === "User Created") {
      setTimeout(() => {
        dispatch(clearMessage())
      }, 2000)
    }
  }, [message, dispatch])

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join the SYLEZZ community</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>

          {/* Username */}
          <div className="form-group">
            <input
              className="form-input"
              type="text"
              placeholder="Username"
              {...register("username", { required: true })}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <input
              className="form-input"
              type="email"
              placeholder="Email address"
              {...register("email", { required: true })}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <input
              className="form-input"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <input
              className="form-input"
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", { required: true })}
            />
          </div>

          {/* Submit */}
          <input className="form-submit" type="submit" value="Create Account" />

          {/* Message */}
          {formError && <div className="error-message">{formError}</div>}
          {message && <div className="success-message">{message}</div>}
        </form>
      </div>
    </div>
  )
}

export default Register