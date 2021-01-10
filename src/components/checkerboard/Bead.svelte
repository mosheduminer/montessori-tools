<script>
    import Draggable from "../library/Draggable.svelte";

    export let size;
    export let fullSize = false;
    export let shouldRotate = false;

    // color of beads determined by their size
    const colors = [
        'red',
        'green',
        'pink',
        'yellow',
        'light-blue',
        'light-purple',
        'white',
        'brown',
        'dark-blue',
        'gold'
    ];

    // limit size to between 1 and 9
    let validSize;
    $: validSize = (!size || size <= 1)
            ? 1
            : (size >= colors.length ? colors.length : size);

    let color;
    $: color = colors[validSize - 1];

    let rotationDegrees = 0;
    const rotate = ({detail}) => {
        if ($$restProps.disabled || !shouldRotate) return;
        if (detail.type === "wheel") {
            rotationDegrees += detail.deltaY * .1;            
        } else {
            rotationDegrees += detail.rotation;
        }
    }
</script>

<style>
    :global(.bead) {
        width: fit-content;
        height: auto;
        overflow: hidden;
        display: inline-flex;
        transition: transform .1s ease-in-out;
    }

    .bead-cell {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid #000;
        pointer-events: none;
    }

    @media (max-width: 1680px) {
        .bead-cell:not(.full-size) { width: 15px; }
    }

    @media (max-width: 1500px) {
        .bead-cell:not(.full-size) { width: 12px; height: 14px; }
    }

    @media (max-width: 1325px) {
        .bead-cell:not(.full-size) { width: 9px; height: 13px; }
    }

    .bead-red { background-color: red; }
    .bead-green { background-color: #04c104; }
    .bead-pink { background-color: pink; }
    .bead-yellow { background-color: yellow; }
    .bead-light-blue { background-color: lightblue; }
    .bead-light-purple { background-color: plum; }
    .bead-white { background-color: white; }
    .bead-brown { background-color: brown; }
    .bead-dark-blue { background-color: darkblue; }
    .bead-gold { background-color: goldenrod; }
</style>

<Draggable {...$$restProps}
           class="bead bead-{validSize} bead-{color}"
           on:moved
           on:wheel={rotate}
           bind:rotateDegrees={rotationDegrees}>
    {#each Array(validSize) as i}
        <span class="bead-cell bead-{validSize} bead-{color}" class:full-size={fullSize}></span>
    {/each}
</Draggable>
