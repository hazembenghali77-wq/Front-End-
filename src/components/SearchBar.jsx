import React, { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (value) => {
    setSearchQuery(value)
    onSearch(value)           // ✅ passes the string up — Home handles the fetch
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
          placeholder="Search within collection..."
        />
      </div>
    </div>
  )
}

export default SearchBar