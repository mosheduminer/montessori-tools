<script>
  let headers = [10000, 1000, 100, 10, 1];
  let colors = ["blue", "red", "green", "black", "blue"];
  import Table from "./Table.svelte";
  import PenBar from "./PenBar.svelte";
</script>

<PenBar />

{#each headers as header, index}
  <Table {header} color={colors[index]} />
{/each}
