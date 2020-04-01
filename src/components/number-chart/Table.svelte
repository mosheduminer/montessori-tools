<script>
  export let header;
  export let color = "black";

  import Cell from "./Cell.svelte";
</script>

<style>
  table {
    border-collapse: collapse;
    display: inline-table;
    width: 20%;
  }
  caption {
    border-color: black;
    border-style: solid;
    border-width: 2px;
    cursor: pointer;
  }
  caption {
    border-bottom-width: 1px;
  }
</style>

<table>
  <caption style="color: {color}">{header}</caption>
  <tbody>
    {#each Array(10) as i}
      <tr>
        {#each Array(10) as j}
          <Cell />
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
