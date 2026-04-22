import React from 'react'

const PriceSlider = ({ min, max, value, onChange }) => {
  const [minVal, maxVal] = value

  const handleMin = (e) => {
    const val = Math.min(Number(e.target.value), maxVal - 1)
    onChange([val, maxVal])
  }

  const handleMax = (e) => {
    const val = Math.max(Number(e.target.value), minVal + 1)
    onChange([minVal, val])
  }

  const minPercent = ((minVal - min) / (max - min)) * 100
  const maxPercent = ((maxVal - min) / (max - min)) * 100

  return (
    <div className="price-slider-wrapper">
      <div className="price-slider-header">
        <span className="price-slider-label">Price Range</span>
        <span className="price-slider-values">
          ${minVal} — ${maxVal}
        </span>
      </div>

      <div className="price-slider-track-container">
        <div className="price-slider-track">
          <div
            className="price-slider-range"
            style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
          />
        </div>

        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={handleMin}
          className="price-slider-input price-slider-input--left"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={handleMax}
          className="price-slider-input price-slider-input--right"
        />
      </div>
    </div>
  )
}

export default PriceSlider