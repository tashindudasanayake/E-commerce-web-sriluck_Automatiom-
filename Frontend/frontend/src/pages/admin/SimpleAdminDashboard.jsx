import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Electronics",
    image: "",
    quantity: 0,
    featured: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const adminUser = localStorage.getItem("adminUser");

    if (!token || !adminUser) {
      navigate("/admin/login", { replace: true });
      return;
    }

    try {
      const parsedUser = JSON.parse(adminUser);
      setUser(parsedUser);
      fetchProducts();
    } catch {
      navigate("/admin/login", { replace: true });
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const method = editingProduct ? "PUT" : "POST";
    const url = editingProduct
      ? `http://localhost:5000/api/products/${editingProduct._id}`
      : "http://localhost:5000/api/products";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(
          editingProduct
            ? "✅ Product updated successfully!"
            : "✅ Product added successfully!"
        );
        setShowForm(false);
        setEditingProduct(null);
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "Electronics",
          image: "",
          quantity: 0,
          featured: false,
        });
        fetchProducts();
      } else {
        const data = await res.json();
        alert(data.message || "❌ Failed to save product");
      }
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert("🗑️ Product deleted successfully!");
        fetchProducts();
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg font-medium text-gray-600">Loading...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-2xl font-semibold">🏪 ClickStore Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>Welcome, {user.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="p-6 space-y-6">
        {/* Stats */}
        <section className="grid sm:grid-cols-3 gap-4">
          <div className="bg-blue-500 text-white rounded-xl p-4 text-center shadow">
            <h2 className="text-3xl font-bold">{products.length}</h2>
            <p>Total Products</p>
          </div>
          <div className="bg-green-500 text-white rounded-xl p-4 text-center shadow">
            <h2 className="text-3xl font-bold">
              {products.filter((p) => p.quantity > 0).length}
            </h2>
            <p>In Stock</p>
          </div>
          <div className="bg-red-500 text-white rounded-xl p-4 text-center shadow">
            <h2 className="text-3xl font-bold">
              {products.filter((p) => p.quantity === 0).length}
            </h2>
            <p>Out of Stock</p>
          </div>
        </section>

        {/* Add Product */}
        <section>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingProduct(null);
              setFormData({
                name: "",
                description: "",
                price: "",
                category: "Electronics",
                image: "",
                quantity: 0,
                featured: false,
              });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg"
          >
            {showForm ? "✖ Cancel" : "➕ Add Product"}
          </button>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 mt-4 rounded-xl shadow space-y-4"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {editingProduct ? "✏️ Edit Product" : "➕ Add Product"}
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Product Name"
                  required
                  className="border p-2 rounded"
                />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="border p-2 rounded"
                >
                  <option>Electronics</option>
                  <option>Computers</option>
                  <option>Phones</option>
                  <option>Gaming</option>
                  <option>Audio</option>
                  <option>Other</option>
                </select>
              </div>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                required
                rows="3"
                className="border w-full p-2 rounded"
              />

              <div className="grid sm:grid-cols-3 gap-4">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Price ($)"
                  required
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Quantity"
                  required
                  className="border p-2 rounded"
                />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  Featured
                </label>
              </div>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Image URL"
                required
                className="border w-full p-2 rounded"
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  className={`${
                    editingProduct ? "bg-yellow-500" : "bg-green-600"
                  } hover:opacity-90 text-white px-6 py-2 rounded-lg`}
                >
                  {editingProduct ? "💾 Update" : "➕ Add"}
                </button>
              </div>
            </form>
          )}
        </section>

        {/* Product List */}
        <section className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">
            📦 All Products ({products.length})
          </h3>

          {products.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              No products added yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3 text-left">Image</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Qty</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr
                      key={p._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-14 h-14 object-cover rounded"
                        />
                      </td>
                      <td className="p-3 font-medium">{p.name}</td>
                      <td className="p-3">{p.category}</td>
                      <td className="p-3">${p.price}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            p.quantity > 10
                              ? "bg-green-100 text-green-700"
                              : p.quantity > 0
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {p.quantity}
                        </span>
                      </td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;