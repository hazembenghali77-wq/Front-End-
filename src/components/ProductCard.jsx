import React from 'react'
import { useDispatch } from 'react-redux'
import { addproductpanier } from "../redux/slices/panierSlice"

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-card-info">
        <p className="product-title">{product.title}</p>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
        <button
          className="product-buy-btn"
          onClick={() => dispatch(addproductpanier(product))}
        >
          Add to Bag
        </button>
      </div>
    </div>
  )
}

export default ProductCard
