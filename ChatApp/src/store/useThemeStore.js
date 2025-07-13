import {create} from "zustand";

// Tema yönetimi için zustand store'u
// Seçili tema bilgisini localStorage ile saklar
export const useThemeStore=create((set) => ({
    // Aktif tema bilgisi
    theme:localStorage.getItem("chat-theme") || "coffe",
    // Temayı değiştirir ve localStorage'a kaydeder
    setTheme:(theme) => {
        localStorage.setItem("chat-theme",theme);
        set({theme});
    }
}))