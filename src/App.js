import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated';
import Cart from "./components/Cart";

function App() {
  return (
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route
                path="/login"
                element={
                  <RedirectIfAuthenticated>
                    <Login />
                  </RedirectIfAuthenticated>
                }
            />
            <Route
                path="/register"
                element={
                  <RedirectIfAuthenticated>
                    <Register />
                  </RedirectIfAuthenticated>
                }
            />
            <Route
                path="/Products"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
            />
              <Route
                  path="/cart"
                  element={
                      <ProtectedRoute>
                          <Cart />
                      </ProtectedRoute>
                  }
              />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
