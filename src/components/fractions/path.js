// math to get Coordinates from a fraction
// https://medium.com/hackernoon/a-simple-pie-chart-in-svg-dbdd653b6936
export function getCoordinatesForPercent(percent) {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
}

export function getPath(fraction, offset) {
    const finalOffset = (fraction * offset) - .25; // svg's start at 3:00 not 12:00

    // get the starting and ending position of the path
    const [startX, startY] = getCoordinatesForPercent(finalOffset);
    const [endX, endY] = getCoordinatesForPercent(finalOffset + fraction);

    // handle SVG path bug
    const largeArcFlag = fraction > .5 ? 1 : 0;

    // 3 parts of SVG path
    let pathData = [
        `M ${(startX / 2) + 0.5} ${(startY + 1) / 2}`, // Move
        `A 0.5 0.5 0 ${largeArcFlag} 1 ${(endX / 2) + 0.5} ${(endY + 1) / 2}`, // Arc
    ].join(' ');

    if (fraction < 1) {
        pathData += [
            `L 0.5 0.5`, // Line
            `z`,
        ].join(' ');
    }

    return pathData;
}