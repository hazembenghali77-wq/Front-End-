import React from 'react'
import { useDispatch } from 'react-redux'
import { incrementQuantity, decrementQuantity, removeproduct } from '../redux/slices/panierSlice'

const PanierCard = ({ product }) => {
  const dispatch = useDispatch()

  return (
    <div className="panier-card">
      <img className="panier-card-image" src={product.image} alt={product.title} />
      <div className="panier-card-details">
        <p className="panier-card-title">{product.title}</p>
        <p className="panier-card-price">${product.price * product.quantity}</p>
        <div className="quantity-controls">
          <button onClick={() => dispatch(decrementQuantity(product._id))}>−</button>
          <span>{product.quantity}</span>
          <button onClick={() => dispatch(incrementQuantity(product._id))}>+</button>
        </div>
        <button
          className="remove-btn"
          onClick={() => dispatch(removeproduct(product._id))}
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default PanierCard
