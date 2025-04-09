import { useState, useEffect } from "react";

function OwnerDashboard() {
  const [storeName, setStoreName] = useState("");
  const [stores, setStores] = useState([]);
  const ownerEmail = localStorage.getItem("email");
  const ownerN = localStorage.getItem("name");


  const fetchStores = () => {
    fetch("http://localhost:5000/api/stores")
      .then((res) => res.json())
      .then((data) => {
        // Filter stores owned by the current owner (optional)
        setStores(data);
      });
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleAddStore = async () => {
    const res = await fetch("http://localhost:5000/api/stores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: storeName }),
    });

    const data = await res.json();
    alert(data.message || "Store added!");
    setStoreName("");
    fetchStores(); // Refresh the list
  };

  const handleLogout = () => {
    alert("Logged out!");
    window.location.href = "/login";
  };

  return (
    <div className="container mt-5">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2>Store Owner Dashboard</h2>
        <p className="text-muted">Welcome, <strong>{ownerEmail}</strong></p>
      </div>
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>

    <div className="card p-4 shadow mb-4">
      <h5>Add a New Store</h5>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter store name"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddStore}>
          Add Store
        </button>
      </div>
    </div>

    <div className="card p-4 shadow">
      <h5>Your Stores</h5>
      <ul className="list-group">
        {stores.map((store, i) => (
          <li key={i} className="list-group-item">
            {store.name}
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
}

export default OwnerDashboard;
