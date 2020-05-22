<script>
  import Draggable from "../library/Draggable.svelte";
</script>

<style>
  div {
    display: inline-block;
    background-position: top 20px left 0, top 18px left 2px, top 16px left 4px, top 14px left 6px,
      top 12px left 8px, top 10px left 10px, top 8px left 12px,
      top 6px left 14px, top 4px left 16px, top 2px left 18px;
    background-size: calc(7.5rem - 20px) calc(7.5rem - 20px);
    background-repeat: no-repeat;
    background-image:
      url("/img/golden-beads.png"),
      url("/img/golden-beads.png"),
      url("/img/golden-beads.png"),
      url("/img/golden-beads.png"),
      url("/img/golden-beads.png"),
      url("/img/golden-beads.png"),
      url("/img/golden-beads.png"),
      url("/img/golden-beads.png"),
      url("/img/golden-beads.png"),
      url("/img/golden-beads.png");
  }
</style>

<Draggable {...$$restProps}>
  <div style="width: 7.5rem; height: 7.5rem;" />
</Draggable>
