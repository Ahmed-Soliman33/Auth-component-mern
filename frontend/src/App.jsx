import AuthStatus from "@components/AuthStatus";
import SignUp from "@components/SignUp";
import Login from "@components/Login";
import { AuthProvider, useAuth } from "@auth";

const AppContent = () => {
  const { token } = useAuth();

  return (
    <div className="container flex flex-col gap-5" style={{ padding: "20px" }}>
      <h1 className="text-center">تطبيق المصادقة</h1>
      {token ? (
        <AuthStatus />
      ) : (
        <div className="mx-auto text-center">
          <Login />
          <hr />
          <SignUp />
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
