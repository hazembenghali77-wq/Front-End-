import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { GetProduct } from '../redux/slices/productSlice'
import ProductList from '../components/ProductList'
import Panier from '../components/Panier'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'

const Home = () => {
  const [searchResults, setSearchResults] = useState(null)
  const { isLoading, error, products } = useSelector(state => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetProduct())
  }, [dispatch])

  if (isLoading) return <p className="loading-state">Loading...</p>
  if (error) return <p className="error-state">Error: {error}</p>

  return (
    <div className="home">
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
          <span>New Arrivals</span> Free Shipping Over $600
          <span>Premium Quality</span> Exclusive Designs
        </div>
      </div>

      <div className="home-layout">
        <div className="home-products" id="collection">
          <SearchBar onSearch={setSearchResults} />
          <div className="section-header">
            <h2>Collection</h2>
            <span>— {products.length} pieces</span>
          </div>
          <ProductList products={searchResults !== null ? searchResults : products} /> 
          {searchResults !== null && searchResults.length === 0 && (<p className="search-empty">Product Not Available</p>)}
        </div>
        <Panier />
      </div>
      <Footer />
    </div>
  )
}

export default Home
