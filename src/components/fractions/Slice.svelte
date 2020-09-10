<script>
    import Guid from '../../lib/guid';
    import Draggable from "../library/Draggable.svelte";
    import {getPath} from './path';

    export let fraction = 1;
    export let offset = 0;
    export let svgId = undefined;

    let rotation = 0;

    const id = Guid();

    let pathData, pathId;
    $: pathData = getPath(fraction, offset + rotation);
    $: pathId = fraction === 1 ? 'circle(50%)' : `url(#${rotation === 0 ? (svgId || id) : id})`;

    let lastScroll = 0;
    const rotate = ({detail}) => {
        if ($$restProps.disabled) return;
        rotation += detail.deltaY * .001;
    }
</script>

<style>
    :global(.fraction-slice) {
        position: absolute;
        background: radial-gradient(circle at 50% 50%, rgb(235, 72, 72), rgb(194, 92, 92) 66%);
        border-radius: 50%;
        border: 1px solid #000;
        box-sizing: border-box;
    }

    svg.hidden-svg {
        position: absolute;
        z-index: -99999999999;
    }

    :global(.fraction-slice svg) {
        margin: -1px;
    }
</style>

{#if (rotation === 0 || svgId === undefined && fraction) !== 1}
    <svg width="0" height="0" class="hidden-svg">
        <defs>
            <clipPath id={id} clipPathUnits="objectBoundingBox">
                <path d="{pathData}">
                </path>
            </clipPath>
        </defs>
    </svg>
{/if}

<Draggable {...$$restProps}
           class="fraction-slice fraction-size"
           style="clip-path: {pathId}; -webkit-clip-path: {pathId}"
           on:moved
           on:wheel={rotate}>
    <svg viewBox="0 0 1 1.01">
        <path d="{pathData}" stroke="#000" stroke-width="0.02" fill="rgba(0, 0, 0, 0)"></path>
    </svg>
</Draggable>
