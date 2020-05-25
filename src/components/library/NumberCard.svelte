<script>
    import Draggable from '../library/Draggable.svelte'

    export let dark = false;
    export let color = undefined;
    export let number;
</script>

<style>
    :global(.number-card) {
        min-width: 22px;
        height: 22px;
        font-size: 22px;
        text-align: center;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 12px;
        user-select: none;
        border: 1px solid;
        font-family: cursive;
    }
    :global(.number-card-light) {
        background-color: #eee;
    }

    :global(.number-card-dark) {
        background-color: #bbb;
    }

    :global(.number-card-green) {
        background: green;
        border: 0px;
        color: #fff;
    }

    :global(.number-card-red) {
        background: red;
        border: 0px;
        color: #fff;
    }

    :global(.number-card-blue) {
        background: blue;
        border: 0px;
        color: #fff;
    }

    @media (max-width: 1325px) {
        :global(.number-card) {
            min-width: 18px;
            height: 18px;
        }
    }
</style>

<Draggable {...$$restProps} class="number-card number-card-{color ? color : dark ? 'dark' : 'light'}" on:moved>
    {number}
</Draggable>