import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Timer, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="relative">
          <Timer className="h-20 w-20 text-primary mx-auto opacity-50" />
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gradle">404</h1>
          <h2 className="text-xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            This timebomb seems to have exploded... The page you're looking for doesn't exist.
          </p>
        </div>
        
        <Button 
          onClick={() => window.location.href = '/home'}
          className="bg-gradle-primary text-primary-foreground hover:opacity-90 shadow-glow"
        >
          <Home className="h-4 w-4 mr-2" />
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
