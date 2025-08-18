# Mors Kodu Çevirici

Modern ve kullanıcı dostu bir Mors kodu çevirici uygulaması. Metin ile Mors kodu arasında çift yönlü çeviri yapabilir, ses çıkışı ile Mors kodunu dinleyebilirsiniz.

![Mors Kodu Çevirici](./public/preview.png)

## Özellikler

- **Çift Yönlü Çeviri**: Metni Mors koduna ve Mors kodunu metne çevirme
- **Sesli Oynatma**: Mors kodunu ses olarak dinleme özelliği
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Modern Arayüz**: Karanlık tema ve yumuşak animasyonlar
- **Hızlı ve Kolay**: Tek tıkla çeviri ve kopyalama
- **Gerçek Zamanlı**: Yazarken anlık çeviri
- **Panoya Kopyalama**: Çeviri sonucunu tek tıkla kopyalama
- **Özelleştirilebilir Ses**: Ayarlanabilir ton ve hız

## Kullanılan Teknolojiler

- **Next.js 15** - React çerçevesi
- **React 19** - Arayüz kütüphanesi
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Stil düzenlemesi
- **Framer Motion** - Animasyonlar
- **Radix UI** - Arayüz bileşenleri
- **Lucide React** - İkonlar
- **Web Audio API** - Ses üretimi

## Kurulum

### Ön Gereksinimler
- Node.js (v18 veya üzeri)
- pnpm, npm veya yarn

### Kurulum Adımları

```bash
# Repository'yi klonlayın
git clone https://github.com/umutcandev/morse-code-converter.git

# Proje dizinine gidin
cd morse-code-converter

# Bağımlılıkları yükleyin
pnpm install
# veya
npm install
# veya
yarn install

# Geliştirme sunucusunu başlatın
pnpm dev
# veya
npm run dev
# veya
yarn dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Kullanım

### Nasıl Kullanılır

1. **Metin → Mors**: Sol metin alanına yazmaya başlayın, otomatik olarak Mors koduna çevrilir
2. **Mors → Metin**: Çeviri modunu değiştirin ve Mors kodu girin
3. **Dinleme**: Oynat butonuna tıklayarak Mors kodunu dinleyin
4. **Kopyalama**: Kopyala butonuyla sonucu panoya kopyalayın

### Desteklenen Karakterler

- **Harfler**: A-Z
- **Sayılar**: 0-9
- **Noktalama İşaretleri**: . , ? ' ! / ( ) & : ; = + - _ " $ @
- **Boşluk**: " " → "/"

## Proje Yapısı

```
morse-code-converter/
├── app/                    # Next.js uygulama dizini
│   ├── globals.css        # Global stiller
│   ├── layout.tsx         # Ana layout
│   └── page.tsx          # Ana sayfa bileşeni
├── components/            # Yeniden kullanılabilir bileşenler
│   ├── ui/               # Arayüz bileşenleri (shadcn/ui)
│   └── theme-provider.tsx # Tema sağlayıcısı
├── hooks/                # Özel hook'lar
├── lib/                  # Yardımcı fonksiyonlar
├── public/              # Statik dosyalar
└── styles/              # Ek stiller
```

## Özelleştirme

### Ses Ayarları

`page.tsx` dosyasında ses parametrelerini özelleştirebilirsiniz:

```typescript
// Frekans (Hz)
oscillator.frequency.setValueAtTime(600, audioContext.currentTime)

// Nokta süresi (saniye)
await createTone(900, 0.1, audioContextRef.current)

// Tire süresi (saniye) 
await createTone(900, 0.3, audioContextRef.current)
```

### Tema Özelleştirme

`tailwind.config.ts` dosyasında renkleri özelleştirebilirsiniz:

```typescript
theme: {
  extend: {
    colors: {
      // Özel renk şeması
    }
  }
}
```

## Katkıda Bulunma

Katkılarınızı memnuniyetle karşılıyoruz!

1. Projeyi fork edin
2. Özellik branch'i oluşturun
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Değişikliklerinizi commit edin
   ```bash
   git commit -m 'feat: Harika özellik eklendi'
   ```
4. Branch'inizi push edin
   ```bash
   git push origin feature/amazing-feature
   ```
5. Pull Request açın

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## Teşekkürler

- Samuel Morse - Mors kodunu icat ettiği için
- [shadcn/ui](https://ui.shadcn.com) - Arayüz bileşen kütüphanesi
- [Lucide](https://lucide.dev) - Güzel ikonlar
- [Vercel](https://vercel.com) - Deployment platformu

## İletişim

Proje Linki: [https://github.com/umutcandev/morse-code-converter](https://github.com/umutcandev/morse-code-converter)

---

Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!