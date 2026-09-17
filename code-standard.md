# Code & Engineering Standards

Dokumen standar rekayasa perangkat lunak, workflow agen AI, serta konvensi kode untuk repositori ini.

---

## 1. Runtime & Package Management (`bun` & `bunx`)

Semua eksekusi script, package management, dan toolchain wajib dijalankan menggunakan **`bun`** atau **`bunx`**. Jangan gunakan `npm`, `npx`, `yarn`, atau `pnpm`.

```bash
# Development & Build
bun dev                  # Jalankan development server (Vite)
bun run build            # Build project untuk production
bun preview              # Preview hasil build production

# Linting & Quality
bun lint                 # Jalankan ESLint via package script
bunx eslint .            # Menjalankan ESLint langsung via bunx

# Package Management
bun add <package>        # Tambah dependency
bun add -d <package>     # Tambah devDependency
bun remove <package>     # Hapus dependency
bun install              # Install all dependencies sesuai bun.lock
```

---

## 2. Agent Workflow & Router (`ask-matt` & `grill-me`)

Alur kerja agen mengadopsi prinsip sistem Matt Pocock:

### 2.1 Skill Routing (`ask-matt`)
- **Main Flow (Ide → Ship):**
  1. **Interview & Refinement:** Gunakan `grill-me` (atau `grill-with-docs`) untuk mematangkan ide dan mengunci keputusan desain.
  2. **Prototype Detour:** Jika ada ketidakpastian UI/state, buat throwaway prototype terlebih dahulu sebelum implementasi penuh.
  3. **Spec & Ticket:** Pecah pekerjaan menjadi unit kecil terisolasi.
  4. **Implementasi:** Kerjakan secara terarah (TDD / red-green slices).
  5. **Review:** Evaluasi diff terhadap standar kode dan spesifikasi sebelum merge/commit.
- **Context Hygiene:** Jaga window konteks dalam *smart zone* (~150k token). Lakukan `/compact` atau handoff pada batas fase (*phase boundary*), jangan menumpuk konteks lama saat masuk tiket baru.

### 2.2 Grilling Discipline (`grill-me` / `grilling`)
- **Dilarang berasumsi:** Jangan menebak kebutuhan arsitektur atau keputusan produk yang ambigu.
- **Frontier & Rounds:** Ajukan pertanyaan yang berada di batas keputusan aktif (*frontier*) dalam satu putaran bernomor (Q1, Q2, dst.) lengkap dengan rekomendasi solusi.
- **Fakta vs Keputusan:**
  - Mencari fakta (isi file, struktur direktori, error log) adalah tugas agen—jangan tanyakan hal yang bisa dicek sendiri di codebase.
  - Mengambil keputusan bisnis/desain adalah hak user.

---

## 3. Bug Diagnosis Loop (`diagnosing-bugs`)

Jangan pernah menebak-nebak (*vibe debugging*) atau langsung mengubah kode tanpa diagnosis terstruktur.

1. **Phase 1: Build a Tight Feedback Loop (Wajib)**
   - Buat satu perintah otomatis yang bisa dijalankan dan mampu menghasilkan status **RED** (gagal) pada bug spesifik tersebut:
     - Test unit/integrasi gagal (`bun test`),
     - Script HTTP / cURL terhadap dev server,
     - CLI assertion script atau headless browser.
   - Loop harus cepat (dalam hitungan detik), deterministik, dan dapat dijalankan otomatis.
2. **Phase 2: Reproduce & Minimise**
   - Pastikan symptom yang muncul persis seperti laporan user.
   - Pangkas variabel luar hingga skenario terkecil (*minimal reproducible case*) yang tetap gagal.
3. **Phase 3: Hypothesise**
   - Buat 3–5 hipotesis berperingkat yang bersifat *falsifiable* (dapat diuji kebenarannya):
     > *"Jika X penyebabnya, maka mengubah Y akan menghilangkan bug / mengubah Z akan memperparahnya."*
4. **Phase 4 & 5: Instrument, Fix, and Verify**
   - Tambahkan log/inspeksi minimal untuk membuktikan hipotesis.
   - Perbaiki akar masalah dan buktikan loop feedback berubah menjadi **GREEN**.
   - Jadikan feedback loop tersebut sebagai *regression test*.

---

## 4. JavaScript, JSX, & React Standards

### 4.1 JavaScript (Modern ESNext)
- **Immutability:** Utamakan `const`, hindari `let` jika tidak perlu reassign, dan jangan pernah gunakan `var`.
- **Pure Functions & Modularity:** Fungsi harus deterministik dan memiliki *single responsibility*.
- **Guard Clauses:** Gunakan early return untuk validasi awal guna menghindari *nested if-else* yang dalam.
- **Async/Await:** Gunakan `async/await` dengan blok `try/catch` eksplisit di batas I/O atau fetching.
- **Safe Access:** Manfaatkan optional chaining (`?.`) dan nullish coalescing (`??`), hindari type coercion implisit (`==`).

```javascript
// Good: Guard clause, immutability, destructuring
export function calculateDiscountedPrice({ price, discountPercentage = 0 }) {
  if (price <= 0) return 0;
  const discountMultiplier = Math.max(0, 1 - discountPercentage / 100);
  return Math.round(price * discountMultiplier);
}
```

### 4.2 React 19 & JSX Standards
- **Functional Components:** Komponen ditulis sebagai fungsi standar dengan nama PascalCase.
- **Explicit Props:** Destructure props di parameter fungsi dengan default value yang jelas.
- **State Management:**
  - Simpan state minimal. Jangan duplikasi state yang dapat dihitung (*derived state*).
  - Untuk state kompleks atau terkait, gunakan `useReducer`.
- **Hooks Hygiene:**
  - Patuhi aturan hooks: hanya panggil di level teratas komponen.
  - Masukkan semua dependensi yang digunakan ke dependency array `useEffect` / `useCallback` / `useMemo`.
  - Hindari `useEffect` untuk sinkronisasi data yang sebenarnya bisa dihitung langsung saat render.
- **Stable Keys:** Saat melakukan mapping array di JSX, gunakan unique identifier stabil (`item.id`). Jangan gunakan index array jika urutan elemen dapat berubah.
- **Event Naming:** Gunakan konvensi `handle<Event>` untuk fungsi handler internal (contoh: `handleClick`, `handleSubmit`) dan `on<Event>` untuk props.
- **Clean JSX:** Pisahkan logic kompleks dari JSX. Ekstrak cabang ternary bersarang ke variabel atau sub-komponen terpisah.

```jsx
// Good: Component pattern
export function UserCard({ user, onSelect }) {
  const isEligible = user.status === 'active' && user.age >= 18;

  const handleClick = () => {
    if (isEligible) onSelect(user.id);
  };

  return (
    <div className="rounded-lg border p-4">
      <h3 className="text-base font-semibold">{user.name}</h3>
      <p className="text-sm text-neutral-600">{user.email}</p>
      {isEligible && (
        <button
          type="button"
          onClick={handleClick}
          className="mt-2 min-h-11 px-4 py-2 text-sm"
        >
          Pilih User
        </button>
      )}
    </div>
  );
}
```

---

## 5. Code Comment Hygiene (`antislop-code`)

Komentar hanya ditulis untuk menjelaskan **alasan (WHY)**, bukan menceritakan apa yang sudah jelas terbaca dari kode (**WHAT**).

### 5.1 Komentar yang DILARANG (AI-Slop):
- ❌ **Decorative Separators:** `// =====================` atau `/* ---- ROUTES ---- */`
- ❌ **Restating the Obvious:**
  ```javascript
  // Bad
  let total = 0; // Inisialisasi total dengan 0
  function getUser() // Fungsi untuk mengambil user
  ```
- ❌ **Workflow Narration:** `// Step 1: Ambil data`, `// Step 2: Validasi input`
- ❌ **Empty Labels:** `// Core logic`, `// Helper function`, `// Important`
- ❌ **Decorative Emoji:** `// 🚀 Performance boost`, `// ✅ Validasi berhasil`
- ❌ **Vague Placeholders:** `// TODO: nanti diperbaiki`, `// TODO: optimasi lagi`
- ❌ **Signature Echoes:** JSDoc `@param id ID user` dan `@returns User` tanpa konteks tambahan.
- ❌ **End Markers:** `} // end if` atau `// end of class`

### 5.2 Komentar yang DIWAJIBKAN:
- ✅ Penjelasan aturan bisnis non-intuitif atau *domain constraints*.
- ✅ Alasan pemilihan arsitektur atau *trade-off* performa/keamanan.
- ✅ *Workarounds* untuk bug browser, OS, atau dependensi eksternal (sertakan konteks singkat).
- Jaga komentar tetap ringkas (1–2 baris), bernada natural, dan langsung ke inti persoalan.

---

## 6. Mobile & Responsive Layout (`antislop-layoutmobile`)

Layout mobile adalah **desain tersendiri yang dipikirkan matang**, bukan layout desktop yang diperkecil paksa.

### 6.1 Layout & Breakpoint
- **Content-Driven Breakpoints:** Tentukan breakpoint saat konten mulai tidak nyaman dibaca, bukan sekadar mengikuti daftar ukuran tipe HP tertentu.
- **Hindari 2-State Binary:** Jangan hanya membuat mode HP rapat vs Grid desktop raksasa. Tablet (600px–1024px) harus memiliki transisi yang wajar (misal: 1 kolom → 2 kolom → 3/4 kolom).
- **Reflow Kolom:** Saat layar menyempit, kolom multi-grid harus re-stack ke bawah (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`). Dilarang membiarkan kolom menyempit hingga teks terjepit.

### 6.2 Dimensi, Typografi, & Spacing
- **Fluid Typography:** Gunakan skala fluida atau utilitas Tailwind yang responsif (`text-lg md:text-2xl`), hindari ukuran font `px` statis yang terlalu besar di HP.
- **Dynamic Viewport Height:** Hindari `h-screen` atau `100vh` statis untuk elemen full-height karena bilah URL mobile browser memotong konten. Gunakan `min-h-dvh` atau tinggi `auto`.
- **Proportional Spacing:** Kurangi section padding di mobile (contoh: `py-8 md:py-20`). Jangan gunakan margin/padding desktop (96px+) pada layar kecil.

### 6.3 Overflow & Touch Targets
- **Zero Horizontal Scroll:** Seluruh halaman harus memiliki scroll horizontal 0px di layar sempit. Gunakan `max-w-full`, gambar responsif (`w-full h-auto`), dan batasi tabel/codeblock dalam container scroll horizontal lokal.
- **Touch Target Accessibility:** Setiap elemen interaktif (tombol, link, input) harus memiliki area sentuh minimal **44×44px** atau **48×48px** agar mudah ditekan di layar sentuh.
