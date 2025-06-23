// Component for user signup
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useApi } from "../api/useApi";

const SignUp = () => {
  const { setToken } = useAuth();
  const { request, loading, error, data } = useApi();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [formError, setFormError] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = formData;

    if (!email || !password || !name) {
      setFormError("جميع الحقول مطلوبة");
      return;
    }

    try {
      const response = await request("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
      });
      setToken(response.accessToken);
      setFormData({ email: "", password: "", name: "" });
    } catch (err) {
      setFormError(err.message || "فشل إنشاء الحساب");
    }
  };

  return (
    <div>
      <h2>إنشاء حساب جديد</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>الاسم</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="أدخل اسمك"
          />
        </div>
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
          {loading ? "جاري الإنشاء..." : "إنشاء حساب"}
        </button>
      </form>
      {data && <p style={{ color: "green" }}>تم إنشاء الحساب بنجاح!</p>}
      {(error || formError) && (
        <p style={{ color: "red" }}>{error || formError}</p>
      )}
    </div>
  );
};

export default SignUp;
