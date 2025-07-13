import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

// Mesajlaşma ile ilgili global state yönetimi için zustand store'u
// Kullanıcılar, mesajlar ve seçili kullanıcı burada yönetilir
export const useChatStore = create((set, get) => ({
  // Sohbet mesajları listesi
  messages: [],
  // Sohbet edilebilecek kullanıcılar listesi
  users: [],
  // Seçili kullanıcı (aktif sohbet edilen)
  selectedUser: null,
  // Kullanıcılar yükleniyor mu?
  isUsersLoading: false,
  // Mesajlar yükleniyor mu?
  isMessagesLoading: false,

  // Kullanıcı listesini API'dan çeker
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Seçili kullanıcı ile olan mesajları API'dan çeker
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  // Mesaj gönderme işlemini API'ya iletir ve state'e ekler
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  // Socket ile yeni mesajları dinler ve state'e ekler
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  // Socket'ten yeni mesaj dinlemeyi bırakır
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  // Seçili kullanıcıyı değiştirir
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));