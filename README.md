# RadioSalafDirectory

RadioSalafDirectory adalah proyek PWA monolitik untuk mengumpulkan dan menampilkan daftar radio dakwah sunnah/Salaf dalam satu tempat. Pengguna bisa melihat radio yang sudah disetujui publik, memutar stream langsung, dan mengusulkan radio baru. Admin memiliki panel sederhana untuk mengelola stasiun, status izin, dan submission dari publik.

## Tujuan Proyek
- Menyediakan satu direktori radio dakwah sunnah yang mudah diakses.
- Menghormati hak stasiun radio dengan alur izin yang jelas.
- Menyediakan pengalaman mobile-friendly melalui PWA.

## Fitur MVP
- Daftar radio publik dengan pencarian dan filter sederhana.
- Pemutar audio langsung ke URL stream asli radio.
- Form usulan radio baru untuk publik.
- Panel admin untuk login, CRUD stasiun, moderasi submission, dan pencatatan izin.
- Dukungan PWA untuk instalasi di perangkat mobile.

## Arsitektur
- SvelteKit sebagai framework utama.
- TypeScript untuk logika aplikasi.
- Prisma dengan database SQLite untuk tahap awal.
- PWA dengan manifest dan service worker.
- Audio streaming dilakukan langsung dari URL stream radio, bukan lewat proxy server aplikasi.

## Dokumen Rencana
- [task.md](task.md) berisi rencana teknis implementasi yang rinci.
- [./.agents/prd.md](.agents/prd.md) berisi PRD proyek.
- [./.agents/design.md](.agents/design.md) berisi desain arsitektur dan keputusan teknis.

## Status Saat Ini
Proyek sedang berada pada tahap perencanaan dan persiapan implementasi awal. Struktur rencana sudah disusun agar pengerjaan berikutnya bisa dilakukan secara bertahap dan terukur.

## Roadmap Awal
1. Siapkan fondasi proyek SvelteKit + Prisma.
2. Implementasikan model data dan autentikasi admin.
3. Bangun halaman publik dan form usulan.
4. Bangun dashboard admin dan alur moderasi.
5. Aktifkan dukungan PWA dan deploy ke platform gratis.
