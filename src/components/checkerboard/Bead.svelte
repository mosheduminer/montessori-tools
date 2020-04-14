<script>
    import Dragable from "../library/Dragable.svelte";

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
        height: 18px;
        overflow: hidden;
    }

    @media (max-width: 1680px) {
        :global(.bead) {
            max-width: 144px;
            height: auto;
            line-height: 1;
            overflow: hidden;
        }
    }

    @media (max-width: 1500px) {
        :global(.bead) {
            max-width: 126px;
        }
    }

    @media (max-width: 1325px) {
        :global(.bead) {
            max-width: 90px;
        }
    }

    .bead-cell {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid #000;
        pointer-events: none;
    }

    .bead-red { background-color: red; }
    .bead-green { background-color: green; }
    .bead-pink { background-color: pink; }
    .bead-yellow { background-color: yellow; }
    .bead-light-blue { background-color: lightblue; }
    .bead-light-purple { background-color: plum; }
    .bead-white { background-color: white; }
    .bead-brown { background-color: brown; }
    .bead-dark-blue { background-color: darkblue; }
</style>

<Dragable {...$$restProps} class="bead bead-{validSize} bead-{color}" on:moved>
    {#each Array(validSize) as i}
        <span class="bead-cell bead-{color}"></span>
    {/each}
</Dragable>
