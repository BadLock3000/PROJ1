import MainPage from "./components/mainPage/MainPage";
import "./App.css";
import LoginForm from "./loginForm/LoginForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/mainPage/header/Header";

import { Stack } from "@mui/material";
import AdminPage from "./components/mainPage/AdminPage/AdminPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  console.log({ vvefvevev: selectedSubject });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      if (response.data.token) {
        setMessage(`Login successful! Token: ${response.data.token}`);
        localStorage.setItem("token", response.data.token); // Сохраняем токен в localStorage
        setIsAuthenticated(true); // Устанавливаем состояние аутентификации
        setName(response.data.username[0].values[0]);
        localStorage.setItem("name", response.data.username[0].values[0]);
      } else {
        setMessage("Login successful!");
      }
    } catch (error) {
      setMessage(error.response.data);

      console.error("Authentication failed:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (token) {
      setIsAuthenticated(true);
    }
    if (name) {
      setName(name);
    }
  }, []);

  return (
    <Stack sx={{ minHeight: "100vh", flexDirection: "column" }}>
      <Header
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
        name={name}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
      />

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              name === "Администратор" ? (
                <Navigate to="/main" replace /> // Перенаправляем на /main для администратора
              ) : (
                <Navigate to="/main" replace /> // Перенаправляем на /main для обычного пользователя
              )
            ) : (
              <Navigate to="/login" replace /> // Перенаправляем на /login, если не аутентифицирован
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/main" replace />
            ) : (
              <LoginForm
                setIsAuthenticated={setIsAuthenticated}
                handleSubmit={handleSubmit}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                message={message}
                setMessage={setMessage}
              />
            )
          }
        />
        <Route
          path="/main"
          element={
            isAuthenticated ? (
              name === "Администратор" ? (
                <AdminPage
                  isAuthenticated={isAuthenticated}
                  selectedSubject={selectedSubject}
                  setSelectedSubject={setSelectedSubject}
                />
              ) : (
                <MainPage
                  selectedSubject={selectedSubject}
                  setSelectedSubject={setSelectedSubject}
                  setIsAuthenticated={setIsAuthenticated}
                  name={name}
                />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Stack>
  );
}

export default App;
