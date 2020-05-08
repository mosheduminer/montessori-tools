// calculate the offset
export function getOffset(e, rect) {
    let x, y;
    if (!e) {
        x = rect.width / 2;
        y = rect.height / 2;
    } else if (e.targetTouches) {
        x = e.targetTouches[0].pageX - rect.left;
        y = e.targetTouches[0].pageY - rect.top;
    } else {
        x = Math.round(e.pageX - rect.left);
        y = Math.round(e.pageY - rect.top);
    }

    return { x, y };
}

/**
 * @param {string|number} number
 * @param {string} separator
 */
export function formatNumber(number, separator = ",") {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}
