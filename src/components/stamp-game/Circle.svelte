<script>
    import Draggable from '../library/Draggable.svelte';
    export let color = "#1BAF33";
</script>

<style>
    svg {
        height: 50px;
    }
</style>

<Draggable {...$$restProps} on:moved>
    <svg version="1.1" id="Layer_7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 100 100" xml:space="preserve">
        <circle fill={color} cx="50" cy="50" r="50"/>
    </svg>
</Draggable>
