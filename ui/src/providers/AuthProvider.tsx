import { createContext, useEffect, useState, useCallback } from "react";
// import * as Cookies from "js-cookie";
import { loginUser, registerUser } from "@/services/authApi";
import Cookies from "js-cookie";
import { LoginCredentials, RegisterCredentials, } from "@/types";

type AuthContextType = {
  user: any | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state from storage (e.g., cookies/token)
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = Cookies.get("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Failed to parse user data", err);
        logout();
      }
    };
    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await loginUser(credentials);
      setUser(userData);
      Cookies.set("user", JSON.stringify(userData), {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err; // Re-throw for component-level handling
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    try {
      await registerUser(credentials);
      // Optionally auto-login after registration:
      // await login(credentials);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    Cookies.remove("user");
    // Redirect or cleanup (e.g., clear Apollo cache)
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
