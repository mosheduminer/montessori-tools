<script>
  import { spring } from "svelte/motion";

  export let initialCoords = { x: 14, y: 14 };

  let coords = spring(initialCoords, {
    stiffness: 0.8,
    damping: 0.8
  });

  export let color = "red";

  const colors = {
    red: `radial-gradient(circle at 50% 50%, rgb(235, 72, 72), rgb(194, 92, 92) 66%)`,
    green: `radial-gradient(circle at 50% 50%, rgb(72, 235, 72), rgb(92, 194, 92) 66%)`,
    blue: `radial-gradient(circle at 50% 50%, rgb(72, 72, 235), rgb(92, 92, 194) 66%)`
  };

  const background = colors[color];

  let element;

  const updateCoords = (mouseX, mouseY) => {
    const rect = element.getBoundingClientRect();
    const x = mouseX - rect.height / 2;
    const y = mouseY - rect.width / 2;
    coords.set({ x, y });
  };

  export let updater = { update: null };

  const normalize = () => {
    let { x, y } = $coords;
    let modX = (x - 14) % 64;
    if (modX < 32) {
      x -= modX;
    } else {
      x += 64 - modX;
    }
    let modY = (y - 14) % 64;
    if (modY < 32) {
      y -= modY;
    } else {
      y += 64 - modY;
    }
    coords.set({ x, y });
  };

  let childArray = [];

  const mouseup = () => {
    updater.update = null;
    normalize();
    element.style.zIndex = "";
    childArray = childArray.concat(0);
  };
  const mousedown = () => {
    updater.update = updateCoords;
    element.style.zIndex = "10";
  };
</script>

<style>
  figure {
    border-radius: 50%;
    width: 2.25rem;
    height: 2.25rem;
    position: absolute;
    margin: 0;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
</style>

<figure
  bind:this={element}
  on:mousedown={mousedown}
  on:mouseup={mouseup}
  on:touchstart={mousedown}
  on:touchend={mouseup}
  style="background-image: {background}; left: {$coords.x}px; top: {$coords.y}px;" />

{#each childArray as item}
  <svelte:self {initialCoords} {color} bind:updater />
{/each}
