import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { GetProduct } from '../redux/slices/productSlice'
import ProductList from '../components/ProductList'
import Panier from '../components/Panier'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import Filter from '../components/Filter'
import PriceSlider from '../components/PriceSlider'
import Navbar from '../components/Navbar'

const Home = () => {
  const [searchTerm, setSearchTerm]   = useState("")
  const [category, setCategory]       = useState("")
  const [priceRange, setPriceRange]   = useState([0, 2000])
  const [priceInitialized, setPriceInitialized] = useState(false)
  const [cartOpen, setCartOpen]       = useState(false)

  const { isLoading, error, products } = useSelector(state => state.products)
  const dispatch = useDispatch()

  useEffect(() => { dispatch(GetProduct()) }, [dispatch])

  const maxPrice = useMemo(() => {
    if (products && products.length > 0)
      return Math.ceil(Math.max(...products.map(p => p.price)))
    return 2000
  }, [products])

  useEffect(() => {
    if (products && products.length > 0 && !priceInitialized) {
      setPriceRange([0, maxPrice])
      setPriceInitialized(true)
    }
  }, [products, priceInitialized, maxPrice])

  const displayedProducts = useMemo(() => {
    if (!products) return []
    return products.filter(p => {
      const matchesCategory = !category ||
        p.category?.toLowerCase() === category.toLowerCase()
      const matchesSearch = !searchTerm.trim() ||
        p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
      return matchesCategory && matchesSearch && matchesPrice
    })
  }, [products, category, searchTerm, priceRange])

  if (isLoading) return <p className="loading-state">Loading...</p>
  if (error)     return <p className="error-state">Error: {error}</p>

  return (
    <div className="home">
      <Navbar onCartToggle={() => setCartOpen(prev => !prev)} />

      <div className="hero">
        <div className="hero-content">
          <h1>Sylezz</h1>
          <p>Men's Collection — Summer 2026</p>
        </div>
      </div>

      <div className="ticker">
        <div className="ticker-inner">
          <span>New Arrivals</span> Free Shipping Over $600
          <span>Premium Quality</span> Exclusive Designs
        </div>
      </div>

      <div className="home-products">
        <Filter category={category} setCategory={setCategory} />
        <PriceSlider min={0} max={maxPrice} value={priceRange} onChange={setPriceRange} />
        <SearchBar onSearch={setSearchTerm} />

        <div className="section-header">
          <h2>Collection</h2>
          <span>— {displayedProducts.length} pieces</span>
        </div>

        <ProductList products={displayedProducts} />

        {displayedProducts.length === 0 && !isLoading && (
          <p className="search-empty">No products match your filters</p>
        )}
      </div>

      <Panier isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Footer />
    </div>
  )
}

export default Home