// Component for displaying auth status and testing API
import { useAuth } from "../auth/AuthContext";
import { useApi } from "../api/useApi";

const AuthStatus = () => {
  const { token, setToken } = useAuth();
  const { request, loading, error, data } = useApi();

  // Handle logout
  const handleLogout = async () => {
    try {
      await request("/api/auth/logout", { method: "POST" });
      setToken(null);
      document.cookie =
        "refreshToken=; max-age=0; path=/api/auth/refresh-token";
    } catch (err) {
      // Error handled by useApi
    }
  };

  // Test protected API
  const handleTestApi = async () => {
    try {
      await request("/api/protected/resource");
    } catch (err) {
      // Error handled by useApi
      console.error(err);
    }
  };

  return (
    <div>
      <h2>حالة المصادقة</h2>
      {token ? (
        <div>
          <p>
            مسجل الدخول! التوكن: <code>{token}</code>
          </p>
          <button onClick={handleLogout} disabled={loading}>
            {loading ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}
          </button>
          <button onClick={handleTestApi} disabled={loading}>
            اختبار API
          </button>
          {data && (
            <p style={{ color: "green" }}>نجاح: {JSON.stringify(data)}</p>
          )}
          {error && <p style={{ color: "red" }}>خطأ: {error}</p>}
        </div>
      ) : (
        <p>غير مسجل الدخول</p>
      )}
    </div>
  );
};

export default AuthStatus;
