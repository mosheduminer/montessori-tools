// calculate the offset
export function getOffset(e, rect) {
    return {
        x: e ? e.offsetX || (e.targetTouches ? (e.targetTouches[0].pageX - rect.left) : rect.width / 2 ) : rect.width / 2,
        y: e ? e.offsetY || (e.targetTouches ? (e.targetTouches[0].pageY - rect.top) : rect.height / 2) : rect.height / 2
    };
}