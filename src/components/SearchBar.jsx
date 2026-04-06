import React, { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = async (value) => {
    if (value === "") {
      onSearch(null)
    } else {
      const response = await fetch(`https://back-end-8456.onrender.com/api/products?search=${value}`)
      const data = await response.json()
      onSearch(data.products)
    }
  }

  return (
    <div className="search-wrapper">
      <div className="search-bar">
        <span className="search-icon">⌕</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            handleSearch(e.target.value)
          }}
          placeholder="Search the collection..."
          className="search-input"
        />
      </div>
    </div>
  )
}

export default SearchBar