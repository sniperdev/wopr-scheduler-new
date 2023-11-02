import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const LazyAuthPage = lazy(() => import("./pages/AuthPage/AuthPage.tsx"));
const LazyHomePage = lazy(() => import("./pages/HomePage/HomePage.tsx"));

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      <ProtectedRoute user={user}>
        <Route
          path="/app"
          element={
            <Suspense fallback={<h1>Ładowanie...</h1>}>
              <LazyHomePage />
            </Suspense>
          }
        ></Route>
      </ProtectedRoute>
      <Route
        path="/"
        element={
          <Suspense fallback={<h1>Ładowanie...</h1>}>
            <LazyAuthPage />
          </Suspense>
        }
      ></Route>
    </Routes>
  );
}

export default App;
