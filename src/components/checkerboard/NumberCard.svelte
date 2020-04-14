<script>
    import Dragable from '../library/Dragable.svelte'

    export let dark = false;
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
    }

    :global(.number-card-light) {
        background-color: #eee;
    }

    :global(.number-card-dark) {
        background-color: #bbb;
    }
</style>

<Dragable {...$$restProps} class="number-card-{dark ? 'dark' : 'light'}" on:moved>
    <slot />
</Dragable>