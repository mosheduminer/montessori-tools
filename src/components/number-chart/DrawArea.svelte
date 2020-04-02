<script>
  import Lines from "./Lines.svelte";

  let isDrawing = false;
  let lines = [];

  let area;

  // the following variable and function alter the lines appropriately on window resize
  let lastDimensions = { x: window.innerWidth, y: window.innerHeight };
  window.onresize = () => {
    let x = window.innerWidth,
      y = window.innerHeight;
    let ratioX = x / lastDimensions["x"],
      ratioY = y / lastDimensions["y"];
    console.log(ratioX, ratioY);
    lines = lines.map(line => {
      return line.map(point => {
        return { x: point.x * ratioX, y: point.y * ratioY };
      });
    });
    lastDimensions = { x, y };
  };

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

  const handleMouseDown = (event, x, y) => {
    if (event.button !== 0) {
      return;
    }
    pushToLine(x, y, true);
    isDrawing = true;
  };
  document.addEventListener("mouseup", () => (isDrawing = false));

  const handleMouseMove = (event, x, y) => {
    if (!isDrawing || event.button !== 0) {
      return;
    }
    pushToLine(x, y, false);
  };
</script>

<div
  bind:this={area}
  on:mousedown={e => handleMouseDown(e, e.clientX, e.clientY)}
  on:mousemove={e => handleMouseMove(e, e.clientX, e.clientY)}>
  <Lines {lines} />
  <slot />
</div>
