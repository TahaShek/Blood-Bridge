import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap the app in AuthProvider */}
      <Suspense fallback={<div>Loading...</div>}>
        <main>
          <Outlet />
        </main>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
