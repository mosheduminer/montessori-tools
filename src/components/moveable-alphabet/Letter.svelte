<script>
  import { spring } from "svelte/motion";
  import { subscribe, TOPICS } from "../../lib/pubsub";
  import { alignToGrid } from "../../lib/normalizer";

  export let color;
  export let char;
  export let x;
  export let y;
  export let grid;
  export let index;
  export let moveLetter;

  let element;
  let listener;
  let coords = spring({ x, y }, { stiffness: 1, damping: 0.8 });

  const pickup = () => {
    listener = listener || subscribe(TOPICS.ALPHABET_BOARD.MOVE, move);
    element.style.zIndex = "10";
  };

  const putdown = function () {
    element.style.zIndex = "1";
    if (listener !== undefined) {
      listener = listener.remove();
    }

    let finalCoords = alignToGrid($coords.x, $coords.y, grid);

    if (
      moveLetter({
        index,
        from: { x, y },
        to: { x: finalCoords.x, y: finalCoords.y },
      })
    ) {
      coords.set({ x: finalCoords.x, y: finalCoords.y });
    } else {
      coords.set({ x, y });
    }
  };

  const move = ({ x, y }) => {
    const rect = element.getBoundingClientRect();
    coords.set({
      x: x - rect.height / 2,
      y: y - rect.width / 2,
    });
  };
</script>

<style>
  .grid-cell {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    padding: 2px;
  }
  .letter {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: white;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border: 0.5px solid black;
    border-radius: 2px;
    user-select: none;
  }
</style>

<span
  class="grid-cell"
  style="color: {color}; left: {$coords.x || 14}px; top: {$coords.y || 14}px;
  width: {grid.width}px; height: {grid.height}px; font-size: {grid.width / 20}rem;">
  <span
    class="letter"
    bind:this={element}
    on:mousedown={pickup}
    on:mouseup={putdown}
    on:touchstart={pickup}
    on:touchend={putdown}>
    {char}
  </span>
</span>
