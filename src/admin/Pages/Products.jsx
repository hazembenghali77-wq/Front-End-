import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetProduct } from "../../redux/slices/productSlice"
import { useNavigate } from 'react-router-dom'
import SearchProduct from '../Components/SearchProduct'


const Products = () => {

    const { isLoading, error, products } = useSelector(state => state.products)
    const dispatch = useDispatch()
    const [searchQuery, setSearchQuery] = useState("")
    useEffect(() => { dispatch(GetProduct()) }, [dispatch])

    const navigate = useNavigate()

    const handleSearch = (query) => {
      setSearchQuery(query)
    }

    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    
const handleDelete = async (_id) => {
  const res = await fetch(`https://back-end-8456.onrender.com/api/deleteproduct/${_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: _id })   
  })

  if (res.ok) {
    alert("Product deleted")
    dispatch(GetProduct())
  } else {
    alert("Failed to delete product")
  }
}

return (
  <div>
    <div className="page-header">
      <h1 className="dashboard-title">Products</h1>
      <button
        className="btn-submit btn-add"
        onClick={() => navigate('/admin/add-product')}
      >
        Add Product
      </button>
    </div>
    <SearchProduct onSearch={handleSearch} />
    <table className="admin-table products-table">
      <thead>
        <tr>
          <th>Image</th>
          <th className="products-title-cell">Title</th>
          <th className="products-category-cell">Category</th>
          <th className="products-price-cell">Price</th>
          <th className="products-actions-cell">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map(product => (
          <tr key={product._id}>
            <td className="product-image-cell table-cell">
              <img
                src={product.image}
                alt={product.title}
                className="admin-product-image"
              />
            </td>
            <td className="table-cell products-title-cell">{product.title}</td>
            <td className="table-cell products-category-cell">{product.category}</td>
            <td className="table-cell table-price-cell products-price-cell">${product.price}</td>
            <td className="table-cell table-actions-cell products-actions-cell">
              <div className="table-actions">
                <button className="btn-edit" onClick={() => navigate(`/admin/edit-product/${product._id}`)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(product._id)}>Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

)
  
}

export default Products