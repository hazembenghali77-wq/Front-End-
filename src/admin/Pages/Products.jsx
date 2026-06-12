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
  const res = await fetch(`http://localhost:5000/api/deleteproduct/${_id}`, {
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
    <h1 className="dashboard-title" style={{ paddingLeft: "18rem" }}>Products</h1>
    <button
    className="btn-submit btn-add"
    onClick={() => navigate('/admin/add-product')}>Add Product</button>
</div>
    <SearchProduct onSearch={handleSearch} />
    <div className='overflow-x-auto'>
    <table className="admin-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map(product => (
          <tr key={product._id}>
            <td className="product-image-cell">
              <img
                src={product.image}
                alt={product.title}
                className="admin-product-image"
              />
            </td>
            <td>{product.title}</td>
            <td>{product.category}</td>
            <td>${product.price}</td>
            <td>
              <button className="btn-edit" onClick={() => navigate(`/admin/edit-product/${product._id}`)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(product._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </div>

)
  
}

export default Products