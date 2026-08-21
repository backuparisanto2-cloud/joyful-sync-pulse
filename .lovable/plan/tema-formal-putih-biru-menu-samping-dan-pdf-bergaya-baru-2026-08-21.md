# Tema Formal Putih–Biru, Menu Samping, dan PDF Bergaya Baru

## Tujuan
Tampilan aplikasi diubah menjadi dokumen pelaporan resmi: dominan putih, garis dan aksen biru lembut, tipografi formal, ukuran teks bisa diatur, serta navigasi HP memakai menu samping. Ekspor PDF laporan mengikuti gaya baru ini.

## 1. Tema formal putih dominan, garis biru lembut
- Ganti palet emas/ivory saat ini menjadi: latar putih bersih, kartu putih, garis dan pembatas biru lembut, aksen utama biru tenang (bukan biru mencolok).
- Token lama `gold`, `gold-soft`, `gold-line`, `ivory` diganti nilainya ke keluarga biru dan tetap dipakai lewat nama semantik baru, sehingga seluruh halaman (Ringkasan, Kamar, Fasilitas, Laporan) langsung ikut berubah tanpa warna hardcode.
- Kartu jadi lebih "dokumen": sudut lebih tegas, garis tipis biru, bayangan sangat halus.
- Badge kondisi, tombol, dan chip filter disesuaikan agar kontras tetap baik.

## 2. Tipografi formal
- Judul memakai Libre Baskerville, isi memakai IBM Plex Sans (dimuat lewat tag link di root, bukan import di CSS).
- Skala judul/isi disetel ulang agar terbaca seperti laporan resmi (heading tenang, isi rapat namun jelas).

## 3. Pengatur ukuran teks (A- / A / A+)
- Tiga tingkat ukuran: Normal, Besar, Sangat besar, mengatur ukuran dasar seluruh aplikasi.
- Pilihan tersimpan di perangkat sehingga tetap berlaku saat aplikasi dibuka lagi.
- Kontrol diletakkan di dalam menu samping (dan tetap terjangkau di layar besar).

## 4. Menu samping untuk HP
- Tombol menu (hamburger) di kanan atas header pada layar kecil, membuka drawer dari samping berisi: Ringkasan, Kamar, Fasilitas Utama, Laporan, plus pengatur ukuran teks.
- Menu bar bawah dihapus; ruang bawah halaman disesuaikan agar tidak ada celah kosong.
- Drawer menutup otomatis setelah memilih halaman; menu horizontal di layar besar tetap seperti sekarang.

## 5. Ekspor PDF laporan
- Ekspor PDF per periode sudah berfungsi di halaman Laporan (rentang tanggal atau per bulan, lingkup kamar/fasilitas/lantai, kolom yang dapat dipilih). Yang dikerjakan: gaya PDF dirapikan mengikuti tema baru.
- Kop laporan: nama kost, judul laporan, periode, lingkup, masa manfaat, ringkasan angka, dengan garis pemisah biru.
- Tabel: kepala tabel biru gelap dengan teks putih, baris selang-seling putih/biru sangat muda, angka rata kanan, nomor halaman di kaki halaman.
- Nama berkas tetap memuat periode agar mudah dikirim ke pihak terkait.

## Catatan teknis
- Warna diubah di `src/styles.css` (`:root`, `@theme inline`, utility `gold-card`/`gold-rule` dialihkan ke garis biru); tidak ada kelas warna hardcode baru di komponen.
- Font dimuat di `src/routes/__root.tsx` melalui `links`, dipetakan ke `--font-display` dan `--font-sans`.
- Ukuran teks memakai variabel skala di elemen root + penyimpanan lokal, dikelola satu penyedia kecil yang dipakai `AppShell`.
- Menu samping memakai komponen `sheet` yang sudah tersedia di project.
- Gaya PDF diubah di `src/lib/report-export.ts` (warna kop, `headStyles`, `alternateRowStyles`), tanpa mengubah logika filter periode.
- Setelah perubahan: cek build/typecheck dan verifikasi tampilan di lebar HP serta unduhan PDF.
