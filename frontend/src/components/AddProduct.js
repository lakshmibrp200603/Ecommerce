import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

export default function AddProduct() {
  const [editId, setEditId] = useState(null);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    description: "",
    stock: "",

  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/products/${editId}`,
          product
        );

        alert("Product Updated Successfully!");
        setEditId(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/products",
          product
        );

        alert("Product Added Successfully!");
      }

      setProduct({
        title: "",
        price: "",
        category: "",
        image: "",
        description: "",
        stock: "",
      });
    } catch (error) {
  console.log("Full Error:", error);

  if (error.response) {
    console.log("Server Response:", error.response.data);
    alert(error.response.data.message || JSON.stringify(error.response.data));
  } else {
    alert(error.message);
  }
}
  };

  return (
  <div className="add-product-page">
    <div className="add-product-container">

      <h1 className="add-product-title">
        Add Product
      </h1>
<form
  className="add-product-form"
  onSubmit={handleSubmit}
>
  <input
    type="text"
    name="title"
    value={product.title}
    onChange={handleChange}
    className="add-product-input"
    placeholder="Product Title"
  />

  <input
    type="number"
    name="price"
    value={product.price}
    onChange={handleChange}
    className="add-product-input"
    placeholder="Price"
  />

  <input
    type="text"
    name="category"
    value={product.category}
    onChange={handleChange}
    className="add-product-input"
    placeholder="Category"
  />

  <input
    type="text"
    name="image"
    value={product.image}
    onChange={handleChange}
    className="add-product-input"
    placeholder="Image URL"
  />

  <textarea
    name="description"
    value={product.description}
    onChange={handleChange}
    className="add-product-textarea"
    placeholder="Description"
  />

  <input
    type="number"
    name="stock"
    value={product.stock}
    onChange={handleChange}
    className="add-product-input"
    placeholder="Stock"
  />

  <button
    type="submit"
    className="add-product-button"
  >
    {editId ? "Update Product" : "Add Product"}
  </button>
</form>


    </div>
  </div>
);
}