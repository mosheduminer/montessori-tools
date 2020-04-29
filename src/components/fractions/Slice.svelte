<script>
    import Draggable from "../library/Draggable.svelte";

    export let fraction = 1;
    export let offset = 0;

    let svg;

    // math to get Coordinates from a fraction
    // https://medium.com/hackernoon/a-simple-pie-chart-in-svg-dbdd653b6936
    function getCoordinatesForPercent(percent) {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    }

    function getPath(fraction, offset) {
        console.log({fraction, offset});
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

    let pathData;
    $: pathData = getPath(fraction, offset);
</script>

<style>
    .clipped {
        background: red;
        height: 100px;
        width: 100px;
        -webkit-clip-path: url(#my-shape);
        clip-path: url(#my-shape);
    }
</style>

<svg width="0" height="0">
    <defs>
        <clipPath id="my-shape" clipPathUnits="objectBoundingBox">
            <path d="{pathData}">
            </path>
        </clipPath>
    </defs>
</svg>

<svg viewBox="0 0 1 1.01" height="500" width="500">
    <path d="{pathData}"
          fill="Coral"
          stroke="#000000"
          stroke-width="0.01"
          stroke-miterlimit="10" />
</svg>
<div class="clipped" src="img/peg-board.png" alt="" />
<!--<Draggable {...$$restProps} class="fraction-slice fraction-{fraction} fraction-number-{number}" on:moved />-->
