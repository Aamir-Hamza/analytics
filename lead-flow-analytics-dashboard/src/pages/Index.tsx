import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem("auth-token");
    
    if (token) {
      // If user has a token, redirect to dashboard
      navigate("/dashboard");
    } else {
      // Otherwise redirect to login
      navigate("/auth/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Loading...</h1>
        <p className="text-xl text-gray-600">Please wait</p>
      </div>
    </div>
  );
};

export default Index;
