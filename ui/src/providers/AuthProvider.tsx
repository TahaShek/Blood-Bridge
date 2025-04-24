import { createContext, useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { loginUser, registerUser, me } from "@/services/authApi";
import { LoginCredentials, RegisterCredentials, User } from "@/types";

type AuthContextType = {
  user: User | null;
  // isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const accessToken = Cookies.get("accessToken1");
      if (!accessToken) return;

      setIsLoading(true);
      const userData = await me();
      setUser(userData);
      console.log(userData, "asdsad");
    } catch (err) {
      console.error("Failed to fetch user", err);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = Cookies.get("accessToken1");
      if (accessToken) {
        await fetchUser();
      }
    };
    initializeAuth();
  }, [fetchUser]);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const { accessToken, refreshToken } = await loginUser(credentials);

      // Set cookies for tokens only
      const cookieOptions = {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict" as const,
      };

      Cookies.set("accessToken1", accessToken, cookieOptions);
      Cookies.set("refreshToken", refreshToken, cookieOptions);

      // Fetch user data after successful login
      await fetchUser();
    } catch (err) {
      console.log(err, "asdad");
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    try {
      const { phoneNumber, password } = credentials;
      const loginCreds = {
        password,
        phoneNumber,
      };
      await registerUser(credentials);
      await login(loginCreds);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    // Remove all auth cookies
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    // Additional cleanup can go here
  }, []);

  const value = {
    user,
    // isAuthenticated: !!user,
    login,
    register,
    logout,
    isLoading,
    error,
    fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
