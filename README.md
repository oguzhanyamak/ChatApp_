# ChatApp_ - Tam Kapsamlı Sohbet Uygulaması

## Genel Bakış
ChatApp_, modern web teknolojileriyle geliştirilmiş, gerçek zamanlı mesajlaşma imkanı sunan tam kapsamlı bir sohbet uygulamasıdır. Proje iki ana bölümden oluşur:
- **Frontend (ChatApp/):** React tabanlı kullanıcı arayüzü
- **Backend (server/):** Node.js ve Express tabanlı REST API ve WebSocket sunucusu

Kullanıcılar kayıt olabilir, giriş yapabilir, profilini yönetebilir ve gerçek zamanlı olarak mesajlaşabilir.

---

## Uygulama Akış Diyagramı

```mermaid
graph TD;
  A[Kullanıcı] -->|Giriş/Kayıt| B[Frontend (React)]
  B -->|API İstekleri| C[Backend (Express)]
  C -->|Veri| D[MongoDB]
  B <--> |Gerçek Zamanlı| E[Socket.io Sunucusu]
  E <--> B
```

---

## Kullanılan Teknolojiler

### Frontend (ChatApp/)
- **React**: Bileşen tabanlı modern arayüz
- **Vite**: Hızlı geliştirme ve derleme
- **Zustand**: Global state yönetimi
- **Axios**: API istekleri
- **CSS**: Özelleştirilmiş stiller

### Backend (server/)
- **Node.js & Express**: REST API ve sunucu
- **MongoDB (Mongoose ile)**: Veritabanı
- **JWT**: Kimlik doğrulama
- **Socket.io**: Gerçek zamanlı mesajlaşma
- **Cloudinary**: Medya dosyası yönetimi

---

## Proje Mimarisi

### 1. Frontend (ChatApp/)
- **src/components/**: Arayüz bileşenleri (Navbar, ChatContainer, Sidebar, vs.)
- **src/pages/**: Sayfa bazlı bileşenler (Login, Signup, Home, Profile, Settings)
- **src/store/**: Zustand ile global state yönetimi (auth, chat, tema)
- **src/lib/**: Yardımcı fonksiyonlar ve axios ayarları
- **src/constants/**: Sabitler
- **src/assets/**: Görseller

#### Frontend Veri Akışı
- Kullanıcı, arayüz üzerinden kimlik doğrulama işlemlerini gerçekleştirir, sohbetleri görüntüler ve mesaj gönderir.
- API istekleri Axios ile backend'e iletilir.
- Gerçek zamanlı mesajlar Socket.io ile alınır/gönderilir.
- Zustand ile auth, chat ve tema state'i yönetilir.

#### Örnek API Kullanımı
```js
// Giriş
axios.post('/api/auth/login', { email, password })
// Mesaj gönderme
axios.post('/api/messages', { to: userId, content: 'Merhaba!' })
```

#### Örnek Socket Eventleri
- `connect`, `disconnect`
- `sendMessage`, `receiveMessage`
- `userOnline`, `userOffline`

### 2. Backend (server/)
- **src/controllers/**: İş mantığı (auth, mesaj)
- **src/models/**: Mongoose modelleri (User, Message)
- **src/routes/**: API uç noktaları (auth, mesaj)
- **src/middleware/**: Kimlik doğrulama ve diğer ara yazılımlar
- **src/lib/**: Yardımcı kütüphaneler (db bağlantısı, socket, cloudinary)

#### Backend Veri Akışı
- REST API ile kullanıcı yönetimi, kimlik doğrulama, mesajlaşma ve medya yükleme işlemleri yapılır.
- WebSocket (Socket.io) ile gerçek zamanlı mesaj iletimi sağlanır.
- JWT ile kimlik doğrulama yapılır.

#### Örnek API Endpointleri
- `POST /api/auth/signup` - Kullanıcı kaydı
- `POST /api/auth/login` - Giriş
- `GET /api/messages/:chatId` - Sohbet mesajlarını getir
- `POST /api/messages` - Mesaj gönder

#### Örnek Socket Eventleri
- `sendMessage` (client -> server): Yeni mesaj gönder
- `receiveMessage` (server -> client): Yeni mesajı al
- `userOnline` / `userOffline`: Kullanıcı durum güncellemesi

---

## Kullanıcı Senaryoları

### 1. Kayıt Olma
- Kullanıcı, kayıt formunu doldurur ve gönderir.
- Backend, kullanıcıyı veritabanına kaydeder ve JWT token döner.
- Kullanıcı otomatik olarak giriş yapar.

### 2. Giriş Yapma
- Kullanıcı, e-posta ve şifresiyle giriş yapar.
- Backend, bilgileri doğrular ve JWT token döner.
- Kullanıcı sohbet ekranına yönlendirilir.

### 3. Mesaj Gönderme
- Kullanıcı, bir sohbet seçer ve mesaj yazar.
- Mesaj, API ve Socket.io ile backend'e iletilir.
- Mesaj, veritabanına kaydedilir ve ilgili kullanıcıya gerçek zamanlı iletilir.

### 4. Profil Güncelleme
- Kullanıcı, profil bilgilerini günceller.
- Değişiklikler backend'e iletilir ve kaydedilir.

---

## Çevresel Değişkenler

### Backend için `.env` Örneği
```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/chatapp
JWT_SECRET=supersecretkey
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend için
- Gerekirse, API URL'si için `.env` dosyası oluşturulabilir:
```
VITE_API_URL=http://localhost:5000
```

---

## Kurulum ve Çalıştırma

### 1. Gereksinimler
- Node.js (v16+ önerilir)
- MongoDB (lokal veya bulut)

### 2. Projeyi Klonlayın
```bash
git clone <repo-url>
cd ChatApp_
```

### 3. Frontend Kurulumu
```bash
cd ChatApp
npm install
npm run dev
```
- Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışır.

### 4. Backend Kurulumu
```bash
cd server
npm install
npm run dev
```
- API varsayılan olarak `http://localhost:5000` adresinde çalışır.
- `.env` dosyası oluşturup gerekli ortam değişkenlerini girin (örnek: MONGO_URI, JWT_SECRET, CLOUDINARY ayarları).

---

## Önemli Dosya ve Klasörler

- **ChatApp/src/components/**: Tüm temel arayüz bileşenleri
- **ChatApp/src/pages/**: Sayfa bazlı bileşenler
- **ChatApp/src/store/**: Global state yönetimi
- **server/src/controllers/**: API iş mantığı
- **server/src/models/**: Veritabanı modelleri
- **server/src/routes/**: API uç noktaları

---

## Test ve Debug İpuçları
- **Frontend:**
  - Konsolda hata mesajlarını takip edin (F12 > Console).
  - API isteklerinde hata alırsanız, ağ (Network) sekmesinden isteği inceleyin.
  - State yönetimi için Zustand devtools kullanılabilir.
- **Backend:**
  - Sunucu loglarını takip edin.
  - MongoDB bağlantı hatalarını kontrol edin.
  - Postman veya Insomnia ile API endpointlerini manuel test edin.
- **Socket.io:**
  - Bağlantı ve event loglarını hem client hem server tarafında kontrol edin.

---

## Geliştirici Notları
- Kod standartlarına ve dosya yapısına uyulması önerilir.
- Fonksiyon ve bileşen isimlendirmelerinde İngilizce kullanılması tavsiye edilir.
- PR göndermeden önce kodunuzu test edin.
- Gerekli ise yorum satırları ve dokümantasyon ekleyin.

---

## Katkı Sağlama
1. Fork'layın ve yeni bir branch açın.
2. Değişikliklerinizi yapın.
3. Test edin.
4. Pull Request gönderin.

---

## Sıkça Sorulan Sorular (FAQ)

**1. Giriş yapamıyorum, ne yapmalıyım?**
- Sunucunun ve veritabanının çalıştığından emin olun. Konsolda hata mesajlarını kontrol edin.

**2. Gerçek zamanlı mesajlar neden gelmiyor?**
- Hem frontend hem backend'in aynı anda çalıştığından ve Socket.io bağlantısının kurulduğundan emin olun.

**3. Ortam değişkenleri neler olmalı?**
- Backend için `.env` dosyasında en az şu değişkenler olmalı:
  - `MONGO_URI`
  - `JWT_SECRET`
  - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

---

## Kaynaklar ve Ek Belgeler
- [React Belgeleri](https://react.dev/)
- [Express.js Belgeleri](https://expressjs.com/)
- [MongoDB Belgeleri](https://www.mongodb.com/docs/)
- [Socket.io Belgeleri](https://socket.io/docs/)
- [Cloudinary Belgeleri](https://cloudinary.com/documentation)

---