# PRD — Radio Sunnah Directory (PWA)

## 1. Latar Belakang & Masalah
Radio dakwah sunnah/salaf yang streaming online tersebar di berbagai website masing-masing, tidak ada satu tempat terpusat untuk mendengarkan semuanya. Tujuan awal: konsumsi pribadi, tapi dibuka juga untuk publik karena manfaatnya bisa lebih luas.

## 2. Tujuan
- Punya satu web app (PWA) untuk streaming radio dakwah sunnah dari berbagai stasiun, tanpa perlu buka banyak tab/website.
- Bisa dipakai orang lain (publik), dengan kontrol penuh di tangan admin (pemilik app) untuk apa yang tayang publik.
- Menghormati hak stasiun radio: hanya radio yang sudah beri izin yang tampil publik; yang belum, tetap privat (hanya admin).

## 3. Target Pengguna
- **Primer**: pemilik app sendiri (personal use).
- **Sekunder**: publik umum yang cari radio dakwah sunnah, tanpa perlu akun.

## 4. Prinsip Desain
- **Simplicity first** — monolith, satu app, tidak ada microservice, tidak ada sistem role kompleks. Admin = 1 akun saja (owner), login inline di app yang sama (tidak ada aplikasi admin terpisah).
- **Directory/pointer only** — app tidak pernah menyimpan atau proxy file audio. Semua `<audio>` memanggil URL stream asli milik radio.
- **Legal-friendly by default** — status izin eksplisit per stasiun, mekanisme takedown mudah.

## 5. Fitur (MVP)

### 5.1 Publik (tanpa login)
- Lihat daftar radio yang berstatus `approved_public`.
- Filter/cari berdasarkan nama, kota, atau tag (mis. "kajian", "murottal").
- Putar stream langsung dari list (player persisten di bawah layar / mini player).
- Install sebagai PWA (Add to Home Screen), bisa jalan offline untuk *shell* app (bukan untuk streaming, karena streaming perlu internet).
- Form "Usulkan Radio" — submit nama, kota, frekuensi (label), URL website resmi radio, dan (opsional) URL stream kalau user tahu. Masuk sebagai `pending_review`, tidak langsung tayang.

### 5.2 Admin (login, 1 akun)
- Login sederhana (email + password, atau magic link) — cukup 1 akun owner, tidak perlu sistem multi-role.
- Lihat semua stasiun dengan semua status (`pending_review`, `pending_permission`, `approved_public`, `approved_private`, `rejected`).
- Tambah/edit/hapus stasiun manual.
- Ubah status stasiun (termasuk pindah dari private ke public setelah izin didapat).
- Catat log komunikasi izin (tanggal kontak, tanggal respons, catatan).
- Lihat & moderasi submission dari publik (approve → masuk pending_permission, reject → hapus/simpan alasan).
- Akses stasiun `approved_private` untuk didengarkan sendiri (tidak tampil ke publik).

### 5.3 Di luar cakupan MVP (non-goals)
- Tidak ada sistem akun untuk publik (tidak perlu register/login untuk dengar radio).
- Tidak ada rekaman/replay siaran (live streaming saja).
- Tidak ada notifikasi push jadwal kajian (bisa jadi fase 2).
- Tidak ada multi-admin/role-based access control di fase awal.

## 6. User Stories
1. Sebagai pengunjung, saya ingin melihat daftar radio dakwah sunnah dan langsung memutar salah satunya tanpa perlu daftar akun.
2. Sebagai pengunjung, saya ingin mengusulkan radio yang saya tahu tapi belum ada di daftar.
3. Sebagai admin, saya ingin login dan menambah/mengedit data radio termasuk mengatur status izin & visibilitasnya.
4. Sebagai admin, saya ingin tetap bisa mendengarkan radio yang belum dapat izin, tapi publik tidak melihatnya.
5. Sebagai admin, saya ingin mencatat kapan saya menghubungi tiap radio untuk minta izin, supaya tidak lupa follow up.

## 7. Metrik Sukses (informal, untuk personal project)
- Semua 11 radio awal berhasil dimasukkan dengan stream URL valid.
- Minimal proses "kirim izin → catat status" berjalan untuk semua radio awal.
- App bisa di-install sebagai PWA di HP dan diputar tanpa lag berarti.

## 8. Rencana Fase Selanjutnya (opsional, tidak dikerjakan sekarang)
- Jadwal kajian per radio.
- Tag/kategori lebih kaya (ustadz, kota, jenis konten).
- Multi-admin jika project berkembang.
