import React from 'react'
import { useSelector } from 'react-redux'
import PanierCard from '../components/PanierCard'

const Panier = () => {
  const { products } = useSelector(state => state.panier)
  const total = products.reduce((sum, p) => sum + p.price * p.quantity, 0)

  return (
    <div className="panier">
      <div className="panier-header">
        <h2 className="panier-title">Your Bag</h2>
        <span className="panier-count">{products.length} items</span>
      </div>

      <div className="panier-items">
        {products.length === 0 ? (
          <p className="panier-empty">Your bag is empty</p>
        ) : (
          products.map((product) => (
            <PanierCard key={product._id} product={product} />
          ))
        )}
      </div>

      {products.length > 0 && (
        <div className="panier-footer">
          <hr className="panier-divider" />
          <div className="panier-total">
            <span>Total</span>
            <span>${total.toFixed(0)}</span>
          </div>
<button className="checkout-btn" onClick={() => {alert("Order placed successfully 🛍️")}}>Checkout</button></div>)}
    </div>
  )
}

export default Panier
