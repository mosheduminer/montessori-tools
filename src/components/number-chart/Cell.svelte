<script>
  let color = "white";
  import { penColor } from "./store";
  const handleClick = () => {
    return;
    color = $penColor;
  };

  export let bordered = true;
</script>

<style>
  .bordered {
    border-color: black;
    border-style: solid;
    border-width: 2px;
  }
</style>

<td on:click={handleClick} class:bordered>&nbsp;</td>
