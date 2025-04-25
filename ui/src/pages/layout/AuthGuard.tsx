import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { PacmanLoader } from "react-spinners";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [checkedAuth, setCheckedAuth] = useState(false); // Local state to track check completion

  useEffect(() => {
    const checkAuth = async () => {
      if (!auth.user) {
        await auth.fetchUser();
      }
      setCheckedAuth(true); // Only set this after fetchUser completes
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (checkedAuth && !auth.user && !auth.isLoading) {
      navigate("/", { replace: true });
    }
  }, [checkedAuth, auth.user, auth.isLoading, navigate]);

  if (!checkedAuth || auth.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PacmanLoader color="red" size={120} />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
