# Task Plan — Radio Sunnah Directory

## 1. Tujuan Dokumen
Dokumen ini merinci rencana teknis implementasi aplikasi Radio Sunnah Directory sebagai PWA monolith berbasis SvelteKit. Fokus utama adalah menyusun fondasi yang cukup matang untuk MVP: daftar radio publik, form usulan, admin panel sederhana, manajemen status izin, dan dukungan PWA.

## 2. Ringkasan Arsitektur
- Framework: SvelteKit
- Bahasa: TypeScript
- ORM: Prisma
- Database: SQLite untuk fase awal, dengan opsi migrasi ke Turso/LibSQL atau Postgres di masa depan
- Styling: CSS/Sass atau utility-first sesuai keputusan UI yang akan dibuat nanti
- PWA: Vite PWA plugin
- Deployment target: Vercel untuk fase awal, dengan opsi Fly.io jika perlu SQLite file persisten

## 3. Prinsip Implementasi
- Gunakan satu codebase untuk seluruh fitur publik dan admin.
- Hindari service terpisah untuk audio streaming.
- Simpan metadata radio dan usulan di database, bukan file audio.
- Pastikan alur izin radio jelas dan dapat diaudit.
- Fokus pada MVP yang sederhana namun siap dikembangkan.

## 4. Scope MVP
### Fitur Publik
- Halaman daftar radio publik
- Pencarian dan filter berdasarkan nama, kota, dan tag
- Player audio langsung ke URL stream radio
- Form usulan radio baru
- Instalasi sebagai PWA

### Fitur Admin
- Login admin sederhana
- Dashboard list semua stasiun beserta status
- Tambah/edit/hapus stasiun manual
- Ubah status stasiun dan catatan izin
- Moderasi submission publik
- Akses stasiun private untuk admin

## 5. Struktur Proyek yang Disarankan
```text
src/
  lib/
    components/
    server/
      auth/
      db/
      services/
    types/
    utils/
  routes/
    +layout.svelte
    +page.server.ts
    +page.svelte
    /admin/
      login/
      +layout.server.ts
      stations/
      submissions/
    /radio/
      [slug]/
    /usulkan/
  app.html
static/
  icons/
  manifest.webmanifest
prisma/
  schema.prisma
  migrations/
.env
vite.config.ts
```

## 6. Tahapan Implementasi

### Tahap 1 — Fondasi Proyek
Tujuan: menyiapkan lingkungan kerja yang aman dan konsisten.

Tugas:
- Inisialisasi proyek SvelteKit + TypeScript.
- Pasang dependency utama: `sveltekit`, `prisma`, `@prisma/client`, plugin PWA, `bcrypt` atau `argon2`, dan util untuk session cookie.
- Konfigurasi environment variable untuk database.
- Siapkan file Prisma schema awal.
- Buat script setup untuk generate Prisma client dan migrate database.

Deliverable:
- Proyek bisa dijalankan lokal.
- Database schema terdefinisi dan bisa diapply.

Acceptance criteria:
- `npm install` atau `pnpm install` berhasil.
- `prisma migrate dev` berhasil.
- Aplikasi dapat diakses di localhost.

### Tahap 2 — Model Data dan Database
Tujuan: memastikan data inti tersedia untuk publik dan admin.

Tugas:
- Implementasikan model `Admin`, `Session`, `Station`, `Submission` sesuai desain.
- Buat enum untuk status stasiun dan status submission.
- Tambahkan indeks yang sesuai untuk pencarian data.
- Siapkan seed data awal untuk admin dan beberapa radio sample.

Deliverable:
- Basis data terisi dengan data sample untuk pengembangan.

Acceptance criteria:
- CRUD sederhana terhadap stasiun berhasil.
- Submission dapat disimpan dan diambil dari database.

### Tahap 3 — Autentikasi Admin
Tujuan: memberi akses aman ke area admin.

Tugas:
- Buat form login di `/admin/login`.
- Implementasikan hash password dengan bcrypt/argon2.
- Simpan session token di cookie httpOnly dan tabel `Session`.
- Buat middleware atau hook server untuk memproteksi route `/admin/**`.
- Siapkan logout sederhana.

Deliverable:
- Admin dapat login dan logout.

Acceptance criteria:
- Akses route admin tanpa session akan diarahkan ke halaman login.
- Session valid dapat digunakan untuk mengakses dashboard.

### Tahap 4 — Halaman Publik
Tujuan: menampilkan daftar radio yang layak publik.

Tugas:
- Buat halaman utama yang menampilkan stasiun dengan status `APPROVED_PUBLIC`.
- Tambahkan search dan filter sederhana.
- Buat card/list item per stasiun yang memuat nama, kota, tag, dan link ke detail atau player.
- Implementasikan mini player yang dapat diputar dari daftar.
- Pastikan player memanggil URL stream langsung dari data radio.

Deliverable:
- Pengunjung dapat melihat dan memutar radio publik.

Acceptance criteria:
- Daftar radio tampil berdasarkan status publik.
- Filter pencarian mengurangi hasil sesuai kata kunci.
- Stream URL dipakai langsung oleh elemen audio.

### Tahap 5 — Submission Publik
Tujuan: memungkinkan publik mengusulkan radio yang belum ada.

Tugas:
- Buat halaman `/usulkan` dengan form sederhana.
- Validasi input dasar: nama wajib, URL jika ada, stream URL opsional.
- Simpan data ke model `Submission` dengan status `PENDING`.
- Tampilkan pesan sukses setelah submit.

Deliverable:
- Form usulan berhasil dikirim dan tersimpan.

Acceptance criteria:
- Submission baru muncul di database.
- User menerima feedback yang jelas setelah submit.

### Tahap 6 — Admin Dashboard dan Moderasi
Tujuan: memberi admin kontrol penuh atas data.

Tugas:
- Buat dashboard admin untuk melihat semua stasiun.
- Tambahkan halaman untuk tambah/edit stasiun manual.
- Buat halaman daftar submission dan aksi approve/reject.
- Saat approve submission, buat entri stasiun baru dengan status `PENDING_PERMISSION`.
- Tambahkan form edit untuk mengubah status, catatan izin, dan tanggal kontak/respons.

Deliverable:
- Admin dapat mengelola stasiun dan submission secara lengkap.

Acceptance criteria:
- Admin dapat menambah, mengedit, dan menghapus stasiun.
- Admin dapat mengubah status stasiun sesuai alur izin.
- Submission yang disetujui menjadi entri stasiun baru.

### Tahap 7 — PWA dan UX Lanjutan
Tujuan: membuat aplikasi terasa seperti aplikasi native di perangkat.

Tugas:
- Konfigurasi manifest dan service worker.
- Tambahkan icon, splash, theme color, dan mode standalone.
- Pastikan shell aplikasi bisa dibuka offline dengan cache yang tepat.
- Tidak cache audio stream karena streaming harus tetap real-time.

Deliverable:
- Aplikasi dapat diinstall dan dibuka sebagai PWA.

Acceptance criteria:
- Manifest tersedia.
- Aplikasi dapat diinstall di perangkat.
- Shell app bisa dimuat offline.

### Tahap 8 — QA, Deployment, dan Hardening
Tujuan: memastikan aplikasi siap dipakai.

Tugas:
- Uji alur end-to-end dari submit publik hingga moderation admin.
- Verifikasi tampilan di mobile dan desktop.
- Siapkan deployment ke Vercel atau platform target.
- Atur environment variable produksi.
- Lakukan checklist legal dan kebijakan tampil publik (izin radio).

Deliverable:
- Aplikasi siap di-deploy.

Acceptance criteria:
- Semua alur utama berjalan di lingkungan staging/produksi.
- Admin dapat mengelola data tanpa error.

## 7. Detail Implementasi Teknis

### 7.1 Auth dan Session
- Gunakan `bcrypt` atau `argon2` untuk hash password.
- Simpan session token acak di tabel `Session` dengan expiry.
- Gunakan cookie `httpOnly` dan `secure` di production.
- Tutup akses admin melalui hook server atau middleware.

### 7.2 Database Access Layer
- Simpan query logic di folder server service agar route tetap bersih.
- Pisahkan fungsi CRUD dari halaman view.
- Hindari query langsung dari route agar mudah diuji dan di-refactor.

### 7.3 Audio Playback
- Gunakan elemen `<audio>` bawaan browser.
- Jangan mengirim stream melalui backend aplikasi.
- Pastikan URL stream yang disimpan valid dan aman.

### 7.4 Search dan Filter
- Untuk MVP, filter dapat dilakukan di sisi server dengan query sederhana.
- Jika data bertambah besar, pertimbangkan index kolom pencarian dan paging sederhana.

### 7.5 PWA
- Pakai plugin PWA untuk SvelteKit.
- Cache shell app saja, bukan stream audio.
- Siapkan fallback offline yang informatif.

## 8. Risiko dan Mitigasi
- Risiko: stream URL tidak valid atau mati.
  - Mitigasi: admin bisa mengedit URL dan status stasiun, serta menandai radio tidak aktif.
- Risiko: izin radio belum didapat.
  - Mitigasi: gunakan status `PENDING_PERMISSION`, `APPROVED_PRIVATE`, dan `REJECTED` secara eksplisit.
- Risiko: data bertambah dan pencarian menjadi lambat.
  - Mitigasi: gunakan query sederhana dulu, lalu optimasi bila perlu.
- Risiko: auth sederhana terlalu rentan jika tidak dikelola benar.
  - Mitigasi: gunakan hash password, session expiry, dan cookie aman.

## 9. Definition of Done untuk MVP
- Pengunjung bisa melihat daftar radio publik.
- Pengunjung bisa mengusulkan radio baru.
- Admin bisa login dan mengelola stasiun.
- Admin bisa menilai submission dan mengubah status izin.
- Aplikasi berjalan sebagai PWA di perangkat mobile.
- Aplikasi siap dideploy ke platform gratis yang sesuai.
