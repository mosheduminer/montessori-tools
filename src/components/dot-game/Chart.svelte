<script>
  import { height as heightStore } from "./store";
  import Table from "./Table.svelte";
  import PenBar from "./PenBar.svelte";
  import DrawArea from "./DrawArea.svelte";
  import NumbersToAdd from "./NumbersToAdd.svelte";

  let headers = ["10,000", "1,000", "100", "10", "1"];
  let colors = ["blue", "green", "red", "blue", "green"];

  let chart;
  let height;
  $: heightStore.set(height);
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

  #total-inputs {
    display: inline-block;
    width: calc(100% - 160px);
  }
</style>

<PenBar {chart} />

<div id="number-chart" bind:this={chart}>
  <DrawArea>
    <div bind:clientHeight={height}>
      {#each headers as header, index}
        <Table {header} color={colors[index]} />
      {/each}
    </div>
  </DrawArea>

  <NumbersToAdd />

  <div id="total-inputs">
    {#each Array(5) as i, index}
      <input type="number" min="0" max="{index === 0 ? 99: 9}" />
    {/each}
  </div>
</div>
