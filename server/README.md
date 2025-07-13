# ChatApp Backend (Node.js/Express/MongoDB)

Bu klasör, ChatApp uygulamasının backend (sunucu) tarafını içerir. Kullanıcı kimlik doğrulama, mesajlaşma, gerçek zamanlı iletişim (Socket.io), dosya yükleme (Cloudinary) ve JWT tabanlı güvenlik gibi temel işlevleri sağlar.

## İçindekiler

- [Kurulum](#kurulum)
- [Ortam Değişkenleri](#ortam-değişkenleri)
- [Çalıştırma](#çalıştırma)
- [Proje Yapısı](#proje-yapısı)
- [Ana Bağımlılıklar](#ana-bağımlılıklar)
- [API Endpointleri](#api-endpointleri)
- [Gerçek Zamanlı İletişim (Socket.io)](#gerçek-zamanlı-iletişim-socketio)
- [Veritabanı Modelleri](#veritabanı-modelleri)
- [Notlar](#notlar)

---

## Kurulum

1. **Bağımlılıkları yükleyin:**
   ```bash
   cd server
   npm install
   ```

2. **Ortam değişkenlerini ayarlayın:**
   - `.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin (örnek değerlerle):

     ```
     PORT=8080
     MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/
     DATABASE_NAME=chatapp
     ACCESS_TOKEN_SECRET=your_jwt_secret
     CLOUDINARY_NAME=your_cloudinary_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     NODE_ENV=development
     ```

## Çalıştırma

- Geliştirme modunda başlatmak için:
  ```bash
  npm run dev
  ```
- Sunucu, varsayılan olarak `http://localhost:8080` adresinde çalışır.

## Proje Yapısı

```
server/
  ├── src/
  │   ├── controllers/      # İş mantığı ve endpoint fonksiyonları
  │   ├── lib/              # Yardımcı kütüphaneler (db, socket, cloudinary, utils)
  │   ├── middleware/       # Orta katman (JWT koruması)
  │   ├── models/           # Mongoose şemaları
  │   ├── routes/           # API rotaları
  │   └── index.js          # Ana uygulama dosyası
  ├── package.json
  └── ...
```

## Ana Bağımlılıklar

- express
- mongoose
- dotenv
- bcryptjs
- jsonwebtoken
- cookie-parser
- cors
- socket.io
- cloudinary
- nodemon (geliştirme için)

## API Endpointleri

### Auth (Kimlik Doğrulama) - `/api/auth`

| Yöntem | Endpoint             | Açıklama                        | Koruma   |
|--------|----------------------|---------------------------------|----------|
| POST   | `/signup`            | Kayıt ol                        | Hayır    |
| POST   | `/login`             | Giriş yap                       | Hayır    |
| POST   | `/logout`            | Çıkış yap                       | Hayır    |
| PUT    | `/update-profile`    | Profil fotoğrafı güncelle        | Evet     |
| GET    | `/check`             | Oturum kontrolü (mevcut kullanıcı)| Evet   |

### Mesajlaşma - `/api/messages`

| Yöntem | Endpoint             | Açıklama                        | Koruma   |
|--------|----------------------|---------------------------------|----------|
| GET    | `/users`             | Sohbet için kullanıcıları getir | Evet     |
| GET    | `/:id`               | Belirli kullanıcı ile mesajları getir | Evet |
| POST   | `/send/:id`          | Mesaj gönder (isteğe bağlı resim ile) | Evet |

## Gerçek Zamanlı İletişim (Socket.io)

- Sunucu, Socket.io ile gerçek zamanlı mesajlaşma ve çevrimiçi kullanıcı takibi sağlar.
- Bağlanan her kullanıcı için `userSocketMap` ile socket id eşleştirilir.
- Yeni mesajlar ilgili kullanıcıya anlık olarak iletilir.
- Çevrimiçi kullanıcı listesi tüm istemcilere yayınlanır.

## Veritabanı Modelleri

### User

| Alan       | Tip     | Açıklama                |
|------------|---------|------------------------|
| email      | String  | E-posta, benzersiz     |
| fullName   | String  | Ad Soyad               |
| password   | String  | Hashlenmiş şifre       |
| profilePic | String  | Profil fotoğrafı URL    |

### Message

| Alan       | Tip     | Açıklama                |
|------------|---------|------------------------|
| senderId   | ObjectId| Gönderen kullanıcı     |
| receiverId | ObjectId| Alıcı kullanıcı        |
| text       | String  | Mesaj içeriği          |
| image      | String  | (Opsiyonel) Resim URL  |

## Notlar

- **JWT**: Kimlik doğrulama ve korumalı rotalar için kullanılır. Token, cookie olarak saklanır.
- **Cloudinary**: Profil fotoğrafı ve mesaj içi resimler için bulut depolama.
- **CORS**: Sadece `http://localhost:5173` (frontend) adresine izin verilir.
- **Çevre Değişkenleri**: Tüm hassas bilgiler `.env` dosyasında tutulmalıdır.
- **Geliştirme**: `nodemon` ile otomatik yeniden başlatma desteklenir.

--- 