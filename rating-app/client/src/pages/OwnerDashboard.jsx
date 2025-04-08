import { useState, useEffect } from "react";

function OwnerDashboard() {
  const [storeName, setStoreName] = useState("");
  const [stores, setStores] = useState([]);

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
    <div>
      <h2>Store Owner Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <div style={{ marginTop: "20px" }}>
        <input
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          placeholder="Store Name"
        />
        <button onClick={handleAddStore}>Add Store</button>
      </div>

      <h3>Your Stores:</h3>
      <ul>
        {stores.map((store, i) => (
          <li key={i}>{store.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default OwnerDashboard;
