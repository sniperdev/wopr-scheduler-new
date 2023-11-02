import "./App.css";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const LazyAuthPage = lazy(() => import("./pages/AuthPage/AuthPage.tsx"));
const LazyHomePage = lazy(() => import("./pages/HomePage/HomePage.tsx"));

function App() {
  return (
    <Routes>
      <Route
        path="/app"
        element={
          <Suspense fallback={<h1>Ładowanie...</h1>}>
            <LazyHomePage />
          </Suspense>
        }
      ></Route>
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
