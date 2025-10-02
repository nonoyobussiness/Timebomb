// App.tsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateTimebomb from "./pages/CreateTimebomb";
import NotFound from "./pages/NotFound";
import Friends from "./pages/Friends";
import Gossip from "./pages/Gossip";
import Landing from "./pages/Landing";
import Messenger from "./pages/Messenger";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

import BottomNav from "./components/BottomNav";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to="/home" replace />;
}

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/home" replace />} />
    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
    <Route path="/landing" element={<PublicRoute><Landing /></PublicRoute>} />
    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path="/create" element={<ProtectedRoute><CreateTimebomb /></ProtectedRoute>} />
    <Route path="/messenger" element={<ProtectedRoute><Messenger /></ProtectedRoute>} />
    <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/friends" element={<ProtectedRoute><Friends /></ProtectedRoute>} />
    <Route path="/gossip" element={<ProtectedRoute><Gossip /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

function Layout() {
  const location = useLocation();

  // define routes where BottomNav should NOT appear
  const hiddenRoutes = ["/login", "/landing", "/"];

  const shouldHideNav = hiddenRoutes.includes(location.pathname);

  return (
    <>
      <div className="pb-20">
        <AppRoutes />
      </div>
      {!shouldHideNav && <BottomNav />}
    </>
  );
}

const App = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
