# CineTrack

Letterboxd ve IMDb gibi sitelere notlar tutmak yerine kendime küçük bir takip uygulaması yapmak istedim. CineTrack tam olarak bunun için: izlediğim filmleri ve dizileri kaydediyorum, sonra izleyeceklerimi listeye atıyorum, hangi dizide kaçıncı bölümde kaldığımı unutmamak için S2E05 gibi not düşüyorum, sevdiklerime 10 üzerinden puan veriyorum.

**Canlı demo:** https://cinetrack-enes.netlify.app/

## Ekran Görüntüsü

![CineTrack](./screenshots/home.png)

## Kullanılan Teknolojiler

React 18 ile yazdım, build tool olarak Vite kullandım çünkü dev server çok hızlı açılıyor. Stillendirme tarafında Tailwind CSS var, sayfalar arası geçişler için React Router. Toast bildirimleri için Sonner, ikonlar için lucide-react paketinden faydalandım. Veri tarafında ise işin içine backend katmamak için her şeyi tarayıcının LocalStorage'ında tutuyorum.

## Neler Yapabiliyor

- Film ya da dizi ekleyip istediğin zaman düzenleyebilir veya silebilirsin
- "İzlediklerim" ve "İzleyeceklerim" diye iki ayrı sekme var
- Başlığa veya yönetmene göre arama, türe göre filtreleme yapılıyor
- En yeniye, en yüksek puana, yıla veya alfabetik olarak sıralayabilirsin
- 0-10 arası puan + her yapım için kendine özel not alanı
- Dizilerde sezon/bölüm bilgisi tutuluyor, "Sonraki Bölüm" butonuyla tek tıkla sayaç artıyor
- Anasayfada küçük bir istatistik paneli (toplam kayıt, izlenenlerin yüzdesi, ortalama puan, en sevdiğin tür gibi)
- Yanlışlıkla bir şey silersen "geri al" seçeneği çıkıyor
- Tamamen koyu tema, telefon ve tablette de düzgün açılıyor
