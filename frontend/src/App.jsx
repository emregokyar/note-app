import React from "react";
import Index from "./pages/Index";
import Home from "./pages/Home";
import About from "./pages/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";
import ProtectedRoute from "./context/ProtectedRoute";
import NoteProvider from "./context/NoteContext.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <NoteProvider>
                    <Home />
                  </NoteProvider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
