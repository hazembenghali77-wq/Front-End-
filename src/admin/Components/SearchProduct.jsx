import React, { useState } from 'react'

const SearchProduct = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (value) => {
    setSearchQuery(value)
    onSearch(value)          
  }

  return (
    <div className="search-wrapper">
      <div className="search-bar">
        <span className="search-icon">⌕</span>
        <input
          type="text"
          className="search-input"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search..."
        />
      </div>
    </div>
  )
}

export default SearchProduct