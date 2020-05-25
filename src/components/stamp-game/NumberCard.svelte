<script>
    import Draggable from '../library/Draggable.svelte'
    import { formatNumber } from '../../lib/utils';

    export let color = undefined;
    export let number;
</script>

<style>
    :global(.number-card) {
        min-width: 40px;
        height: 40px;
        font-size: 40px;
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
            min-width: 36px;
            height: 36px;
        }
    }
</style>

<Draggable {...$$restProps} class="number-card number-card-{color}" on:moved>
    {formatNumber(number)}
</Draggable>