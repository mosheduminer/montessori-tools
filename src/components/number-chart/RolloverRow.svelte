<script>
  import Cell from "./Cell.svelte";

  export let h, w;
</script>

<style>
  tr {
    border-style: solid;
    border-width: 2px;
  }
</style>

<tr>
  {#each Array(10) as i}
    <Cell bordered={false} {h} {w} />
  {/each}
</tr>
