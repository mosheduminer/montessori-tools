<script>
  export let line;
  $: pathData = "M " + line.map(p => p["x"] + " " + p["y"]).join(" L ");

  import { penColor } from "./store";

  import { height } from "./store";

  // assinging a new variable, so the color of
  // a line will not change after it is drawn
  let color = $penColor;

  let width = 5;
  if (color === "white") {
    width = 15;
  }
</script>

<style>
  svg {
    position: fixed;
    pointer-events: none;
    left: 0;
    height: 100%;
    width: calc(100vw - 160px);
  }
</style>

<svg style="height: {$height}px;">
  <path d={pathData} stroke={color} fill="none" stroke-width={width} />
</svg>
