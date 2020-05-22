<script>
  import { spring } from "svelte/motion";
  import { subscribe, TOPICS } from "../../lib/pubsub";
  import { normalizeLetterCoords } from "../../lib/normalizer";

  export let color;
  export let char;
  export let x;
  export let y;
  export let index;
  export let moveLetter;

  let element;
  let listener;
  let pickedup = false;
  let coords = spring({ x, y }, { stiffness: 1, damping: 0.8 });

  const updateCoords = (mouseX, mouseY) => {
    const rect = element.getBoundingClientRect();
    const x = mouseX - rect.height / 2;
    const y = mouseY - rect.width / 2;
    coords.set({ x, y });
  };

  const pickup = () => {
    listener = listener || subscribe(TOPICS.ALPHABET_BOARD.MOVE, move);
    element.style.zIndex = "10";
  };

  const putdown = function () {
    element.style.zIndex = "1";
    if (listener !== undefined) {
      listener = listener.remove();
    }

    let finalCoords = normalizeLetterCoords($coords.x, $coords.y);

    if (
      moveLetter({
        color,
        from: { x, y, index },
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
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 4.5rem;
    position: absolute;
    margin: 0;
    font-size: 2rem;

    background-color: white;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

    user-select: none;
  }
</style>

<span
  bind:this={element}
  on:mousedown={pickup}
  on:mouseup={putdown}
  on:touchstart={pickup}
  on:touchend={putdown}
  style="color: {color}; left: {$coords.x || 14}px; top: {$coords.y || 14}px;">
  {char}
</span>
