<script>
  export let line;
  $: pathData = "M " + line.map(p => p["x"] + " " + p["y"]).join(" L ");

  import { penColor } from "./store";

  // assinging a new variable, so the color of
  // a line will not change after it is drawn
  let color = $penColor;
</script>

<style>
  svg {
    position: fixed;
    pointer-events: none;
    height: 100%;
    width: 100vw;
  }
</style>

<svg>
  <path d={pathData} stroke={color} fill="none" stroke-width="5" />
</svg>
