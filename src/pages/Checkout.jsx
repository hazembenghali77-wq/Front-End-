import { useState } from 'react'
import { useSelector } from 'react-redux'

const Checkout = () => {
  const { products } = useSelector(state => state.panier)
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: ""
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = "https://back-end-8456.onrender.com/api/createorder"
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token")
        },
        body: JSON.stringify({
          ...formData,
          productList: products
        })
      })
      if (res.ok) {
        alert("Order placed successfully!")
      } else {
        alert("Failed to place order")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-container">

        <div className="checkout-summary">
          <h2 className="checkout-subtitle">Order Summary</h2>
          {products.map(product => (
            <div key={product._id} className="checkout-product">
              <img src={product.image} alt={product.title} className="checkout-product-image" />
              <div className="checkout-product-info">
                <p className="checkout-product-title">{product.title}</p>
                <p className="checkout-product-quantity">x{product.quantity}</p>
                <p className="checkout-product-price">${product.price * product.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="checkout-form">
          <h2 className="checkout-subtitle">Your Details</h2>

          <div className="form-group">
            <label className="form-label">Name</label>
            <input className="form-input" name="name" value={formData.name} onChange={handleChange} placeholder="John" />
          </div>
          <div className="form-group">
            <label className="form-label">Surname</label>
            <input className="form-input" name="surname" value={formData.surname} onChange={handleChange} placeholder="Doe" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" name="email" value={formData.email} onChange={handleChange} placeholder="john@email.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input className="form-input" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" />
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <input className="form-input" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main St" />
          </div>

          <button className="checkout-place-btn" onClick={handleSubmit}>Place Order</button>
        </div>

      </div>
    </div>
  )
}

export default Checkout