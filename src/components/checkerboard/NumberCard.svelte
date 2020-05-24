<script>
    import Draggable from '../library/Draggable.svelte'

    export let dark = false;
    export let number;
    export let style = "";
</script>

<style>
    :global(.number-card-light, .number-card-dark) {
        width: 22px;
        height: 22px;
        font-size: 22px;
        text-align: center;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 12px;
        user-select: none;
        border: 1px solid;
        font-family: macursiveul;
        font-weight: bold;
    }

    :global(.number-card-light) {
        background-color: #eee;
    }

    :global(.number-card-dark) {
        background-color: #bbb;
    }

    @media (max-width: 1325px) {
        :global(.number-card-light, .number-card-dark) {
            width: 18px;
            height: 18px;
        }
    }
</style>

<Draggable {...$$restProps} {style} class="number-card-{dark ? 'dark' : 'light'}" on:moved>
    {number}
</Draggable>