<script>
    import {createEventDispatcher} from 'svelte';
    import {getPath} from './path';
    import Guid from '../../lib/guid';
    import Slice from "./Slice.svelte";
    import { getOffset } from '../../lib/utils';

    export let fraction = 1;
    export let offset = 0;

    const svgId = Guid();
    let element;

    let pathData;
    $: pathData = getPath(fraction, offset);

    const dispatch = createEventDispatcher();
    const spawn = (event) => {
        const rect = element.getBoundingClientRect();
        dispatch('spawn', {component: Slice, data: {
            fraction, offset, svgId,
            x: rect.left,
            y: rect.top,
            startOffset: getOffset(event, rect)
        }});
    }
</script>

<style>
    div {
        touch-action: none;
        position: absolute;
    }
    svg { position: absolute; z-index: -99999999999; }
</style>

{#if fraction !== 1}
<svg height="0" width="0">
    <defs>
        <clipPath id="{svgId}" clipPathUnits="objectBoundingBox">
            <path d="{pathData}">
            </path>
        </clipPath>
    </defs>
</svg>
{/if}

<div on:mousedown={spawn} on:touchstart={spawn} {...$$restProps} bind:this={element}
    style="-webkit-clip-path: url(#{svgId}); clip-path: url(#{svgId})" class="fraction-size">
    <Slice fraction={fraction} offset={offset} disabled={true} svgId={svgId} />
</div>
