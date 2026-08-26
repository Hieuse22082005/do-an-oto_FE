import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Tạo một instance axios để tự động đính kèm token (nếu có)
const apiClient = axios.create({
  baseURL: API_URL,
});

// Tự động gắn token vào Header để Backend biết ai đang gọi API
apiClient.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  // 1. AUTH API (Gọi xuống BE để BE làm việc với Supabase)
  sendOtp: (email: string, fullName: string, phone: string, isRegister: boolean) => 
    apiClient.post("/api/v1/auth/send-otp", { email, fullName, phone, isRegister }),
    
  verifyOtp: (email: string, otp: string) => 
    apiClient.post("/api/v1/auth/verify-otp", { email, otp }),

  // 2. TRANSACTION API
  evaluateCar: (payload: any) => 
    apiClient.post("/api/v1/transactions/evaluate", payload),
    
  searchTx: (txhash: string) => 
    apiClient.get(`/api/v1/transactions/${txhash}`),
};