<script>
  let color = "white";
  import { penColor } from "./store";
  const handleClick = () => {
    // TODO: need to make a bar for selecting colors and erases.
    color = $penColor;
  };

  export let h, w;
  let diameter;
  // we need to wrap this as reactive, as `h` and `w` start as undefined
  $: {
    if (h < w) {
      diameter = h / 14;
    } else {
      diameter = w / 14;
    }
  }
</script>

<style>
  td {
    border-color: black;
    border-style: solid;
    border-width: 2px;
  }
  span {
    border-radius: 50%;
    display: inline-block;
  }
</style>

<td width="10%" on:click={handleClick}>
  <span
    style="background-color: {color}; height: {diameter}px; width: {diameter}px;">
    &nbsp;
  </span>
</td>
