# ChatApp Frontend (React + Vite)

Bu proje, modern bir sohbet uygulamasının frontend (istemci) kısmını React ve Vite kullanarak geliştirmek için hazırlanmıştır. Kullanıcılar arası gerçek zamanlı mesajlaşma, kullanıcı kimlik doğrulama, tema yönetimi ve profil ayarları gibi temel özellikleri içerir.

## Özellikler
- Kullanıcı kaydı ve girişi
- Gerçek zamanlı sohbet ve mesajlaşma
- Karanlık/aydınlık tema desteği
- Profil ve ayar yönetimi
- Modern ve kullanıcı dostu arayüz

## Kurulum

1. **Depoyu klonlayın:**
   ```bash
   git clone <repo-url>
   cd ChatApp_/ChatApp
   ```
2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```
3. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```
4. Tarayıcıda [http://localhost:5173](http://localhost:5173) adresini ziyaret edin.

## Klasör Yapısı
```
ChatApp/
├── public/              # Statik dosyalar (ikonlar, favicon, vs.)
├── src/
│   ├── assets/          # Görseller ve medya dosyaları
│   ├── components/      # React bileşenleri
│   │   └── skeletons/   # Yüklenme animasyonları için iskelet bileşenler
│   ├── constants/       # Sabitler ve konfigürasyonlar
│   ├── lib/             # Yardımcı kütüphaneler (ör. axios)
│   ├── pages/           # Sayfa bileşenleri (Home, Login, Profile, vs.)
│   ├── store/           # Zustand ile global durum yönetimi
│   ├── index.css        # Genel stiller
│   ├── main.jsx         # Uygulama giriş noktası
│   └── App.jsx          # Ana uygulama bileşeni
├── package.json         # Proje bağımlılıkları ve scriptler
├── vite.config.js       # Vite yapılandırması
└── README.md            # Proje dokümantasyonu
```

## Kullanılan Temel Teknolojiler
- [React](https://react.dev/) (v18+)
- [Vite](https://vitejs.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/) (global state management)
- [Axios](https://axios-http.com/) (HTTP istekleri için)
- [ESLint](https://eslint.org/) (kod kalitesi için)

## Komutlar
- `npm run dev` : Geliştirme sunucusunu başlatır
- `npm run build` : Üretim için derleme yapar
- `npm run preview` : Derlenmiş uygulamayı önizler
- `npm run lint` : Kodunuzu ESLint ile kontrol eder

