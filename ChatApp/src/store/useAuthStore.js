import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL ="http://localhost:3000" ;

// Auth ile ilgili global state yönetimi için zustand store'u
// Kullanıcı kimliği, oturum işlemleri, socket bağlantısı ve online kullanıcılar burada yönetilir
export const useAuthStore = create((set, get) => ({
  // Giriş yapmış kullanıcı bilgisi
  authUser: null,
  // Kayıt olma işlemi devam ediyor mu?
  isSigningUp: false,
  // Giriş yapma işlemi devam ediyor mu?
  isLoggingIn: false,
  // Profil güncelleme işlemi devam ediyor mu?
  isUpdatingProfile: false,
  // Kimlik doğrulama kontrolü devam ediyor mu?
  isCheckingAuth: true,
  // Online kullanıcıların id listesi
  onlineUsers: [],
  // Socket bağlantı nesnesi
  socket: null,

  // Kullanıcının oturumunun geçerli olup olmadığını kontrol eder
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Kullanıcı kaydı işlemini gerçekleştirir
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Kullanıcı giriş işlemini gerçekleştirir
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Kullanıcı çıkış işlemini gerçekleştirir
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  // Kullanıcı profilini günceller
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // Socket bağlantısı kurar ve online kullanıcıları dinler
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  // Socket bağlantısını koparır
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));