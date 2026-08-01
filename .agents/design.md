# Design Doc — Radio Sunnah Directory (PWA)

## 1. Arsitektur Umum

**Monolith SvelteKit** — satu codebase, satu deployment, tidak ada service terpisah.

```
SvelteKit app (SSR + API routes internal)
        |
        |-- Prisma ORM
        |
        v
   Database (SQLite/libSQL/Postgres — lihat bagian 5)
```

- Halaman publik + halaman admin ada di app yang sama, dibedakan lewat route (`/admin`) dan session check, bukan aplikasi/deployment terpisah.
- Tidak ada backend API eksternal. `+page.server.ts` / `+server.ts` di SvelteKit cukup untuk semua kebutuhan data (CRUD stasiun, submission, auth).
- Audio streaming **tidak lewat server kita** — `<audio src="{stream_url}">` langsung ke server radio (client-side direct connection). Server kita cuma nyimpan metadata/URL.

## 2. Autentikasi Admin (sederhana, 1 akun)

- Tidak perlu library auth berat (Auth.js opsional tapi overkill untuk 1 user). Cukup:
  - Tabel `Admin` (1 baris saja) dengan `email` + `password_hash` (bcrypt/argon2).
  - Session pakai cookie httpOnly + token random disimpan di tabel `Session` (atau JWT signed sederhana kalau mau stateless).
  - Middleware `hooks.server.ts` cek session untuk semua route `/admin/**`.
- Login form biasa di `/admin/login` — bukan app/dashboard terpisah, cuma route di app yang sama sesuai request kamu ("login as admin juga jadi satu aja").

## 3. Struktur Route

```
/                         → daftar radio publik (approved_public), search & filter
/radio/[slug]             → detail radio (opsional, bisa play langsung dari list juga)
/usulkan                  → form submission publik
/admin/login              → login admin
/admin                    → dashboard: list semua stasiun + status
/admin/stations/new       → tambah stasiun manual
/admin/stations/[id]/edit → edit stasiun + ubah status + log izin
/admin/submissions        → moderasi usulan dari publik
```

## 4. Data Model (Prisma schema)

```prisma
// schema.prisma

datasource db {
  provider = "sqlite" // ganti ke "postgresql" jika pakai opsi Postgres, lihat bag. 5
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Admin {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
}

model Session {
  id        String   @id @default(cuid())
  adminId   String
  admin     Admin    @relation(fields: [adminId], references: [id])
  expiresAt DateTime
  createdAt DateTime @default(now())
}

model Station {
  id                String   @id @default(cuid())
  name              String
  city              String?
  frequencyLabel    String?  // contoh: "93.6 FM" — hanya label, bukan fungsional
  websiteUrl        String?
  streamUrl         String?
  tags              String?  // comma-separated: "kajian,murottal"
  status            StationStatus @default(PENDING_REVIEW)
  visibility        Visibility    @default(PRIVATE)
  permissionContactAt   DateTime?
  permissionResponseAt  DateTime?
  permissionNote        String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

enum StationStatus {
  PENDING_REVIEW      // baru masuk, belum dicek admin
  PENDING_PERMISSION  // sudah dicek, sudah/lagi minta izin ke radio
  APPROVED_PUBLIC      // izin didapat, tampil publik
  APPROVED_PRIVATE     // belum ada izin, cuma admin yang bisa akses
  REJECTED
}

enum Visibility {
  PUBLIC
  PRIVATE
}

model Submission {
  id          String   @id @default(cuid())
  name        String
  city        String?
  frequencyLabel String?
  websiteUrl  String?
  streamUrlGuess String?
  note        String?
  status      SubmissionStatus @default(PENDING)
  createdAt   DateTime @default(now())
}

enum SubmissionStatus {
  PENDING
  APPROVED   // sudah dipindah jadi Station
  REJECTED
}
```

Catatan: `frequencyLabel` murni untuk tampilan (biar user familiar), tidak dipakai logic apapun.

## 5. Database & Deployment Gratis

Karena mau simple + gratis, ini 3 opsi realistis, urutan dari yang paling saya sarankan:

### Opsi A (disarankan): Vercel + Turso (libSQL)
- **Turso** adalah SQLite yang jalan di edge, punya free tier cukup besar (500 DB, jutaan row baca/tulis gratis), cocok banget untuk project kecil-menengah begini.
- Prisma sudah support Turso lewat driver adapter (`@prisma/adapter-libsql`).
- Deploy app SvelteKit ke **Vercel** (free tier, auto-deploy dari GitHub, support SvelteKit native).
- Kelebihan: keduanya serverless-friendly, tidak perlu maintain server, auto-scale, gratis untuk traffic kecil-menengah.

### Opsi B: Fly.io (app + volume SQLite biasa)
- Fly.io kasih free allowance kecil (cukup untuk 1 app kecil + volume persisten).
- SQLite file biasa (bukan Turso), disimpan di volume — cocok kalau kamu maunya paling simple tanpa provider DB terpisah (1 file `.db` saja).
- Kekurangan: perlu sedikit setup Dockerfile/fly.toml, dan app harus "always-on" (bukan serverless) supaya volume konsisten.

### Opsi C: Neon (Postgres) + Vercel
- Kalau ke depannya data makin kompleks/besar dan mau full SQL relational yang lebih "standard", **Neon** kasih Postgres gratis (serverless, auto-sleep saat idle).
- Prisma native support Postgres tanpa adapter tambahan (lebih simple dari sisi Prisma dibanding Turso).
- Cocok kalau kamu nggak masalah sedikit lebih "berat" dari SQLite demi tooling yang lebih matang.

**Rekomendasi saya untuk kasus kamu**: **Opsi A (Vercel + Turso)** — paling pas dengan prinsip "simplicity + gratis + mudah manage", dan skalanya jauh lebih dari cukup untuk directory radio dakwah.

## 6. PWA Setup

- Pakai `@vite-pwa/sveltekit` — tinggal install, config `vite.config.ts`, otomatis generate manifest + service worker.
- Service worker cache **app shell** (HTML/CSS/JS) supaya bisa dibuka offline, **bukan** cache audio stream (streaming tetap perlu koneksi internet real-time).
- Manifest: nama app, icon, `display: standalone`, tema warna sesuai branding sederhana.

## 7. Alur Data Singkat

**Publik submit radio baru:**
`/usulkan` → insert ke `Submission` (status `PENDING`) → admin review di `/admin/submissions` → kalau approve, admin isi/lengkapi data lalu buat `Station` baru dengan status `PENDING_PERMISSION` → admin hubungi radio → update `permissionContactAt`/`permissionResponseAt`/`permissionNote` → ubah status jadi `APPROVED_PUBLIC` atau `APPROVED_PRIVATE`/`REJECTED`.

**Publik dengar radio:**
`/` → fetch stations `WHERE status = APPROVED_PUBLIC` → klik → `<audio src={streamUrl}>` langsung connect ke server radio.

## 8. Kenapa Desain Ini Sesuai Prinsip "Simplicity"
- 1 codebase, 1 deploy target, tidak ada service terpisah.
- 1 akun admin, tanpa sistem role/permission kompleks.
- Tidak ada proxy audio, tidak ada storage file besar — DB cuma nyimpan metadata teks, ringan dan murah.
- Semua CRUD pakai SvelteKit form actions / server routes bawaan, tanpa perlu framework state management tambahan di client.
