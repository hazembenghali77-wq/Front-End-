import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const UserOrder = () => {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { email, isAuth } = useSelector(state => state.user)

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true)
      setError(null)
      try {
        if (!isAuth) {
          setError("Please log in to view your orders.")
          setOrders([])
          return
        }

        const res = await fetch("https://back-end-8456.onrender.com/api/loggedinorder", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token")
          }
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.msg || "Unable to load orders")
        setOrders(data.orders || [])
      } catch (err) {
        setError(err.message || "Failed to load orders")
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [email, isAuth])

  const calculateTotal = (products = []) => {
    return products.reduce((sum, product) => {
      const price = Number(product.price) || 0
      const quantity = Number(product.quantity) || 1
      return sum + price * quantity
    }, 0)
  }

  return (
    <div className="user-order-page">
      <section className="user-order-hero">
        <div>
          <span className="user-order-label">My Orders</span>
          <h1 className="user-order-title">Track your recent purchases</h1>
          <p className="user-order-description">
            Review your order history, see shipment details, and inspect purchased items in a clean, modern layout.
          </p>
          {email && <p className="user-order-email">Logged in as {email}</p>}
        </div>
      </section>

      <div className="user-order-grid">
        {isLoading && <div className="user-order-empty">Loading your orders...</div>}
        {error && <div className="user-order-empty">{error}</div>}
        {!isLoading && !error && orders.length === 0 && (
          <div className="user-order-empty">You have no orders yet.</div>
        )}

        {!isLoading && !error && orders.map(order => (
          <article className="order-card" key={order._id}>
            <div className="order-card-top">
              <div>
                <p className="order-card-meta">Order #{order._id?.slice(-6)}</p>
                <p className="order-card-date">{new Date(order.CreatedAt).toLocaleDateString()}</p>
              </div>
              <span className="order-card-badge">{order.products?.length ?? 0} items</span>
            </div>

            <div className="order-card-body">
              <p>{order.name} {order.surname}</p>
              <p className="order-card-total">Total: ${calculateTotal(order.products).toFixed(2)}</p>
            </div>

            <button className="order-card-action" onClick={() => setSelectedOrder(order)}>
              View details
            </button>
          </article>
        ))}
      </div>

      {selectedOrder && (
        <div className="order-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="order-modal" onClick={e => e.stopPropagation()}>
            <div className="order-modal-header">
              <div>
                <p className="order-card-meta">Order #{selectedOrder._id?.slice(-6)}</p>
                <p className="order-card-date">{new Date(selectedOrder.CreatedAt).toLocaleDateString()}</p>
              </div>
              <button className="order-modal-close" onClick={() => setSelectedOrder(null)}>✕</button>
            </div>

            <div className="order-modal-section">
              <h2>Delivery</h2>
              <p>{selectedOrder.name} {selectedOrder.surname}</p>
              <p>{selectedOrder.email}</p>
              <p>{selectedOrder.phone}</p>
              <p>{selectedOrder.address}</p>
            </div>

            <div className="order-modal-section">
              <h2>Products</h2>
              <div className="order-product-list">
                {selectedOrder.products?.map((product, index) => (
                  <div key={`${product._id ?? product.title}-${index}`} className="order-product-row">
                    <p>{product.title || 'Product'}</p>
                    <span>x{product.quantity || 1}</span>
                    <span>${((Number(product.price) || 0) * (Number(product.quantity) || 1)).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-modal-footer">
              <span className="order-card-total">Order total</span>
              <span>${calculateTotal(selectedOrder.products).toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserOrder
