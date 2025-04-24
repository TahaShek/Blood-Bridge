import { createContext, useState, useCallback } from "react";
import { loginUser, registerUser, me, logoutUser } from "@/services/authApi";
import { LoginCredentials, RegisterCredentials, User } from "@/types";
import { toast } from "sonner";

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
      setIsLoading(true);
      const userData = await me();
      setUser(userData);
      console.log(userData, "user in auth slice");
    } catch (err) {
      console.error("Failed to fetch user", err);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user, statusCode, message } = await loginUser(credentials);

      if (statusCode === 200) {
        console.log("login res user:: ", user);
        setUser(user);
      } else {
        toast.message(message);
      }
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
      const { phoneNumber } = credentials;
      const loginCreds = {
        phoneNumber,
      };
      const { statusCode, message } = await registerUser(credentials);
      if(statusCode === 201) {
        toast.success("Account created successfully");
      } else {
        toast.error(message)
      }
      await login(loginCreds);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(async () => {
    setIsLoading(true);
    await logoutUser();
    setUser(null);
    setIsLoading(false);
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
