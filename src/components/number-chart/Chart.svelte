<script>
  import Table from "./Table.svelte";
  import PenBar from "./PenBar.svelte";
  import DrawArea from "./DrawArea.svelte";

  let headers = ["10,000", "1,000", "100", "10", "1"];
  let colors = ["blue", "red", "green", "black", "blue"];

  let chart;
</script>

<style>
  #number-chart {
    background: #fff;
  }

  input {
    box-sizing: border-box;
    text-align: center;
    font-size: 56px;
    float: left;
    width: 20%;
    font-family: cursive;
  }
</style>

<PenBar chart={chart} />

<div id="number-chart" bind:this={chart}>
  <DrawArea>
    {#each headers as header, index}
      <Table {header} color={colors[index]} />
    {/each}
  </DrawArea>

  <div>
    {#each Array(5) as i}
      <input type="number" min="0" max="9" />
    {/each}
  </div>
</div>
