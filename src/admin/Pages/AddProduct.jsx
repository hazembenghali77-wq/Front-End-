import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"

const AddProduct = () => {
const [formData, setFormData] = useState({
  title: "",
  description: "",
  price: "",
  image: "",
  size: "",
  category: ""
})

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value })
}

const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const url = id
      ? `http://localhost:5000/api/updateproduct/${id}`
      : "http://localhost:5000/api/createproduct"

    const method = id ? "PUT" : "POST"

    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      alert(id ? "Product updated successfully" : "Product added successfully")
        if (!id) {
    setFormData({
      title: "",
      description: "",
      price: "",
      image: "",
      size: "",
      category: ""
    })
  }
    } else {
      alert("Failed")
    }
  } catch (error) {
    console.log(error)
  }
}
const { id } = useParams()
useEffect(() => {
  if (id) {
    fetch(`http://localhost:5000/api/getproduct`)
      .then(res => res.json())
      .then(data => {
        const product = data.Product.find(p => p._id === id)
        setFormData(product)
      })
  }
}, [id])

return (

  <div>
    <h1 className="dashboard-title">Add Products</h1>
    <div className="form-card">

      <div className="form-group">
        <label className="form-label">Title</label>
        <input className="form-input" name="title" value={formData.title} onChange={handleChange} placeholder="Product title" />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea className="form-textarea" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      </div>

      <div className="form-group">
        <label className="form-label">Price</label>
        <input className="form-input" name="price" value={formData.price} onChange={handleChange} placeholder="Price" type="number" />
      </div>

      <div className="form-group">
        <label className="form-label">Image URL</label>
        <input className="form-input" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
      </div>

      <div className="form-group">
        <label className="form-label">Category</label>
        <input className="form-input" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
      </div>

      <div className="form-group">
        <label className="form-label">Size</label>
        <input className="form-input" name="size" value={formData.size} onChange={handleChange} placeholder="Size" />
      </div>

<button className="btn-submit" onClick={handleSubmit}>
  {id ? "Update Product" : "Add Product"}
</button>

    </div>
  </div>
)
}

export default AddProduct
