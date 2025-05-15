import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Базовый URL API

// Функция для получения результатов лабораторных работ
export const fetchLabResults = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_BASE_URL}/get-lab-results`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
