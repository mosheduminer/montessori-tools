<script>
  import Draggable from "../library/Draggable.svelte";
  export let width;
  export let height;
</script>

<style>
  div {
    display: inline-block;
    background-size: 0.5rem 0.5rem;
    background-image: radial-gradient(
      circle at 50% 50%,
      rgb(255, 223, 0) 0.1rem,
      rgb(223, 175, 55) 0.245rem,
      transparent 0
    );
  }
</style>

<Draggable {...$$restProps}>
  <div style="width: {width / 2}rem; height: {height / 2}rem;" />
</Draggable>
