import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy } from "react";

// Layout components
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainSidebar from "./components/MainSidebar";
import ContactSidebar from "./components/ContactSidebar";
import ChatbotButton from "./components/shared/ChatbotButton";
import LanguageSwitcher from "./components/shared/LanguageSwitcher";

// Context
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/shared/RequireAuth";

// Lazy Pages
const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Teams = lazy(() => import("./pages/Teams"));
const Terms = lazy(() => import("./pages/Terms"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const FAQ = lazy(() => import("./pages/FAQ"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            {/* Header and Language */}
            <Header />
            <LanguageSwitcher />

            <div className="flex flex-1">
              {/* Sidebar */}
              <MainSidebar />

              {/* Main content */}
              <main className="flex-1 p-4 overflow-y-auto">
                <Suspense
                  fallback={
                    <div className="text-center p-10" role="status" aria-live="polite">
                      Ana lodin shafin...
                    </div>
                  }
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/help" element={<HelpCenter />} />
                    <Route
                      path="/dashboard"
                      element={
                        <RequireAuth>
                          <Dashboard />
                        </RequireAuth>
                      }
                    />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>

              {/* Contact Sidebar */}
              <ContactSidebar />
            </div>

            {/* Footer & WhatsApp Bot */}
            <Footer />
            <ChatbotButton />
          </div>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;