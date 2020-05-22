<script>
  import Draggable from "../library/Draggable.svelte";
  export let width;
  export let height;
</script>

<style>
  div {
    display: inline-block;
    background-size: 0.75rem 0.75rem;
    background-image: radial-gradient(
      circle at 50% 50%,
      rgb(255, 223, 0) 0.15rem,
      rgb(223, 175, 55) 0.3675rem,
      transparent 0
    );
  }
</style>

<Draggable {...$$restProps}>
  <div style="width: {width * 0.75}rem; height: {height * 0.75}rem;" />
</Draggable>
