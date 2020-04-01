<script>
  let headers = [10000, 1000, 100, 10, 1];
  let colors = ["blue", "red", "green", "black", "blue"];
  import Table from "./Table.svelte";
</script>

<style>

</style>

{#each headers as header, index}
  <Table {header} color={colors[index]} />
{/each}
