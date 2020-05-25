<script>
    import Draggable from '../library/Draggable.svelte'

    export let src;
</script>

<style>
img {
    max-height: 100%;
    max-width: 100%;
}
</style>

<Draggable {...$$restProps} on:moved>
    <img src={src} alt=""/>
</Draggable>