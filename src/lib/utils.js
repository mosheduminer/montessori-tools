// calculate the offset
export function getOffset(e, rect) {
    rect = rect || { top: 0, left: 0, width: 0, height: 0 };
    return {
        x: e ? e.offsetX || (e.targetTouches ? (e.targetTouches[0].pageX - rect.left) : rect.width / 2 ) : rect.width / 2,
        y: e ? e.offsetY || (e.targetTouches ? (e.targetTouches[0].pageY - rect.top) : rect.height / 2) : rect.height / 2
    };
}