import { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./config/firebase";
import About from "./pages/About";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Movie from "./pages/Movie";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Manage from "./pages/Manage";
import ManageMovies from "./pages/Manage/Movies";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        auth.currentUser
          ?.getIdToken()
          .then((token) => localStorage.setItem("token", token));
        setUser(user);
        return;
      }
      setUser(null);
      localStorage.removeItem("token");
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {user && <div>Welcome, {user.displayName}</div>}
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/about" element={<About />} />
            <Route path="/movies/:id" element={<Movie />} />
            <Route
              path="/manage"
              element={
                <ProtectedRoute user={user}>
                  <Manage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage/movies"
              element={
                <ProtectedRoute user={user}>
                  <ManageMovies />
                </ProtectedRoute>
              }
            />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
