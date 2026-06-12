import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addproductpanier } from "../redux/slices/panierSlice"

const ProductCard = ({ product, index }) => {
  const dispatch = useDispatch()
  const [added, setAdded] = useState(false)
  const [ripple, setRipple] = useState(null)
  const [flipped, setFlipped] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setTimeout(() => setRipple(null), 700)
    dispatch(addproductpanier(product))
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  const handleFlip = () => setFlipped(f => !f)

  return (
    <div className="pc-root" onClick={handleFlip}>
      <div className={`pc-flipper${flipped ? ' pc-flipped' : ''}`}>

        {/* FRONT */}
        <div className="pc-front">
          <div className="pc-img-wrap">
            <img src={product.image} alt={product.title} className="pc-img" />
            <div className="pc-img-overlay" />
            <span className="pc-num">
              {String((index ?? 0) + 1).padStart(2, '0')}
            </span>
            <span className="pc-tap-hint">Tap to flip</span>
          </div>
          <div className="pc-front-info">
            <p className="pc-cat">{product.category || 'Collection'}</p>
            <p className="pc-name">{product.title}</p>
          </div>
        </div>

        {/* BACK */}
        <div className="pc-back">
          <div className="pc-back-inner">
            <p className="pc-back-cat">{product.category || 'Collection'}</p>
            <p className="pc-back-name">{product.title}</p>
            <p className="pc-back-desc">{product.description}</p>
            <div className="pc-back-footer">
              <span className="pc-back-price">${product.price}</span>
              <button className="pc-add-btn" onClick={handleAdd}>
                {ripple && (
                  <span
                    className="pc-ripple"
                    style={{ left: ripple.x, top: ripple.y }}
                  />
                )}
                <span className="pc-btn-text">
                  {added ? '✓ Added' : 'Take It'}
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductCard