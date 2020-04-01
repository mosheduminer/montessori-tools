<script>
  let color = "white";
  import { penColor } from "./store";
  const handleClick = () => {
    color = $penColor;
  };

  export let bordered = true;

  export let h, w;
  let diameter;
  // we need to wrap this as reactive, as `h` and `w` start as undefined
  $: {
    // dividing by 14 rather than 10, so the circles will be smaller than the cell
    if (h < w) {
      diameter = h / 14;
    } else {
      diameter = w / 14;
    }
  }
</script>

<style>
  .bordered {
    border-color: black;
    border-style: solid;
    border-width: 2px;
  }
  span {
    border-radius: 50%;
    display: inline-block;
  }
</style>

<td width="10%" on:click={handleClick} class:bordered>
  <span
    style="background-color: {color}; height: {diameter}px; width: {diameter}px;">
    &nbsp;
  </span>
</td>
