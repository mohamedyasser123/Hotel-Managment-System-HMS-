import { createContext, useEffect, useState, useContext, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  _id?: string;       
  role?: "admin" | "user"; 
  verified?: boolean;  
  iat?: number;
  exp?: number;
}

interface AuthContextType {
  loginData: DecodedToken | null;
  role: "admin" | "user" | null; 
  saveLoginData: (token: string) => void;
  logout: () => void; 
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({ children }: { children: ReactNode }) {
  const [loginData, setLoginData] = useState<DecodedToken | null>(null);
  const [role, setRole] = useState<"admin" | "user" | null>(null);


  const saveLoginData = (token: string) => {
    if (token) {
      localStorage.setItem('token', token);
      
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        setLoginData(decodedToken);
        
        if (decodedToken.role) {
          setRole(decodedToken.role);
          localStorage.setItem('role', decodedToken.role); 
        }
      } catch (error) {
        console.error("Invalid token during login:", error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setLoginData(null);
    setRole(null);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    
    if (savedToken) {
      try {
        const decodedToken: DecodedToken = jwtDecode(savedToken);
        
        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
          logout();
        } else {
          setLoginData(decodedToken);
          if (decodedToken.role) {
            setRole(decodedToken.role);
          }
        }
      } catch (e) {
        logout();
      }
    }
  }, []); 

  return (
    <AuthContext.Provider value={{ loginData, role, saveLoginData, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};