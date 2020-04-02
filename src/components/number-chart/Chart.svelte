<script>
  let headers = ["10,000", "1,000", "100", "10", "1"];
  let colors = ["blue", "red", "green", "black", "blue"];
  import Table from "./Table.svelte";
  import PenBar from "./PenBar.svelte";
</script>

<style>
  div {
    display: flex;
  }
  input {
    text-align: center;
    font-size: 56px;
    flex-grow: 1;
  }

  input[type="number"] {
    font-family: cursive;
  }
</style>

<PenBar />

{#each headers as header, index}
  <Table {header} color={colors[index]} />
{/each}

<div>
  {#each Array(5) as i}
    <input type="number" min="0" max="9" />
  {/each}
</div>
