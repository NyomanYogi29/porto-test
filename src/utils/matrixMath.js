/**
 * Utility functions for Matrix operations.
 * Pure mathematical functions for 2x2 and 3x3 linear algebra.
 */

export function createEmptyMatrix(size = 2) {
  return Array.from({ length: size }, () => Array(size).fill(0));
}

export function createRandomMatrix(size = 2, min = -9, max = 9) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min)
  );
}

export function formatNumber(val, decimals = 4) {
  if (typeof val !== 'number' || Number.isNaN(val)) return '0';
  if (Math.abs(val) < 1e-10) return '0';
  const factor = 10 ** decimals;
  const rounded = Math.round(val * factor) / factor;
  return Object.is(rounded, -0) ? '0' : String(rounded);
}

export function addMatrices(A, B) {
  if (A.length !== B.length || A[0].length !== B[0].length) {
    throw new Error('Ukuran matriks harus sama untuk operasi penjumlahan.');
  }
  const size = A.length;
  const result = createEmptyMatrix(size);
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      result[i][j] = (Number(A[i][j]) || 0) + (Number(B[i][j]) || 0);
    }
  }
  return result;
}

export function subtractMatrices(A, B) {
  if (A.length !== B.length || A[0].length !== B[0].length) {
    throw new Error('Ukuran matriks harus sama untuk operasi pengurangan.');
  }
  const size = A.length;
  const result = createEmptyMatrix(size);
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      result[i][j] = (Number(A[i][j]) || 0) - (Number(B[i][j]) || 0);
    }
  }
  return result;
}

export function multiplyMatrices(A, B) {
  if (A.length !== B.length || A[0].length !== B[0].length) {
    throw new Error('Ukuran matriks harus sama untuk operasi perkalian.');
  }
  const size = A.length;
  const result = createEmptyMatrix(size);
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      let sum = 0;
      for (let k = 0; k < size; k += 1) {
        sum += (Number(A[i][k]) || 0) * (Number(B[k][j]) || 0);
      }
      result[i][j] = sum;
    }
  }
  return result;
}

export function transposeMatrix(M) {
  const size = M.length;
  const result = createEmptyMatrix(size);
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      result[i][j] = Number(M[j][i]) || 0;
    }
  }
  return result;
}

export function scalarMultiply(M, scalar) {
  const size = M.length;
  const k = Number(scalar) || 0;
  const result = createEmptyMatrix(size);
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      result[i][j] = (Number(M[i][j]) || 0) * k;
    }
  }
  return result;
}

export function calculateDeterminant(M) {
  const size = M.length;
  if (size === 2) {
    const a = Number(M[0][0]) || 0;
    const b = Number(M[0][1]) || 0;
    const c = Number(M[1][0]) || 0;
    const d = Number(M[1][1]) || 0;
    return a * d - b * c;
  }

  if (size === 3) {
    const [a, b, c] = [Number(M[0][0]) || 0, Number(M[0][1]) || 0, Number(M[0][2]) || 0];
    const [d, e, f] = [Number(M[1][0]) || 0, Number(M[1][1]) || 0, Number(M[1][2]) || 0];
    const [g, h, i] = [Number(M[2][0]) || 0, Number(M[2][1]) || 0, Number(M[2][2]) || 0];

    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  }

  throw new Error('Determinan hanya mendukung matriks ordo 2x2 dan 3x3.');
}

export function invertMatrix(M) {
  const size = M.length;
  const det = calculateDeterminant(M);

  if (Math.abs(det) < 1e-10) {
    return {
      success: false,
      error: 'Matriks tidak memiliki invers (determinan = 0, matriks singular).',
    };
  }

  if (size === 2) {
    const a = Number(M[0][0]) || 0;
    const b = Number(M[0][1]) || 0;
    const c = Number(M[1][0]) || 0;
    const d = Number(M[1][1]) || 0;

    const result = [
      [d / det, -b / det],
      [-c / det, a / det],
    ];
    return { success: true, matrix: result, det };
  }

  if (size === 3) {
    const [a, b, c] = [Number(M[0][0]) || 0, Number(M[0][1]) || 0, Number(M[0][2]) || 0];
    const [d, e, f] = [Number(M[1][0]) || 0, Number(M[1][1]) || 0, Number(M[1][2]) || 0];
    const [g, h, i] = [Number(M[2][0]) || 0, Number(M[2][1]) || 0, Number(M[2][2]) || 0];

    const c00 = e * i - f * h;
    const c01 = -(d * i - f * g);
    const c02 = d * h - e * g;

    const c10 = -(b * i - c * h);
    const c11 = a * i - c * g;
    const c12 = -(a * h - b * g);

    const c20 = b * f - c * e;
    const c21 = -(a * f - c * d);
    const c22 = a * e - b * d;

    // Adjugate transpose
    const result = [
      [c00 / det, c10 / det, c20 / det],
      [c01 / det, c11 / det, c21 / det],
      [c02 / det, c12 / det, c22 / det],
    ];

    return { success: true, matrix: result, det };
  }

  return {
    success: false,
    error: 'Invers hanya mendukung ordo 2x2 dan 3x3.',
  };
}
