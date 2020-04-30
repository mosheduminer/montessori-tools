<script>
    import Draggable from "../library/Draggable.svelte";
</script>

<style>
    :global(.fraction-line) {
        height: 10px;
        width: 80px;
        background: #000;
        border-radius: 5px;
    }
</style>

<Draggable {...$$restProps} class="fraction-line" on:moved />