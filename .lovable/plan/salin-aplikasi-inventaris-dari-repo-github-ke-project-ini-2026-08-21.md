# Salin Aplikasi Inventaris dari Repo GitHub ke Project Ini

Repo `backuparisanto2-cloud/sync-sparkle-sync-72` bisa diakses publik dan sudah saya periksa. Isinya aplikasi inventaris kos/gedung (bahasa Indonesia) dengan stack yang sama dengan project ini, jadi kodenya bisa disalin langsung.

## Yang akan dibangun

Aplikasi inventaris dengan 4 halaman:
- **Beranda** (`/`) — ringkasan inventaris
- **Daftar Kamar** (`/kamar`) dan **Detail Kamar** (`/kamar/{nomor}`) — 32 kamar di 3 lantai, tiap kamar punya daftar barang
- **Fasilitas Bersama** (`/fasilitas`) — barang umum (pompa air, dapur, CCTV, dll)
- **Laporan** (`/laporan`) — laporan dengan grafik, kolom yang bisa diatur, dan ekspor

Fitur pendukung: form tambah/ubah barang, status kondisi (Baik / Perlu Perbaikan / Rusak), foto & nota barang dengan kompresi gambar, lightbox foto, data vendor, harga beli, tanggal beli, dan masa garansi.

## Langkah

1. **Aktifkan Lovable Cloud** di project ini (database + storage). Kredensial dari repo tidak dipakai — project ini mendapat backend sendiri yang bersih.
2. **Buat database**: tabel `rooms`, `room_items`, `shared_items`, `conditions` beserta index, trigger `updated_at`, grants, dan RLS akses publik (sama seperti repo asal).
3. **Isi data awal**: 32 kamar (001–032), 9 jenis barang standar per kamar, 13 fasilitas bersama, dan 3 status kondisi.
4. **Buat storage bucket** `inventory-photos` + policy baca/unggah/ubah/hapus publik untuk foto dan nota.
5. **Salin kode aplikasi** dari repo: semua route, komponen (AppShell, kartu barang, form, uploader foto, lightbox, pengelola kolom laporan), helper library (inventaris, laporan, ekspor, kompresi gambar), styling/design system, ikon aplikasi, dan manifest PWA.
6. **Verifikasi**: cek build bersih, lalu buka setiap halaman di preview untuk memastikan data kamar/fasilitas tampil dan form serta laporan berjalan.

## Catatan teknis

- Repo memakai stack identik (TanStack Start + Tailwind v4 + shadcn + Supabase), sehingga tidak perlu konversi framework.
- File `.env` dan `src/integrations/supabase/*` dari repo **tidak** disalin apa adanya; klien Supabase dan `types.ts` akan dibuat/di-generate ulang oleh Cloud project ini.
- Migrasi di repo mengandung satu file duplikat (skema awal dijalankan dua kali). Di project ini skema akan diterapkan satu kali saja dengan gabungan seluruh perubahan (kolom vendor/harga/tanggal/garansi/foto/nota sudah termasuk).
- Data akses publik tanpa login, sesuai perilaku repo asal. Jika nanti ingin dibatasi per pengguna, itu perubahan terpisah.
