<script>
  import Cell from "./Cell.svelte";
</script>

<style>
  tr {
    border-style: solid;
    border-width: 2px;
  }
</style>

<tr>
  {#each Array(10) as i}
    <Cell bordered={false} />
  {/each}
</tr>
