import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, ReactNode, Suspense, useState } from "react";

const LazyAuthPage = lazy(() => import("./pages/AuthPage/AuthPage.tsx"));
const LazyHomePage = lazy(() => import("./pages/HomePage/HomePage.tsx"));
const LazyAdminPage = lazy(() => import("./pages/AdminPage/AdminPage.tsx"));

interface ProtectedRouteProps {
  user: User | undefined;
  children: ReactNode;
}

const ProtectedRouteApp = ({ user, children }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const ProtectedRouteAdmin = ({ user, children }: ProtectedRouteProps) => {
  if (!user && !user?.isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState<User>();
  const [calendarToggle, setCalendarToggle] = useState<boolean>(true);

  return (
    <Routes>
      <Route
        path="/app"
        element={
          <ProtectedRouteApp user={user}>
            <Suspense fallback={<h1>Ładowanie...</h1>}>
              <LazyHomePage
                user={user!}
                setUser={setUser}
                calendarToggle={calendarToggle}
                setCalendarToggle={setCalendarToggle}
              />
            </Suspense>
          </ProtectedRouteApp>
        }
      ></Route>
      <Route
        path="/admin"
        element={
          <ProtectedRouteAdmin user={user}>
            <Suspense fallback={<h1>Ładowanie...</h1>}>
              <LazyAdminPage
                user={user!}
                setUser={setUser}
                calendarToggle={calendarToggle}
                setCalendarToggle={setCalendarToggle}
              />
            </Suspense>
          </ProtectedRouteAdmin>
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
