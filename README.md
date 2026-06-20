# CineTrack — Film & Dizi Takip Uygulaması

> İzlediğiniz filmleri arşivleyin, izleyeceklerinizi listeleyin, puan verin ve modern bir arayüzde takip edin.
> **React 18 + Vite + Tailwind CSS** ile geliştirilmiş, verileri tarayıcı `LocalStorage`'ında saklayan, tek sayfalık (SPA) bir web uygulaması.

---

## Ekran Görüntüsü

![CineTrack Ekran Görüntüsü](./screenshots/home.png)

> Uygulamayı `npm run dev` ile çalıştırdıktan sonra ekran görüntüsünü alıp `screenshots/home.png` dosyasına kaydedin.

---

## Özellikler

- **Tam CRUD**: Film/dizi **Ekle**, **Listele**, **Güncelle**, **Sil** işlemleri
- **İki Kategori**: İzlenenler ve İzlenecekler — tek tıkla durum değiştirme
- **Arama**: Başlık veya yönetmen üzerinden anlık arama
- **Filtreleme**: Türe göre filtreleme
- **Sıralama**: Yeni eklenen, puan, yıl, alfabetik
- **Puan Sistemi**: 0-10 arası kişisel puanlama
- **Kişisel Notlar**: Her yapım için özel not alanı
- **Poster Önizleme**: URL ile poster ekleme ve canlı önizleme
- **Onay Modali**: Silme öncesi güvenlik onayı
- **LocalStorage**: Veriler tarayıcıda kalıcı olarak saklanır
- **Responsive Tasarım**: Mobil, tablet ve masaüstü uyumlu
- **Karanlık Tema**: Sinematik, modern bir görünüm
- **Animasyonlar**: Yumuşak geçişler ve micro-interactionlar

---

## Kullanılan Teknolojiler

| Teknoloji          | Açıklama                                      |
| ------------------ | --------------------------------------------- |
| React 18           | UI kütüphanesi                                |
| Vite 5             | Hızlı dev server ve modern bundler            |
| React Router DOM 6 | İstemci tarafı yönlendirme                    |
| Tailwind CSS 3     | Utility-first CSS framework                   |
| lucide-react       | Modern, hafif ikon kütüphanesi                |
| uuid               | Benzersiz kimlik üretimi                      |
| LocalStorage API   | Tarayıcıda veri kalıcılığı                    |

---

## Proje Klasör Yapısı

```
cinetrack/
├── public/
│   ├── favicon.svg
│   └── _redirects              # Netlify SPA redirect
├── screenshots/                # Ekran görüntüleri
├── src/
│   ├── components/             # Tekrar kullanılabilir UI bileşenleri
│   │   ├── Navbar.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieForm.jsx
│   │   ├── MovieList.jsx
│   │   ├── FilterBar.jsx
│   │   ├── ConfirmDialog.jsx
│   │   └── EmptyState.jsx
│   ├── pages/                  # Sayfa seviyesindeki bileşenler
│   │   ├── HomePage.jsx
│   │   ├── WatchedPage.jsx
│   │   ├── ToWatchPage.jsx
│   │   ├── AddEditPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── interfaces/             # Veri şemaları
│   │   └── Movie.js
│   ├── hooks/                  # Custom React hook'ları
│   │   ├── useLocalStorage.js
│   │   └── useMovies.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── netlify.toml
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## Kurulum ve Çalıştırma

### Önkoşul

- **Node.js 18+** ([nodejs.org](https://nodejs.org/) üzerinden indirin)

### Adımlar

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Geliştirme sunucusunu başlat
npm run dev
# -> http://localhost:5173 adresinde açılır

# 3. Production build üret
npm run build

# 4. Production build önizlemesi
npm run preview
```

---

## CRUD İşlemlerinin Çalışma Mantığı

| İşlem     | Yer                                        | Açıklama                                                                            |
| --------- | ------------------------------------------ | ----------------------------------------------------------------------------------- |
| **Ekle**  | `/add` sayfası — `MovieForm` bileşeni      | Formdaki bilgilerle yeni bir film nesnesi oluşturulur, `uuid` üretilir, listeye eklenir. |
| **Listele** | `/`, `/watched`, `/to-watch` sayfaları    | Tüm/izlenen/izlenecek filmler grid olarak listelenir; arama, filtre ve sıralama uygulanır. |
| **Güncelle** | `MovieCard` üzerindeki düzenle butonu → `/edit/:id` | Mevcut form aynı bileşenle açılır, değişiklikler `updateMovie(id, patch)` ile yansıtılır. |
| **Sil**   | `MovieCard` üzerindeki çöp ikonu           | `ConfirmDialog` ile onay alınır, sonra `deleteMovie(id)` çağrılır.                  |

Tüm değişiklikler `useLocalStorage` hook'u sayesinde anında tarayıcının LocalStorage alanına yazılır.

---

## GitHub'a Yükleme

```bash
# 1. Git deposunu başlat
git init
git branch -M main

# 2. Tüm dosyaları stage'le ve ilk commit'i at
git add .
git commit -m "feat: ilk surum - CineTrack film takip uygulamasi"

# 3. GitHub'da yeni boş bir repo oluşturun (cinetrack) ve URL'sini kopyalayın
git remote add origin https://github.com/<KULLANICI-ADI>/cinetrack.git

# 4. Push edin
git push -u origin main
```

---

## Netlify ile Yayınlama

### Yöntem 1: GitHub Entegrasyonu (Önerilen)

1. [netlify.com](https://netlify.com) hesabınıza giriş yapın.
2. **Add new site → Import an existing project**.
3. GitHub'ı seçin ve `cinetrack` deposunu yetkilendirin.
4. Netlify, `netlify.toml` dosyasındaki ayarları otomatik algılar:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. **Deploy site**'a tıklayın. Birkaç dakika içinde canlıya alınır.

### Yöntem 2: Manuel Sürükle-Bırak

```bash
npm run build
```
Üretilen `dist/` klasörünü Netlify'ın **Sites** ekranına sürükleyip bırakın.

---

## Canlı Demo & Repo Linkleri

- **GitHub Repo**: `https://github.com/<KULLANICI-ADI>/cinetrack`
- **Netlify Canlı Demo**: `https://<SITE-ADI>.netlify.app`

> Yukarıdaki linkleri kendi deploy bilgilerinizle güncelleyin.

---

## Ödev Çıktıları (Kontrol Listesi)

- [x] Modern bir JavaScript kütüphanesi seçildi (React)
- [x] Kurulum ve geliştirme bir IDE ile yapıldı (Cursor / VS Code)
- [x] `components`, `pages`, `interfaces` klasörleri açıldı
- [x] Tailwind CSS projeye dahil edildi
- [x] TODO benzeri uygulama (CRUD) geliştirildi
- [x] Ekle / Listele / Güncelle / Sil işlemleri yapıldı
- [x] LocalStorage kullanıldı
- [x] Ekran görüntüsü eklendi (screenshots/)
- [ ] GitHub'a public olarak yüklendi (siz yapacaksınız)
- [ ] Netlify'a yayınlandı (siz yapacaksınız)

---

## Lisans

MIT
