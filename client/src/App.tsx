import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, ReactNode, Suspense, useState } from "react";

const LazyAuthPage = lazy(() => import("./pages/AuthPage/AuthPage.tsx"));
const LazyHomePage = lazy(() => import("./pages/HomePage/HomePage.tsx"));

interface ProtectedRouteProps {
  user: User | undefined;
  children: ReactNode;
}

const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const [user, setUser] = useState<User>();

  return (
    <Routes>
      <Route
        path="/app"
        element={
          <ProtectedRoute user={user}>
            <Suspense fallback={<h1>Ładowanie...</h1>}>
              <LazyHomePage />
            </Suspense>
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/"
        element={
          <Suspense fallback={<h1>Ładowanie...</h1>}>
            <LazyAuthPage setUser={setUser} />
          </Suspense>
        }
      ></Route>
    </Routes>
  );
}

export default App;
