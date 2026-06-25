import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const AddProduct = () => {
  const { id } = useParams()

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
        ? `https://back-end-8456.onrender.com/api/updateproduct/${id}`
        : "https://back-end-8456.onrender.com/api/createproduct"

      const method = id ? "PUT" : "POST"

      const { _id, __v, ...cleanData } = formData

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cleanData)
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

  useEffect(() => {
    if (id) {
      fetch(`https://back-end-8456.onrender.com/api/getproduct`)
        .then(res => res.json())
        .then(data => {
          const product = data.Product?.find(p => p._id === id)

          if (product) {
            setFormData({
              title: product.title || "",
              description: product.description || "",
              price: product.price || "",
              image: product.image || "",
              size: product.size || "",
              category: product.category || ""
            })
          }
        })
        .catch(err => console.log(err))
    }
  }, [id])

  return (
    <div>
      <h1 className="dashboard-title">
        {id ? "Edit Product" : "Add Product"}
      </h1>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            className="form-input"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Price</label>
          <input
            className="form-input"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter product price"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Image URL</label>
          <input
            className="form-input"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <input
            className="form-input"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter product category"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Size</label>
          <input
            className="form-input"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="Enter product size"
          />
        </div>

        <button className="btn-submit" type="submit">
          {id ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  )
}

export default AddProduct