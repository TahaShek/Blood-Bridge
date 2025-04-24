import { useContext, useEffect } from "react";
import AuthContext from "./AuthProvider";

const AppInitializer = () => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    auth?.fetchUser();
  }, []);

  return null;
};

export default AppInitializer;
