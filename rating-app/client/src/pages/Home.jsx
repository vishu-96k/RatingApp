import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f2f2f2",
        minHeight: "100vh",
        paddingTop: "50px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          display: "inline-block",
          padding: "40px 60px",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ marginBottom: "30px", color: "#333" }}>
          Welcome to the Rating Platform
        </h1>
        <div>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
