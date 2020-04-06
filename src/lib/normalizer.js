/**
 * Normalizer.js, works with normalizing numbers
 */

export function normalizePegCoords(x, y) {
    let modX = (x - 14) % 64;
    let modY = (y - 14) % 64;

    return {
        x: modX < 32 ? x - modX : x + 64 - modX,
        y: modY < 32 ? y - modY : y + 64 - modY
    };
};
