import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageProducts.css";


export default function ManageProducts() {
  const [products, setProducts] = useState([]);

  // EDIT STATES
  const [editId, setEditId] = useState(null);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    description: "",
    stock: "",
  });

  // GET PRODUCTS
  const getProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      alert("Product Deleted Successfully!");
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT CLICK
  const handleEdit = (item) => {
    setEditId(item.id);

    setProduct({
      title: item.title,
      price: item.price,
      category: item.category,
      image: item.image,
      description: item.description,
      stock: item.stock,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // UPDATE SUBMIT
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
      }

      setProduct({
        title: "",
        price: "",
        category: "",
        image: "",
        description: "",
        stock: "",
      });

      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="manage-products-container">
      <h2 className="manage-products-title">
        Manage Products
      </h2>

      {/* EDIT FORM */}
      {editId && (
        <form onSubmit={handleSubmit} className="edit-form">
          <input
            placeholder="Title"
            value={product.title}
            onChange={(e) =>
              setProduct({ ...product, title: e.target.value })
            }
          />

          <input
            placeholder="Price"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
          />

          <input
            placeholder="Category"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          />

          <input
            placeholder="Image"
            value={product.image}
            onChange={(e) =>
              setProduct({ ...product, image: e.target.value })
            }
          />

          <input
            placeholder="Stock"
            value={product.stock}
            onChange={(e) =>
              setProduct({ ...product, stock: e.target.value })
            }
          />

          <button type="submit">
            Update Product
          </button>
        </form>
      )}

      {/* PRODUCTS LIST */}
   {products.length === 0 ? (
  <p className="no-products">No products found.</p>
) : (
  <div className="products-grid">
    {products.map((item) => (
      <div key={item.id} className="product-card">
        <img
          src={item.image}
          alt={item.title}
          className="product-image"
        />

        <div className="product-info">
          <h3 className="product-name">
            {item.title}
          </h3>

          <p className="product-price">
            ₹{item.price}
          </p>

          <p>
            <strong>Category:</strong>{" "}
            {item.category}
          </p>

          <p>
            <strong>Stock:</strong>{" "}
            {item.stock}
          </p>

          <div className="product-actions">
            <button
              className="edit-btn"
              onClick={() => handleEdit(item)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
)}
    </div>
  );
}