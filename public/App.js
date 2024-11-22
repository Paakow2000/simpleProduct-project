import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [product, setProduct] = useState({ name: "", quantity: "", price: "" });
  const [products, setProducts] = useState([]);

  // Fetch products from the server
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/products", product)
      .then((response) => {
        setProducts([...products, response.data]);
        setProduct({ name: "", quantity: "", price: "" }); // Reset form
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Manager</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input
              type="number"
              step="0.01"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Add Product</button>
      </form>

      <h2>Product List</h2>
      {products.length > 0 ? (
        <ul>
          {products.map((prod, index) => (
            <li key={index}>
              {prod.name} - {prod.quantity} pcs - ${prod.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default App;
