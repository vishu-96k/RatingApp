import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, password: form.password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("email", form.email); // ✅ Save email
      localStorage.setItem("role", data.role);   // ✅ Save role if needed
      localStorage.setItem("name", data.name);

      alert("Login successful!");
      if (data.role === "user") {
        navigate("/user-dashboard");
      } else if (data.role === "owner") {
        navigate("/owner-dashboard");
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
  <h2 className="text-center mb-4">Login</h2>
  <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white">
    <input
      name="email"
      type="email"
      placeholder="Email"
      className="form-control mb-3"
      onChange={handleChange}
      value={form.email}
      required
    />
    <input
      name="password"
      type="password"
      placeholder="Password"
      className="form-control mb-3"
      onChange={handleChange}
      value={form.password}
      required
    />
    <button type="submit" className="btn btn-primary w-100">
      Login
    </button>
  </form>
</div>
  );
}

export default Login;
