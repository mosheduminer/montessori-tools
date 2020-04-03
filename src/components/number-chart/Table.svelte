<script>
  export let header;
  export let color = "black";

  import Cell from "./Cell.svelte";
  import RolloverRow from "./RolloverRow.svelte";

  import { penColor } from "./store";

  let url = "";
  $: {
    if ($penColor === "black") {
      url = "/icons/edit-black.svg";
    } else if ($penColor === "blue") {
      url = "/icons/edit-blue.svg";
    } else if ($penColor === "red") {
      url = "/icons/edit-red.svg";
    } else if ($penColor === "green") {
      url = "/icons/edit-green.svg";
    } else if ($penColor === "white") {
      url = "/icons/eraser.svg";
    }
  }
</script>

<style>
  table {
    border-collapse: collapse;
    display: inline-table;
    width: 20%;
    text-align: center;
    user-select: none;
  }
  caption {
    border-color: black;
    border-style: solid;
    border-width: 2px;
    border-bottom-width: 1px;
    font-weight: bold;
  }
</style>

<table>
  <caption style="color: {color}; cursor: url({url}) 0 32, pointer;">
    {header}
  </caption>
  <tbody>
    {#each Array(10) as i}
      <tr>
        {#each Array(10) as j}
          <Cell />
        {/each}
      </tr>
    {/each}
    <RolloverRow />
  </tbody>
</table>
