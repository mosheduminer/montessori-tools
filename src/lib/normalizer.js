/**
 * Normalizer.js, works with normalizing numbers
 */

export function normalizePegCoords(x, y) {
    return {
        x: round(x, { offset: 14, step: 64 }),
        y: round(y, { offset: 14, step: 64 }),
    };
};

export function normalizeLetterCoords(x, y) {
    return {
        x: round(x, { offset: 14, step: 64 }),
        y: round(y, { offset: 14, step: 80 }),
    };
};

function round(value, { offset, step }) {
    offset || (offset = 0);
    step || (step = 1);
    return Math.round((value - offset) / step) * step + offset;
};
