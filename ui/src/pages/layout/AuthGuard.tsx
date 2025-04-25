import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { PacmanLoader } from "react-spinners";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  console.log("auth:: ", auth);

  const getUser = async () => {
    await auth?.fetchUser();
    console.log("triggerd");
    console.log("user", auth.user);
    if (!auth?.user && !auth?.isLoading) {
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (!auth?.user) {
      getUser();
    }
  }, [auth?.user, auth?.isLoading, navigate]);

  if (!auth?.user) {
    return <PacmanLoader color="red" size={150} />;
  }

  return children;
};

export default AuthGuard;
