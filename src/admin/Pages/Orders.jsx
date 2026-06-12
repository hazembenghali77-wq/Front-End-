import { useState, useEffect } from 'react'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then(res => res.json())
      .then(data => setOrders(data.orders))
  }, [])

  const handleDelete = async (_id) => {
    const res = await fetch(`http://localhost:5000/api/deleteorder/${_id}`, {
      method: "DELETE"
    })
    if (res.ok) {
      setOrders(orders.filter(order => order._id !== _id))
    } else {
      alert("Failed to delete order")
    }
  }

  return (
    <div>
      <h1 className="dashboard-title">Orders</h1>
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>#{order._id.slice(-5)}</td>
              <td>{order.name} {order.surname}</td>
              <td>{order.email}</td>
              <td>{order.phone}</td>
              <td>{order.address}</td>
              <td>{new Date(order.CreatedAt).toLocaleDateString()}</td>
              <td>
                <button className="btn-edit" onClick={() => setSelectedOrder(order)}>View</button>
                <button className="btn-delete" onClick={() => handleDelete(order._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Order #{selectedOrder._id.slice(-5)}</h2>
              <button className="modal-close" onClick={() => setSelectedOrder(null)}>✕</button>
            </div>
            <div className="modal-section">
              <p className="modal-label">Customer</p>
              <p className="modal-value">{selectedOrder.name} {selectedOrder.surname}</p>
            </div>
            <div className="modal-section">
              <p className="modal-label">Email</p>
              <p className="modal-value">{selectedOrder.email}</p>
            </div>
            <div className="modal-section">
              <p className="modal-label">Phone</p>
              <p className="modal-value">{selectedOrder.phone}</p>
            </div>
            <div className="modal-section">
              <p className="modal-label">Address</p>
              <p className="modal-value">{selectedOrder.address}</p>
            </div>
            <div className="modal-section">
              <p className="modal-label">Products</p>
              {selectedOrder.products.map((p, index) => (
                <p key={index} className="modal-value">{p.title} x{p.quantity} — ${p.price * p.quantity}</p>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Orders