export default function MatrixOperations({
  isDark,
  sizeA,
  sizeB,
  scalarK,
  onScalarChange,
  onAdd,
  onSubtract,
  onMultiply,
  onDetA,
  onDetB,
  onTransposeA,
  onTransposeB,
  onInverseA,
  onInverseB,
  onScalarA,
  onScalarB,
  onSwap,
}) {
  const cardBg = isDark
    ? 'bg-neutral-900/75 border-neutral-800 text-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
    : 'bg-neutral-50/90 border-neutral-200 text-neutral-900 shadow-[0_4px_16px_rgba(0,0,0,0.06)]';

  const opBtnPrimary = isDark
    ? 'border-cyan-400/80 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 hover:shadow-[0_0_14px_rgba(34,211,238,0.3)] active:scale-95'
    : 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700 active:scale-95';

  const opBtnSecondary = isDark
    ? 'border-neutral-700 bg-neutral-800/80 text-neutral-200 hover:border-neutral-500 hover:text-white active:scale-95'
    : 'border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100 hover:text-black active:scale-95';

  const inputClass = isDark
    ? 'bg-black/70 border-neutral-700 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 focus:outline-none'
    : 'bg-white border-neutral-300 text-black focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30 focus:outline-none';

  const isSameSize = sizeA === sizeB;

  return (
    <div className={`flex flex-col gap-6 rounded-2xl border p-5 sm:p-6 backdrop-blur-md transition-colors duration-300 ${cardBg}`}>
      {/* Group 1: Operasi Dua Matriks (A dan B) */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-cyan-500 dark:text-cyan-400">
            Operasi Dua Matriks (A & B)
          </h4>
          <button
            type="button"
            onClick={onSwap}
            title="Tukar posisi Matriks A dan B"
            className={`flex min-h-11 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${opBtnSecondary}`}
          >
            <span>Tukar A ⇄ B</span>
          </button>
        </div>

        {!isSameSize && (
          <p className="mb-3 text-xs text-amber-500 dark:text-amber-400">
            Catatan: Ordo Matriks A ({sizeA}x{sizeA}) dan Matriks B ({sizeB}x{sizeB}) berbeda. Samakan ordo untuk operasi A + B, A - B, dan A × B.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={onAdd}
            disabled={!isSameSize}
            className={`flex min-h-11 items-center justify-center rounded-xl border text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed ${opBtnPrimary}`}
          >
            A + B (Tambah)
          </button>
          <button
            type="button"
            onClick={onSubtract}
            disabled={!isSameSize}
            className={`flex min-h-11 items-center justify-center rounded-xl border text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed ${opBtnPrimary}`}
          >
            A - B (Kurang)
          </button>
          <button
            type="button"
            onClick={onMultiply}
            disabled={!isSameSize}
            className={`flex min-h-11 items-center justify-center rounded-xl border text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed ${opBtnPrimary}`}
          >
            A × B (Kali)
          </button>
        </div>
      </div>

      {/* Group 2: Operasi Matriks Tunggal (A & B) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-neutral-700/30">
        {/* Operasi Matriks A */}
        <div className="space-y-3">
          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-400">
            Operasi Khusus Matriks A
          </h4>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={onDetA}
              className={`flex min-h-11 items-center justify-center rounded-xl border text-xs sm:text-sm font-semibold transition-all ${opBtnSecondary}`}
            >
              det(A)
            </button>
            <button
              type="button"
              onClick={onTransposeA}
              className={`flex min-h-11 items-center justify-center rounded-xl border text-xs sm:text-sm font-semibold transition-all ${opBtnSecondary}`}
            >
              Aᵀ (Transpose)
            </button>
            <button
              type="button"
              onClick={onInverseA}
              className={`flex min-h-11 items-center justify-center rounded-xl border text-xs sm:text-sm font-semibold transition-all ${opBtnSecondary}`}
            >
              A⁻¹ (Invers)
            </button>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onScalarA}
              className={`flex min-h-11 flex-1 items-center justify-center rounded-xl border text-xs sm:text-sm font-semibold transition-all ${opBtnSecondary}`}
            >
              Hitung k · A
            </button>
          </div>
        </div>

        {/* Operasi Matriks B */}
        <div className="space-y-3">
          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-400">
            Operasi Khusus Matriks B
          </h4>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={onDetB}
              className={`flex min-h-11 items-center justify-center rounded-xl border text-xs sm:text-sm font-semibold transition-all ${opBtnSecondary}`}
            >
              det(B)
            </button>
            <button
              type="button"
              onClick={onTransposeB}
              className={`flex min-h-11 items-center justify-center rounded-xl border text-xs sm:text-sm font-semibold transition-all ${opBtnSecondary}`}
            >
              Bᵀ (Transpose)
            </button>
            <button
              type="button"
              onClick={onInverseB}
              className={`flex min-h-11 items-center justify-center rounded-xl border text-xs sm:text-sm font-semibold transition-all ${opBtnSecondary}`}
            >
              B⁻¹ (Invers)
            </button>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onScalarB}
              className={`flex min-h-11 flex-1 items-center justify-center rounded-xl border text-xs sm:text-sm font-semibold transition-all ${opBtnSecondary}`}
            >
              Hitung k · B
            </button>
          </div>
        </div>
      </div>

      {/* Input Nilai Skalar k */}
      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-neutral-700/30">
        <label htmlFor="scalar-k-input" className="text-xs sm:text-sm font-medium">
          Konstanta Skalar (k):
        </label>
        <input
          id="scalar-k-input"
          type="number"
          step="any"
          value={scalarK}
          onChange={(e) => onScalarChange(e.target.value)}
          className={`h-11 w-28 rounded-lg border text-center font-mono text-sm font-semibold transition-all ${inputClass}`}
        />
        <span className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
          Digunakan untuk operasi perkalian skalar (k · A dan k · B).
        </span>
      </div>
    </div>
  );
}
