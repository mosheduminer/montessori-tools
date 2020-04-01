<script>
  let color = "white";
  const handleClick = () => {
    // TODO: need to make a bar for selecting colors and erases.
    //Will use a svelte store for holding the color selection
    color = "black";
  }
</script>


<style>
  td {
    border-color: black;
    border-style: solid;
    border-width: 2px;
    cursor: pointer;
    user-select: none;
  }
</style>

<td width="10%" style="background-color: {color};" on:click={handleClick}>&nbsp;</td>
