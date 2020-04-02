<script>
  let headers = ["10,000", "1,000", "100", "10", "1"];
  let colors = ["blue", "red", "green", "black", "blue"];
  import Table from "./Table.svelte";
  import PenBar from "./PenBar.svelte";
  import DrawArea from "./DrawArea.svelte";
</script>

<style>
  input {
    box-sizing: border-box;
    text-align: center;
    font-size: 56px;
    float: left;
    width: 20%;
    font-family: cursive;
  }
</style>

<PenBar />

<DrawArea>
  {#each headers as header, index}
    <Table {header} color={colors[index]} />
  {/each}
</DrawArea>

{#each Array(5) as i}
  <input type="number" min="0" max="9" />
{/each}
