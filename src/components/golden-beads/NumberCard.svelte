<script>
    import Draggable from '../library/Draggable.svelte'

    export let number;
    export let style = "";

    let digits;
    $: digits = number.toString().split('');
</script>

<style>
    :global(.stackable-number-card) {
        background: #fff;
        display: inline-flex;
        justify-content: space-around;
        padding: 2px 0px;
        font-size: 22px;
        font-family: macursiveul;
        font-weight: bold;
        user-select: none;
    }
</style>

<Draggable {...$$restProps} class="stackable-number-card" on:moved {style}>
    {#each digits as digit}
        <span class="number-card-digit">{digit}</span>
    {/each}
</Draggable>