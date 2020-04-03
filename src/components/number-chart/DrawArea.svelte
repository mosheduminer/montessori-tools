<script>
  import Lines from "./Lines.svelte";

  import { onMount } from "svelte";

  let isDrawing = false;
  let lines = [];

  let area;

  // there is no window if SSR
  onMount(() => {
    // the following variable and function alter the lines appropriately on window resize
    let lastDimensions = { x: window.innerWidth, y: window.innerHeight };
    window.onresize = () => {
      let x = window.innerWidth,
        y = window.innerHeight;
      let ratioX = x / lastDimensions["x"],
        ratioY = y / lastDimensions["y"];
      lines = lines.map(line => {
        return line.map(point => {
          return { x: point.x * ratioX, y: point.y * ratioY };
        });
      });
      lastDimensions = { x, y };
    };
  });

  // add a point to the last line if `init` false,
  // else creates a new line and adds a point
  const pushToLine = (x, y, init) => {
    const rect = area.getBoundingClientRect();
    const point = {
      x: x - rect.left,
      y: y - rect.top
    };
    if (init) {
      lines.push([point]);
    } else {
      lines[lines.length - 1].push(point);
    }
    // svelte refresh
    lines = lines;
  };

  const handleMouseDown = (x, y) => {
    pushToLine(x, y, true);
    isDrawing = true;
  };
  onMount(() => {
    document.addEventListener("mouseup", () => (isDrawing = false));
    document.addEventListener("touchend", () => (isDrawing = false));
  });

  const handleMouseMove = (x, y) => {
    if (!isDrawing) {
      return;
    }
    pushToLine(x, y, false);
  };
</script>

<style>
  div {
    display: inline-block;
    width: calc(100% - 160px);
  }
</style>

<div
  bind:this={area}
  on:mousedown={e => {
    if (e.button === 0) handleMouseDown(e.clientX, e.clientY);
  }}
  on:mousemove={e => handleMouseMove(e.clientX, e.clientY)}
  on:touchstart|preventDefault={e => handleMouseDown(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}
  on:touchmove|preventDefault={e => handleMouseMove(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}>
  <Lines {lines} />
  <slot />
</div>
