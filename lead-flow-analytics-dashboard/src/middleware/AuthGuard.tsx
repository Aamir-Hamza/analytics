
import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);
  const isAuthPage = location.pathname.startsWith("/auth");
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    const verifyAuth = async () => {
      if (!token && !isAuthPage) {
        // If no token and not on auth page, redirect to login
        toast.error("Please log in to access this page");
        navigate("/auth/login", { replace: true });
        setIsVerifying(false);
        return;
      } else if (token && isAuthPage) {
        // If has token and on auth page, redirect to dashboard
        navigate("/dashboard", { replace: true });
        setIsVerifying(false);
        return;
      }

      // If we have a token and we're not on an auth page, verify the token
      if (token && !isAuthPage) {
        try {
          // For mock token, just check if it exists
          if (token === "mock-jwt-token-for-testing") {
            // Valid mock token
            setIsVerifying(false);
            return;
          }
          
          // For real token, you would verify with your API
          // const response = await fetch("/api/auth/verify", {
          //   method: "GET",
          //   headers: {
          //     "Authorization": `Bearer ${token}`
          //   }
          // });
          
          // if (!response.ok) {
          //   throw new Error("Invalid token");
          // }
          
          // If no verification implemented yet, assume token is valid
          setIsVerifying(false);
        } catch (error) {
          // If verification fails, clear token and redirect to login
          console.error("Auth verification error:", error);
          localStorage.removeItem("auth-token");
          localStorage.removeItem("user-role");
          toast.error("Your session has expired. Please log in again.");
          navigate("/auth/login", { replace: true });
          setIsVerifying(false);
        }
      } else {
        setIsVerifying(false);
      }
    };

    verifyAuth();
  }, [token, isAuthPage, navigate]);

  // Show loading state while verifying
  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Verifying authentication...</h1>
          <p className="text-gray-600">Please wait</p>
        </div>
      </div>
    );
  }

  // Only render the children if the user is authenticated or on an auth page
  return <>{(token || isAuthPage) && children}</>;
};

export default AuthGuard;
