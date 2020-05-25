<script>
    import Draggable from '../library/Draggable.svelte';
    export let color = "#1BAF33";
</script>

<style>
    svg {
        height: 65px;
    }
</style>

<Draggable {...$$restProps} on:moved>
    <svg version="1.1" id="Layer_7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 151.60178 372.10001" xml:space="preserve">
        <path fill={color} d="m 150.15239,276.7 c -3.5,26.8 -13.5,56.4 -27.6,81.1 -5,8.8 -14.3,14.3 -24.300003,14.3 h -44.8 c -10,0 -19.3,-5.5 -24.4,-14.3 -14,-24.7 -24.0999997,-54.3 -27.5999997,-81.1 -4.5,-34.5 1.5,-65 17.3999997,-88.1 39.9,-58.1 36.2,-85.4 31.4,-120 -1.7,-12.1 -3.4,-24.7 -3.4,-39.5 0,-15.8 12.6,-28.7 28.3,-29.1 0.1,0 0.2,0 0.3,0 h 0.4 c 0.1,0 0.2,0 0.3,0 15.7,0.4 28.300003,13.3 28.300003,29.1 0,14.9 -1.7,27.4 -3.4,39.5 -4.700003,34.6 -8.500003,61.9 31.4,120 16.2,23.1 22.2,53.6 17.7,88.1 z">
        </path>
    </svg>
</Draggable>
