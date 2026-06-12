import React from 'react'

const Filter = ({ category, setCategory }) => {
  const categories = [
    { label: "All", value: "" },
    { label: "Shirts", value: "shirts" },
    { label: "Jackets", value: "jackets" },
    { label: "Pants", value: "pants" },
    { label: "Coats", value: "coats" },
    { label: "Suits", value: "suits" },
    { label: "Accessories", value: "accessories" },
    { label: "Shoes", value: "shoes" }
  ]

  return (
    <div className="filter-wrapper">
      {categories.map((item) => (
        <button
          key={item.label}                          
          onClick={() => setCategory(item.value)}
          className={`filter-btn ${category === item.value ? "active" : ""}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

export default Filter