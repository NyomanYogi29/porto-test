import { useState } from 'react';
import MatrixGrid from '../components/matrix/MatrixGrid';
import MatrixOperations from '../components/matrix/MatrixOperations';
import MatrixResult from '../components/matrix/MatrixResult';
import {
  createEmptyMatrix,
  createRandomMatrix,
  addMatrices,
  subtractMatrices,
  multiplyMatrices,
  transposeMatrix,
  scalarMultiply,
  calculateDeterminant,
  invertMatrix,
} from '../utils/matrixMath';

export default function MatrixCalculator({ isDark }) {
  const [sizeA, setSizeA] = useState(2);
  const [matrixA, setMatrixA] = useState(() => [
    [1, 2],
    [3, 4],
  ]);

  const [sizeB, setSizeB] = useState(2);
  const [matrixB, setMatrixB] = useState(() => [
    [5, 6],
    [7, 8],
  ]);

  const [scalarK, setScalarK] = useState(2);
  const [result, setResult] = useState(null);

  const handleCellChange = (matrixKey, row, col, value) => {
    const updater = matrixKey === 'A' ? setMatrixA : setMatrixB;
    updater((prev) => {
      const next = prev.map((r) => [...r]);
      next[row][col] = value === '' ? '' : Number(value);
      return next;
    });
  };

  const handleSizeChange = (matrixKey, newSize) => {
    if (matrixKey === 'A') {
      setSizeA(newSize);
      setMatrixA((prev) => {
        const next = createEmptyMatrix(newSize);
        for (let r = 0; r < Math.min(prev.length, newSize); r += 1) {
          for (let c = 0; c < Math.min(prev[0].length, newSize); c += 1) {
            next[r][c] = prev[r][c] ?? 0;
          }
        }
        return next;
      });
    } else {
      setSizeB(newSize);
      setMatrixB((prev) => {
        const next = createEmptyMatrix(newSize);
        for (let r = 0; r < Math.min(prev.length, newSize); r += 1) {
          for (let c = 0; c < Math.min(prev[0].length, newSize); c += 1) {
            next[r][c] = prev[r][c] ?? 0;
          }
        }
        return next;
      });
    }
  };

  const handleRandomize = (matrixKey) => {
    if (matrixKey === 'A') {
      setMatrixA(createRandomMatrix(sizeA));
    } else {
      setMatrixB(createRandomMatrix(sizeB));
    }
  };

  const handleClear = (matrixKey) => {
    if (matrixKey === 'A') {
      setMatrixA(createEmptyMatrix(sizeA));
    } else {
      setMatrixB(createEmptyMatrix(sizeB));
    }
  };

  const handleSwap = () => {
    const tempA = matrixA;
    const tempSizeA = sizeA;
    setMatrixA(matrixB);
    setSizeA(sizeB);
    setMatrixB(tempA);
    setSizeB(tempSizeA);
  };

  const handleCopyResultToA = (resultMatrix) => {
    const newSize = resultMatrix.length;
    setSizeA(newSize);
    setMatrixA(resultMatrix.map((row) => [...row]));
  };

  // Operations
  const handleAdd = () => {
    try {
      const res = addMatrices(matrixA, matrixB);
      setResult({ type: 'matrix', label: 'Hasil Penjumlahan (A + B)', data: res });
    } catch (err) {
      setResult({ type: 'error', label: 'Error Penjumlahan', message: err.message });
    }
  };

  const handleSubtract = () => {
    try {
      const res = subtractMatrices(matrixA, matrixB);
      setResult({ type: 'matrix', label: 'Hasil Pengurangan (A - B)', data: res });
    } catch (err) {
      setResult({ type: 'error', label: 'Error Pengurangan', message: err.message });
    }
  };

  const handleMultiply = () => {
    try {
      const res = multiplyMatrices(matrixA, matrixB);
      setResult({ type: 'matrix', label: 'Hasil Perkalian (A × B)', data: res });
    } catch (err) {
      setResult({ type: 'error', label: 'Error Perkalian', message: err.message });
    }
  };

  const handleDetA = () => {
    try {
      const det = calculateDeterminant(matrixA);
      setResult({ type: 'scalar', label: 'Determinan Matriks A: det(A)', value: det });
    } catch (err) {
      setResult({ type: 'error', label: 'Error Determinan A', message: err.message });
    }
  };

  const handleDetB = () => {
    try {
      const det = calculateDeterminant(matrixB);
      setResult({ type: 'scalar', label: 'Determinan Matriks B: det(B)', value: det });
    } catch (err) {
      setResult({ type: 'error', label: 'Error Determinan B', message: err.message });
    }
  };

  const handleTransposeA = () => {
    const res = transposeMatrix(matrixA);
    setResult({ type: 'matrix', label: 'Transpose Matriks A (Aᵀ)', data: res });
  };

  const handleTransposeB = () => {
    const res = transposeMatrix(matrixB);
    setResult({ type: 'matrix', label: 'Transpose Matriks B (Bᵀ)', data: res });
  };

  const handleInverseA = () => {
    const res = invertMatrix(matrixA);
    if (!res.success) {
      setResult({ type: 'error', label: 'Invers Matriks A Gagal', message: res.error });
    } else {
      setResult({ type: 'matrix', label: 'Invers Matriks A (A⁻¹)', data: res.matrix });
    }
  };

  const handleInverseB = () => {
    const res = invertMatrix(matrixB);
    if (!res.success) {
      setResult({ type: 'error', label: 'Invers Matriks B Gagal', message: res.error });
    } else {
      setResult({ type: 'matrix', label: 'Invers Matriks B (B⁻¹)', data: res.matrix });
    }
  };

  const handleScalarA = () => {
    const res = scalarMultiply(matrixA, scalarK);
    setResult({ type: 'matrix', label: `Perkalian Skalar Matriks A (${scalarK} · A)`, data: res });
  };

  const handleScalarB = () => {
    const res = scalarMultiply(matrixB, scalarK);
    setResult({ type: 'matrix', label: `Perkalian Skalar Matriks B (${scalarK} · B)`, data: res });
  };

  return (
    <div className="py-8 sm:py-12">
      {/* Page Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-semibold text-cyan-500 dark:text-cyan-400">
          <span>Tugas JavaScript</span>
          <span className="text-neutral-400">•</span>
          <span>Teknologi Web</span>
        </div>
        <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight">
          Kalkulator Operasi Matriks
        </h1>
        <p className={`mt-2 max-w-2xl text-sm sm:text-base ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
          Aplikasi perhitungan aljabar linier interaktif untuk operasi dua matriks dan transformasi matriks tunggal dengan visualisasi ordo 2x2 dan 3x3.
        </p>
      </div>

      {/* Main Grid: Matrix A and Matrix B inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <MatrixGrid
          title="Matriks A"
          matrix={matrixA}
          size={sizeA}
          isDark={isDark}
          onCellChange={(r, c, val) => handleCellChange('A', r, c, val)}
          onSizeChange={(newSize) => handleSizeChange('A', newSize)}
          onRandomize={() => handleRandomize('A')}
          onClear={() => handleClear('A')}
        />

        <MatrixGrid
          title="Matriks B"
          matrix={matrixB}
          size={sizeB}
          isDark={isDark}
          onCellChange={(r, c, val) => handleCellChange('B', r, c, val)}
          onSizeChange={(newSize) => handleSizeChange('B', newSize)}
          onRandomize={() => handleRandomize('B')}
          onClear={() => handleClear('B')}
        />
      </div>

      {/* Operations Toolbar */}
      <div className="mb-6">
        <MatrixOperations
          isDark={isDark}
          sizeA={sizeA}
          sizeB={sizeB}
          scalarK={scalarK}
          onScalarChange={setScalarK}
          onAdd={handleAdd}
          onSubtract={handleSubtract}
          onMultiply={handleMultiply}
          onDetA={handleDetA}
          onDetB={handleDetB}
          onTransposeA={handleTransposeA}
          onTransposeB={handleTransposeB}
          onInverseA={handleInverseA}
          onInverseB={handleInverseB}
          onScalarA={handleScalarA}
          onScalarB={handleScalarB}
          onSwap={handleSwap}
        />
      </div>

      {/* Output / Result Display */}
      <div className="mb-12">
        <MatrixResult
          result={result}
          isDark={isDark}
          onCopyResultToA={handleCopyResultToA}
        />
      </div>
    </div>
  );
}
