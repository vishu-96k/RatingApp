import { useEffect, useState } from "react";

function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/stores")
      .then((res) => res.json())
      .then((data) => setStores(data));
  }, []);

  const handleRatingChange = (storeName, value) => {
    setRatings({ ...ratings, [storeName]: value });
  };

  const submitRating = async (storeName) => {
    const rating = ratings[storeName];
    const userEmail = localStorage.getItem("email");

    if (!rating || rating < 1 || rating > 5) {
      return alert("Please enter a rating between 1 and 5.");
    }

    const res = await fetch("http://localhost:5000/api/stores/rate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ storeName, rating, userEmail }),
    });

    const data = await res.json();
    alert(data.message || "Rating submitted");
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      {stores.map((store, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <strong>{store.name}</strong>
          <div>
            <input
              type="number"
              min="1"
              max="5"
              value={ratings[store.name] || ""}
              onChange={(e) => handleRatingChange(store.name, e.target.value)}
              placeholder="Rate 1–5"
            />
            <button onClick={() => submitRating(store.name)}>Submit</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserDashboard;
