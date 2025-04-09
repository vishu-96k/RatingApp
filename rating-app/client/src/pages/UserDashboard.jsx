import { useEffect, useState } from "react";

function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});
  const ownerEmail = localStorage.getItem("email");
  // const userName = localStorage.getItem("name"); 

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

  //star rating fun
  function StarRating({ rating, onRate }) {
    const [hovered, setHovered] = useState(0);
  
    return (
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              cursor: "pointer",
              color:
                star <= (hovered || rating)
                  ? "#FFD700" // Yellow if hovered or selected
                  : "#ccc",  // Grey otherwise
              fontSize: "24px",
              marginRight: "5px",
              transition: "color 0.2s",
            }}
            onClick={() => onRate(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
          >
            ★
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>User Dashboard</h2>
          <p className="text-muted">Welcome, <strong>{ownerEmail}</strong></p>
        </div>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="row">
        {stores.map((store, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card shadow-sm p-3">
              <h5>{store.name}</h5>
              <StarRating
  rating={parseInt(ratings[store.name]) || 0}
  onRate={(value) => handleRatingChange(store.name, value)}
/>
<button
  className="btn btn-primary w-100 mt-2"
  onClick={() => submitRating(store.name)}
>
  Submit Rating
</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
