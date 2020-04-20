<script>
    import Draggable from "../library/Draggable.svelte";

    export let size;

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
        'dark-blue'
    ];

    // limit size to between 1 and 9
    let validSize;
    $: validSize = (!size || size <= 1)
            ? 1
            : (size >= 9 ? 9 : size);

    let color;
    $: color = colors[validSize - 1];
</script>

<style>
    :global(.bead) {
        width: fit-content;
        height: auto;
        overflow: hidden;
        display: inline-flex;
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
        .bead-cell { width: 15px; }
    }

    @media (max-width: 1500px) {
        .bead-cell { width: 12px; height: 14px; }
        /* .bead-cell.bead-8 { width: 14px; } */
    }

    @media (max-width: 1325px) {
        .bead-cell { width: 9px; height: 13px; }
        /* .bead-cell.bead-8 { width: 10px; height: 12px; }
        .bead-cell.bead-7 { width: 12px; height: 14px; }
        .bead-cell.bead-6 { width: 14px; } */
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
</style>

<Draggable {...$$restProps} class="bead bead-{validSize} bead-{color}" on:moved>
    {#each Array(validSize) as i}
        <span class="bead-cell bead-{validSize} bead-{color}"></span>
    {/each}
</Draggable>
