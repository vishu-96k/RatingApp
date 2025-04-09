import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "user", // or "owner"
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful!");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
    <h2 className="text-center mb-4">Signup</h2>
    <form className="p-4 border rounded shadow bg-white" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          name="name"
          className="form-control"
          placeholder="Enter your name"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          name="email"
          type="email"
          className="form-control"
          placeholder="Enter your email"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <input
          name="address"
          className="form-control"
          placeholder="Enter your address"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          name="password"
          type="password"
          className="form-control"
          placeholder="Enter your password"
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Role</label>
        <select
          name="role"
          className="form-select"
          onChange={handleChange}
          value={form.role}
        >
          <option value="user">Normal User</option>
          <option value="owner">Store Owner</option>
        </select>
      </div>

      <button type="submit" className="btn btn-success w-100">
        Signup
      </button>
    </form>
  </div>
  );
}

export default Signup;
