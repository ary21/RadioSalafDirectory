# Radio Dakwah Sunnah Directory (PWA)

Aplikasi repositori/direktori streaming radio dakwah sunnah/salaf terpusat berbasis web. Dibangun sebagai aplikasi monolith PWA (Progressive Web App) menggunakan **SvelteKit**, **Prisma ORM**, **SQLite/Turso**, dan **Vite PWA**.

## Fitur Utama

### 📻 Halaman Publik (Tanpa Login)

- **Daftar Radio Publik**: Menampilkan stasiun radio yang telah mendapatkan persetujuan/izin publik (`APPROVED_PUBLIC`).
- **Pencarian & Filter**: Memudahkan pencarian radio berdasarkan nama, kota, maupun tag kategori.
- **Audio Player Persisten**: Mendengarkan siaran langsung radio langsung dari antarmuka web (stream audio ditarik langsung dari URL asal radio).
- **Usulkan Radio**: Formulir bagi pengunjung untuk mengusulkan stasiun radio baru yang belum terdaftar.
- **Dukungan PWA**: Aplikasi dapat diinstal ke layar beranda perangkat mobile/desktop dan memuat shell aplikasi secara offline.

### 🛡️ Dashboard Admin

- **Autentikasi Sederhana**: Login terproteksi menggunakan session cookie berbasis token aman di database.
- **Manajemen Stasiun**: Menambah, mengubah, atau menghapus data stasiun radio secara manual.
- **Alur Izin & Visibilitas**: Mengatur status izin radio (`PENDING_REVIEW`, `PENDING_PERMISSION`, `APPROVED_PUBLIC`, `APPROVED_PRIVATE`, `REJECTED`).
- **Moderasi Usulan**: Memproses (menolak atau menyetujui) usulan radio baru dari publik.

---

## Spesifikasi Teknologi

- **Framework**: SvelteKit
- **Bahasa**: TypeScript
- **ORM**: Prisma ORM
- **Database**: SQLite (Development) / Turso/libSQL (Production)
- **PWA**: `@vite-pwa/sveltekit`
- **Deployment**: Vercel

---

## Panduan Pengembangan Lokal

### 1. Prasyarat

Pastikan Anda memiliki **Node.js** terinstal di komputer Anda.

### 2. Instalasi Dependency

```sh
npm install
```

### 3. Konfigurasi Environment

Buat atau edit file `.env` di root direktori proyek:

```env
DATABASE_URL="file:./dev.db"
```

### 4. Setup Database & Migrasi

Jalankan perintah berikut untuk menginisialisasi database SQLite lokal dan membuat tabel yang diperlukan:

```sh
npx prisma migrate dev
```

### 5. Memasukkan Seed Data Awal

Masukkan stasiun radio awal serta akun admin default ke database dengan running:

```sh
npm run prisma:seed
```

_(Akun admin default dapat Anda lihat detailnya di dalam file [prisma/seed.js](../RadioSalafDirectory/prisma/seed.js))._

### 6. Menjalankan Server Development

```sh
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) pada browser Anda.

---

## Deploy ke Production (Vercel + Turso)

Aplikasi ini siap di-deploy secara gratis memanfaatkan integrasi **Vercel** dan **Turso**.

### 1. Buat Database Turso

- Buat database baru di Turso: `turso db create radio-salaf`
- Dapatkan token dan URL database: `turso db show radio-salaf` dan `turso db tokens create radio-salaf`
- Push schema ke database Turso:
  ```sh
  DATABASE_URL="libsql://nama-db-anda.turso.io?authToken=token-anda" npx prisma db push
  ```

### 2. Deploy di Vercel

- Hubungkan repository GitHub Anda ke Vercel Dashboard.
- Atur Environment Variables berikut pada proyek Vercel Anda:
  - `TURSO_DATABASE_URL` = `libsql://nama-db-anda.turso.io`
  - `TURSO_AUTH_TOKEN` = `token-anda`
  - `DATABASE_URL` = `libsql://nama-db-anda.turso.io?authToken=token-anda` (opsional untuk client query fallback)
- Deploy aplikasi Anda. Vercel secara otomatis mendeteksi konfigurasi `@sveltejs/adapter-vercel` di [svelte.config.js](../svelte.config.js).
