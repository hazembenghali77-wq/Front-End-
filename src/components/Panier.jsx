import React from 'react'
import { useSelector } from 'react-redux'
import PanierCard from '../components/PanierCard'
import { useNavigate } from 'react-router-dom'

const Panier = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const { products } = useSelector(state => state.panier)
  const total = products.reduce((sum, p) => sum + p.price * p.quantity, 0)

  return (
    <>
      <div
        className={`panier-backdrop ${isOpen ? 'panier-backdrop--visible' : ''}`}
        onClick={onClose}
      />
      <div className={`panier ${isOpen ? 'panier--open' : ''}`}>
        <div className="panier-header">
          <h2 className="panier-title">Your Bag</h2>
          <div className="panier-header-right">
            <span className="panier-count">{products.length} items</span>
            <button className="panier-close-btn" onClick={onClose}>✕</button>
          </div>
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
            <button
              className="checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Panier