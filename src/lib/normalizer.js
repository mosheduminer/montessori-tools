/**
 * Normalizer.js, works with normalizing numbers
 */

export function normalizePegCoords(x, y) {
    return {
        x: round(x, { offset: 14, step: 64 }),
        y: round(y, { offset: 14, step: 64 }),
    };
};

export function alignToGrid(x, y, { offsetX, offsetY, width, height }) {
    return {
        x: round(x, { offset: offsetX, step: width }),
        y: round(y, { offset: offsetY, step: height }),
    };
};

function round(value, { offset, step }) {
    offset || (offset = 0);
    step || (step = 1);
    return Math.round((value - offset) / step) * step + offset;
};
