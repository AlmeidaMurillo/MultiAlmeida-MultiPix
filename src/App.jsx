import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import Spinner from "./components/Spinner/Spinner";

const LandingPage = lazy(() => import("./screens/clients/pages/LandingPage"));
const Register = lazy(() => import("./screens/universal/auth/Register"));
const Login = lazy(() => import("./screens/universal/auth/Login"));
const Dashboard = lazy(() => import("./screens/admins/pages/Dashboard"));
const PrivacyPolicy = lazy(() => import("./screens/universal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./screens/universal/TermsOfService"));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <BrowserRouter>
      <Spinner loading={loading} />
      {!loading && (
        <Suspense fallback={<Spinner loading={true} />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/criar-conta" element={<Register />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
            <Route path="/termos-uso" element={<TermsOfService />} />

            <Route path="/admin/dashboard" element={<Dashboard />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      )}
    </BrowserRouter>
  );
}

export default App;
