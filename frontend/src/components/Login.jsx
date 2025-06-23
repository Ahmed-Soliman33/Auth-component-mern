// Component for user sign-in
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useApi } from "../api/useApi";

const Login = () => {
  const { setToken } = useAuth();
  const { request, loading, error, data } = useApi();
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      return;
    }

    try {
      const response = await request("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setToken(response.token);
      setFormData({ email: "", password: "" });
    } catch (err) {
      // Error handled by useApi
    }
  };

  return (
    <div className="mx-auto flex flex-col gap-3 pb-3">
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>البريد الإلكتروني</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="أدخل بريدك الإلكتروني"
          />
        </div>
        <div>
          <label>كلمة المرور</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="أدخل كلمة المرور"
          />
        </div>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          type="submit"
          disabled={loading}
        >
          {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
      </form>
      {data && <p style={{ color: "green" }}>تم تسجيل الدخول بنجاح!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
